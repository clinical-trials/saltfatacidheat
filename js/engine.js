/* Hafspot — the coaching engine.
 * Deterministic, rules-based. Classifies what you have by the four elements + plate role,
 * scores dish shapes by fit and by how much about-to-spoil food they use, then writes the
 * Salt / Fat / Acid / Heat moves to pull it together. No recipes required.
 */
(function () {
  var HAF = window.HAF;

  // Build a fast lookup from names + aliases.
  var INDEX = {};
  HAF.ingredients.forEach(function (ing) {
    INDEX[ing.name] = ing;
    (ing.aka || []).forEach(function (a) { if (!INDEX[a]) INDEX[a] = ing; });
  });

  function norm(str) {
    return String(str || "").toLowerCase().trim().replace(/\s+/g, " ").replace(/[.,]/g, "");
  }

  // Guess a role for something we don't have in the book, from plain-language cues.
  function guessFrom(name) {
    var n = name;
    var like = function (words) { return words.some(function (w) { return n.indexOf(w) !== -1; }); };
    if (like(["herb", "basil", "cilantro", "parsley", "mint", "dill", "chive"])) return { role: "herb", perish: 3 };
    if (like(["lettuce", "greens", "spinach", "kale", "chard", "leaf"])) return { role: "veg", perish: 3 };
    if (like(["lemon", "lime", "vinegar", "citrus"])) return { role: "acid", a: 2, perish: 1 };
    if (like(["cheese"])) return { role: "dairy", s: 1, f: 2, perish: 1 };
    if (like(["chicken", "beef", "pork", "fish", "meat", "steak", "turkey", "lamb"])) return { role: "protein", f: 1, perish: 2 };
    if (like(["bean", "lentil", "pea", "chickpea"])) return { role: "legume", perish: 0 };
    if (like(["rice", "pasta", "noodle", "bread", "potato", "grain", "oat"])) return { role: "starch", perish: 1 };
    if (like(["oil", "butter", "cream"])) return { role: "fat", f: 2, perish: 1 };
    if (like(["onion", "garlic", "ginger", "shallot", "leek"])) return { role: "aromatic", perish: 1 };
    return { role: "veg", perish: 2 }; // safest default: treat unknowns as a vegetable to use up
  }

  // Resolve one typed item to a classified ingredient.
  function classify(raw) {
    var n = norm(raw);
    if (!n) return null;
    var hit = INDEX[n];
    if (!hit) { // try singular, then substring either direction
      var singular = n.replace(/s$/, "");
      hit = INDEX[singular];
    }
    if (!hit) {
      for (var key in INDEX) {
        if (n.indexOf(key) !== -1 || key.indexOf(n) !== -1) { hit = INDEX[key]; break; }
      }
    }
    if (hit) {
      return { name: hit.name, display: raw, role: hit.role, s: hit.s || 0, f: hit.f || 0, a: hit.a || 0, perish: hit.perish, tags: hit.tags || [], known: true };
    }
    var g = guessFrom(n);
    return { name: n, display: raw, role: g.role, s: g.s || 0, f: g.f || 0, a: g.a || 0, perish: g.perish, tags: [], known: false };
  }

  // Role helpers — which roles can stand in for a dish's need.
  function fills(items, need) {
    switch (need) {
      case "protein": return items.some(function (i) { return i.role === "protein" || i.role === "egg" || i.role === "legume"; });
      case "egg": return items.some(function (i) { return i.role === "egg"; });
      case "veg": return items.some(function (i) { return i.role === "veg"; });
      case "starch": return items.some(function (i) { return i.role === "starch"; });
      case "aromatic": return items.some(function (i) { return i.role === "aromatic"; });
      case "legume": return items.some(function (i) { return i.role === "legume"; });
      case "dairy": return items.some(function (i) { return i.role === "dairy"; });
      case "acid": return items.some(function (i) { return i.a >= 1; });
      case "fat": return items.some(function (i) { return i.f >= 2 || i.role === "fat"; });
      default: return false;
    }
  }

  function hasSalt(items) { return items.some(function (i) { return i.s >= 2 || i.role === "salt"; }); }
  function hasFat(items) { return items.some(function (i) { return i.f >= 2 || i.role === "fat" || i.role === "nut"; }); }
  function hasAcid(items) { return items.some(function (i) { return i.a >= 1; }); }

  function pick(items, test) { return items.filter(test); }

  // Score every dish shape against the pantry.
  function scoreDishes(items) {
    var perishable = items.filter(function (i) { return i.perish >= 2; });
    return HAF.dishes.map(function (d) {
      var needSum = 0, metSum = 0, met = {};
      for (var need in d.needs) {
        var w = d.needs[need];
        needSum += w;
        var ok = fills(items, need);
        met[need] = ok;
        if (ok) metSum += w;
      }
      var coverage = needSum ? metSum / needSum : 0;
      var keyMet = fills(items, d.key);
      // waste score: perishable items this shape can actually use, times how absorbent it is
      var usablePerishables = perishable.filter(function (i) {
        return ["veg", "protein", "egg", "legume", "aromatic", "herb", "dairy", "fruit"].indexOf(i.role) !== -1;
      }).length;
      var wasteScore = usablePerishables * d.absorb;
      // cuisine coherence: small nudge when pantry tags align with the shape
      var cuisineBonus = 0;
      (d.cuisines || []).forEach(function (c) {
        if (items.some(function (i) { return i.tags.indexOf(c) !== -1; })) cuisineBonus += 0.4;
      });
      var score = coverage * 5 + wasteScore + cuisineBonus + (keyMet ? 1 : -4);
      return { dish: d, score: score, coverage: coverage, keyMet: keyMet, met: met, usablePerishables: usablePerishables };
    }).sort(function (x, y) { return y.score - x.score; });
  }

  // Element meter values, 0–100.
  function elementLevels(items, dishChosen) {
    var maxS = Math.max.apply(null, [0].concat(items.map(function (i) { return i.s; })));
    var maxF = Math.max.apply(null, [0].concat(items.map(function (i) { return i.f; })));
    var maxA = Math.max.apply(null, [0].concat(items.map(function (i) { return i.a; })));
    return {
      salt: Math.min(100, maxS * 50),
      fat: Math.min(100, maxF * 50),
      acid: Math.min(100, maxA * 50),
      heat: dishChosen ? 90 : 0 // Heat is a technique — it's "covered" once you commit to a way of cooking
    };
  }

  function nameList(items) {
    var names = items.map(function (i) { return i.name; });
    return names.filter(function (n, idx) { return names.indexOf(n) === idx; });
  }

  // Turn the analysis into specific, plain-language moves for the chosen shape.
  function writeMoves(items, dish) {
    var moves = [];
    var saltItems = pick(items, function (i) { return i.s >= 2 || i.role === "salt"; });
    var fatItems = pick(items, function (i) { return i.f >= 2 || i.role === "fat" || i.role === "nut"; });
    var acidItems = pick(items, function (i) { return i.a >= 1; });

    // SALT
    if (saltItems.length) {
      moves.push({ el: "salt", text: "Salt is covered by your " + humanList(nameList(saltItems)) + " — go easy adding more, and taste before you serve." });
    } else {
      moves.push({ el: "salt", text: "No strong salty ingredient here, so season the food itself as it cooks — in layers, tasting as you go. It'll take more salt than you'd expect." });
    }
    // FAT
    if (fatItems.length) {
      moves.push({ el: "fat", text: "Your fat is the " + humanList(nameList(fatItems)) + " — that's what carries the flavor and gives richness. Don't skimp." });
    } else {
      moves.push({ el: "fat", text: "Add a real fat — a good glug of oil or a knob of butter — or it'll taste thin no matter how well seasoned." });
    }
    // HEAT (from the shape)
    moves.push({ el: "heat", text: dish.heat });
    // ACID
    if (acidItems.length) {
      moves.push({ el: "acid", text: "Finish with your " + humanList(nameList(acidItems)) + " — a hit of acid right at the end lifts everything and makes it taste bright." });
    } else {
      moves.push({ el: "acid", text: "Right before serving, add something sour — a squeeze of lemon, a splash of vinegar, a dollop of yogurt. This one move is what will make it taste finished instead of flat." });
    }
    return moves;
  }

  function humanList(arr) {
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr[0] + " and " + arr[1];
    return arr.slice(0, -1).join(", ") + ", and " + arr[arr.length - 1];
  }

  // The single biggest gap to close — drives "one move to complete it" + the lesson.
  function findGap(items) {
    if (!hasAcid(items)) return "acid";
    if (!hasSalt(items)) return "salt";
    if (!hasFat(items)) return "fat";
    return null;
  }

  var GAP_FIX = {
    acid: "You're missing acid. Grab a lemon or lime, or reach for vinegar — one bright, sour note is the difference between good and flat.",
    salt: "You're light on salt. A splash of soy sauce, a grated hard cheese, a few olives or anchovies — any of these adds the savory backbone.",
    fat: "You're missing fat. Olive oil, butter, a spoon of yogurt or a handful of nuts will carry the flavor and round it out."
  };

  // Main entry point. pantry = [{ name, useFirst }]
  HAF.analyze = function (pantry) {
    var items = pantry.map(function (p) {
      var c = classify(p.name);
      if (!c) return null;
      if (p.useFirst) c.perish = 3;        // "use first" flag forces top priority
      return c;
    }).filter(Boolean);

    if (!items.length) return { empty: true };

    var ranked = scoreDishes(items);
    var best = ranked[0];
    var alternates = ranked.slice(1, 3).filter(function (r) { return r.keyMet && r.coverage >= 0.34; });

    var useFirst = items.slice().filter(function (i) { return i.perish >= 2; })
      .sort(function (a, b) { return b.perish - a.perish; });

    var gap = findGap(items);

    return {
      empty: false,
      items: items,
      best: best.dish,
      bestMeta: best,
      alternates: alternates.map(function (r) { return r.dish; }),
      levels: elementLevels(items, true),
      moves: writeMoves(items, best.dish),
      useFirst: nameList(useFirst),
      gap: gap,
      gapFix: gap ? GAP_FIX[gap] : null,
      lesson: HAF.lessons[gap || "heat"]
    };
  };

  HAF.classify = classify;
  HAF.elementLevels = elementLevels;
})();
