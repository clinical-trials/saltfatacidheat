/* Fuchsia — UI wiring. Vanilla JS, no build step. Pantry persists in localStorage. */
(function () {
  var HAF = window.HAF;
  var STORE = "hafspot.pantry.v1";

  // ——— State
  var pantry = load();

  // ——— Elements
  var $ = function (id) { return document.getElementById(id); };
  var input = $("ingredientInput");
  var addBtn = $("addBtn");
  var suggestions = $("suggestions");
  var pantryEl = $("pantry");
  var coachBtn = $("coachBtn");
  var clearBtn = $("clearBtn");
  var resultEl = $("result");
  var meterCaption = $("meterCaption");

  // Flat searchable list of every name + alias.
  var VOCAB = [];
  HAF.ingredients.forEach(function (ing) {
    VOCAB.push({ label: ing.name, canonical: ing.name });
    (ing.aka || []).forEach(function (a) { VOCAB.push({ label: a, canonical: ing.name }); });
  });

  // ——— Persistence
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || []; }
    catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(pantry)); } catch (e) {}
  }

  // ——— Pantry ops
  function addItem(name) {
    name = String(name || "").trim();
    if (!name) return;
    var exists = pantry.some(function (p) { return p.name.toLowerCase() === name.toLowerCase(); });
    if (exists) { flashChip(name); return; }
    pantry.push({ name: name, useFirst: false });
    save(); renderPantry();
    input.value = ""; hideSuggestions();
  }
  function removeItem(name) {
    pantry = pantry.filter(function (p) { return p.name !== name; });
    save(); renderPantry();
    if (!pantry.length && !resultEl.hidden) { resultEl.hidden = true; }
  }
  function toggleFirst(name) {
    pantry.forEach(function (p) { if (p.name === name) p.useFirst = !p.useFirst; });
    save(); renderPantry();
  }

  function flashChip(name) {
    var chips = pantryEl.querySelectorAll(".chip");
    chips.forEach(function (c) {
      if (c.dataset.name && c.dataset.name.toLowerCase() === name.toLowerCase()) {
        c.style.animation = "none"; void c.offsetWidth; c.style.animation = "pop 0.3s ease";
      }
    });
  }

  // ——— Rendering
  function renderPantry() {
    pantryEl.innerHTML = "";
    pantry.forEach(function (p) {
      var c = HAF.classify(p.name);
      var chip = document.createElement("span");
      chip.className = "chip" + (p.useFirst ? " is-first" : "") + (c && !c.known ? " is-unknown" : "");
      chip.dataset.name = p.name;

      var label = document.createElement("span");
      label.textContent = p.name;
      chip.appendChild(label);

      // Chemistry dots — which elements this ingredient brings to the reaction.
      var contrib = [];
      if (c) {
        if (c.s >= 1) contrib.push("salt");
        if (c.f >= 1) contrib.push("fat");
        if (c.a >= 1) contrib.push("acid");
      }
      if (contrib.length) {
        var els = document.createElement("span");
        els.className = "chip__els";
        els.setAttribute("aria-hidden", "true");
        els.title = "Brings " + contrib.join(", ");
        contrib.forEach(function (el) {
          var dot = document.createElement("span");
          dot.className = "chip__dot";
          dot.dataset.el = el;
          els.appendChild(dot);
        });
        chip.appendChild(els);
      }

      var flame = document.createElement("button");
      flame.className = "chip__flame";
      flame.type = "button";
      flame.textContent = "🔥";
      flame.title = p.useFirst ? "Marked use first — tap to unset" : "Mark use first";
      flame.setAttribute("aria-label", flame.title);
      flame.addEventListener("click", function () { toggleFirst(p.name); });
      chip.appendChild(flame);

      var x = document.createElement("button");
      x.className = "chip__x";
      x.type = "button";
      x.textContent = "✕";
      x.title = "Remove";
      x.setAttribute("aria-label", "Remove " + p.name);
      x.addEventListener("click", function () { removeItem(p.name); });
      chip.appendChild(x);

      pantryEl.appendChild(chip);
    });

    var has = pantry.length > 0;
    coachBtn.disabled = !has;
    clearBtn.hidden = !has;
    syncQuickAddState();
  }

  // ——— Suggestions (typeahead)
  var selIndex = -1;
  function showSuggestions(q) {
    q = q.toLowerCase().trim();
    if (!q) { hideSuggestions(); return; }
    var seen = {}, matches = [];
    VOCAB.forEach(function (v) {
      if (matches.length >= 7) return;
      if (v.label.indexOf(q) !== -1 && !seen[v.canonical]) {
        seen[v.canonical] = true;
        matches.push(v);
      }
    });
    if (!matches.length) { hideSuggestions(); return; }
    suggestions.innerHTML = "";
    matches.forEach(function (m, i) {
      var li = document.createElement("li");
      li.setAttribute("role", "option");
      var idx = m.label.indexOf(q);
      li.innerHTML = m.label.slice(0, idx) + "<b>" + m.label.slice(idx, idx + q.length) + "</b>" + m.label.slice(idx + q.length) +
        (m.label !== m.canonical ? ' <span style="color:var(--muted)">→ ' + m.canonical + "</span>" : "");
      li.addEventListener("mousedown", function (e) { e.preventDefault(); addItem(m.canonical); });
      suggestions.appendChild(li);
    });
    selIndex = -1;
    suggestions.hidden = false;
  }
  function hideSuggestions() { suggestions.hidden = true; selIndex = -1; }
  function moveSel(dir) {
    var items = suggestions.querySelectorAll("li");
    if (!items.length) return;
    selIndex = (selIndex + dir + items.length) % items.length;
    items.forEach(function (li, i) { li.setAttribute("aria-selected", i === selIndex ? "true" : "false"); });
  }

  // ——— Quick add
  function renderQuickAdd() {
    var wrap = $("quickAddGroups");
    HAF.quickAdd.forEach(function (g) {
      var group = document.createElement("div");
      group.className = "qa-group";
      var title = document.createElement("div");
      title.className = "qa-group__title";
      title.textContent = g.group;
      group.appendChild(title);
      var items = document.createElement("div");
      items.className = "qa-group__items";
      g.items.forEach(function (name) {
        var b = document.createElement("button");
        b.className = "qa-pill";
        b.type = "button";
        b.textContent = name;
        b.dataset.name = name;
        b.addEventListener("click", function () {
          var on = pantry.some(function (p) { return p.name.toLowerCase() === name.toLowerCase(); });
          if (on) { removeItem(name); } else { addItem(name); }
        });
        items.appendChild(b);
      });
      group.appendChild(items);
      wrap.appendChild(group);
    });
  }
  function syncQuickAddState() {
    document.querySelectorAll(".qa-pill").forEach(function (b) {
      var on = pantry.some(function (p) { return p.name.toLowerCase() === b.dataset.name.toLowerCase(); });
      b.classList.toggle("added", on);
    });
  }

  // ——— Meter
  function setMeter(levels) {
    ["salt", "fat", "acid", "heat"].forEach(function (el) {
      var fill = document.querySelector('.tube-col[data-el="' + el + '"] .tube__liquid');
      if (fill) fill.style.height = (levels[el] || 0) + "%";
    });
  }

  // ——— Coaching
  function coach() {
    var a = HAF.analyze(pantry);
    if (a.empty) return;
    setMeter(a.levels);
    meterCaption.textContent = "Heat is lit once you pick a way to cook — here's your balance.";
    renderResult(a);
    resultEl.hidden = false;
    resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderResult(a) {
    var d = a.best;
    var altHtml = a.alternates.length
      ? '<div class="rc-section"><h3>Not feeling it? Also works</h3><div class="alts">' +
        a.alternates.map(function (alt) {
          return '<button class="alt-chip" data-id="' + alt.id + '"><span>' + alt.emoji + "</span>" + alt.name + "</button>";
        }).join("") + "</div></div>"
      : "";

    var useFirstHtml = a.useFirst.length
      ? '<div class="rc-section"><h3>Use these first</h3><div class="usefirst">' +
        a.useFirst.map(function (n) { return '<span class="usefirst__tag">' + n + "</span>"; }).join("") +
        "</div></div>"
      : "";

    var completeHtml = a.gapFix
      ? '<div class="completeit"><span class="completeit__icon">✦</span><div><b>One move to complete it</b><p>' + a.gapFix + "</p></div></div>"
      : '<div class="completeit"><span class="completeit__icon">✓</span><div><b>Well balanced already</b><p>You\'ve got salt, fat and acid on hand — just cook it with confidence.</p></div></div>';

    var movesHtml = a.moves.map(function (m) {
      return '<div class="move" data-el="' + m.el + '"><div class="move__el">' + m.el + '</div><div class="move__text">' + m.text + "</div></div>";
    }).join("");

    resultEl.innerHTML =
      '<div class="result-card">' +
        '<div class="rc-head">' +
          '<p class="kicker">Make this</p>' +
          '<h2><span class="emoji">' + d.emoji + "</span> " + d.name + "</h2>" +
          "<p>" + d.blurb + "</p>" +
        "</div>" +
        '<div class="rc-body">' +
          useFirstHtml +
          '<div class="rc-section"><h3>Your four moves</h3><div class="moves">' + movesHtml + "</div></div>" +
          completeHtml +
          '<div class="rc-section"><h3>Why it works</h3><p class="lesson">' + a.lesson + "</p></div>" +
          altHtml +
        "</div>" +
      "</div>";

    // wire alternates
    resultEl.querySelectorAll(".alt-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.id;
        var dish = HAF.dishes.filter(function (x) { return x.id === id; })[0];
        if (!dish) return;
        // Re-run analysis but force this shape as best.
        var a2 = HAF.analyze(pantry);
        a2.best = dish;
        a2.moves = rebuildMoves(a2, dish);
        renderResult(a2);
        resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // Rebuild moves when the user picks an alternate (heat text comes from that shape).
  function rebuildMoves(a, dish) {
    return a.moves.map(function (m) {
      if (m.el === "heat") return { el: "heat", text: dish.heat };
      return m;
    });
  }

  // ——— Theme
  function initTheme() {
    var saved = localStorage.getItem("hafspot.theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    $("themeToggle").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("hafspot.theme", next); } catch (e) {}
    });
  }

  // ——— Events
  addBtn.addEventListener("click", function () { addItem(input.value); });
  input.addEventListener("input", function () { showSuggestions(input.value); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); moveSel(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveSel(-1); }
    else if (e.key === "Enter") {
      e.preventDefault();
      var items = suggestions.querySelectorAll("li");
      if (!suggestions.hidden && selIndex >= 0 && items[selIndex]) {
        items[selIndex].dispatchEvent(new MouseEvent("mousedown"));
      } else { addItem(input.value); }
    } else if (e.key === "Escape") { hideSuggestions(); }
  });
  document.addEventListener("click", function (e) {
    if (!suggestions.contains(e.target) && e.target !== input) hideSuggestions();
  });
  coachBtn.addEventListener("click", coach);
  clearBtn.addEventListener("click", function () {
    pantry = []; save(); renderPantry();
    resultEl.hidden = true;
    setMeter({ salt: 0, fat: 0, acid: 0, heat: 0 });
    meterCaption.textContent = "Your balance across the four elements shows up here.";
  });

  // ——— Photo reading (browser-direct Claude vision)
  function addRecognized(items) {
    var added = 0;
    items.forEach(function (it) {
      var exists = pantry.some(function (p) { return p.name.toLowerCase() === it.name.toLowerCase(); });
      if (!exists) { pantry.push({ name: it.name, useFirst: !!it.useFirst }); added++; }
    });
    save(); renderPantry();
    return added;
  }

  function initVision() {
    var photoInput = $("photoInput"), photoBtn = $("photoBtn"),
        photoPreview = $("photoPreview"), photoStatus = $("photoStatus"),
        keyRow = $("keyRow"), keyInput = $("keyInput"), keySave = $("keySave"), keyStatus = $("keyStatus");
    if (!photoBtn) return;

    function refreshKey() {
      var has = !!HAF.getKey();
      keyStatus.textContent = has ? "Key connected — stored only in this browser." : "";
      keyInput.placeholder = has ? "•••• connected — paste to replace" : "sk-ant-…";
    }
    refreshKey();

    keySave.addEventListener("click", function () {
      HAF.setKey(keyInput.value.trim());
      keyInput.value = "";
      refreshKey();
      keyRow.open = false;
    });

    photoBtn.addEventListener("click", function () {
      if (!HAF.getKey()) {
        keyRow.open = true;
        photoStatus.hidden = false;
        photoStatus.textContent = "Add your Anthropic key first, then snap again.";
        keyInput.focus();
        return;
      }
      photoInput.click();
    });

    photoInput.addEventListener("change", function () {
      var file = photoInput.files && photoInput.files[0];
      if (!file) return;
      photoStatus.hidden = false;
      photoStatus.textContent = "Reading your fridge…";
      HAF.fileToImage(file).then(function (img) {
        photoPreview.hidden = false;
        photoPreview.innerHTML = '<img alt="your fridge photo" src="' + img.dataUrl + '" />';
        return HAF.readFridge(img.base64, img.mediaType);
      }).then(function (items) {
        photoInput.value = "";
        if (!items.length) {
          photoStatus.textContent = "Couldn't spot clear ingredients — try a closer, brighter photo, or list them by hand.";
          return;
        }
        var n = addRecognized(items);
        photoStatus.innerHTML = n
          ? "Added <b>" + n + "</b> item" + (n === 1 ? "" : "s") + " — fix anything I misread, then hit Coach me."
          : "Those items were already on your list.";
      }).catch(function (err) {
        photoInput.value = "";
        var msg = String((err && err.message) || err);
        if (msg === "no-key") { keyRow.open = true; photoStatus.textContent = "Add your Anthropic key first."; }
        else if (msg.indexOf("api:401") !== -1) { photoStatus.textContent = "That key was rejected (401). Check it and try again."; }
        else if (msg.indexOf("api:429") !== -1) { photoStatus.textContent = "Rate limited — wait a moment and snap again."; }
        else if (msg.indexOf("api:") !== -1) { photoStatus.textContent = "Claude couldn't read it just now — try again, or list by hand."; }
        else { photoStatus.textContent = "Couldn't read that photo — you can still list items by hand."; }
      });
    });
  }

  // ——— Stock-the-pantry guide
  function renderPantryGuide() {
    var grid = $("shelfGrid");
    if (!grid || !HAF.pantryShelves) return;
    var SYM = { salt: "S", fat: "F", acid: "A", heat: "H" };
    HAF.pantryShelves.forEach(function (s) {
      var card = document.createElement("div");
      card.className = "shelf";
      card.dataset.el = s.el;
      card.style.setProperty("--el", "var(--" + s.el + ")");

      var itemsHtml = function (items) {
        return '<span class="shelf__items">' + items.map(function (i) {
          return '<span class="shelf__item">' + i + "</span>";
        }).join("") + "</span>";
      };

      var html = '<div class="shelf__head"><span class="shelf__sym">' + SYM[s.el] + "</span>" +
        '<div><h3 class="shelf__name">' + s.name + "</h3>" +
        '<p class="shelf__tag">' + s.tagline + "</p></div></div>";

      if (s.groups) {
        s.groups.forEach(function (g) {
          html += '<div class="shelf__group"><div class="shelf__group-label">' + g.label + "</div>" + itemsHtml(g.items) + "</div>";
        });
      }
      if (s.chile) {
        html += '<div class="chile-scale">';
        s.chile.forEach(function (c) {
          html += '<div class="chile-row"><span class="chile-level">' + c.level +
            ' <span class="chile-flames">' + "🌶️".repeat(c.flames) + "</span></span>" + itemsHtml(c.items) + "</div>";
        });
        html += "</div>";
      }
      if (s.note) html += '<p class="shelf__note">' + s.note + "</p>";

      card.innerHTML = html;
      grid.appendChild(card);
    });
  }

  // ——— The six tastes (flavor-lab reference)
  function renderTasteLab() {
    var grid = $("tasteGrid");
    if (!grid || !HAF.tastes) return;
    HAF.tastes.forEach(function (t) {
      var card = document.createElement("div");
      card.className = "taste";
      card.style.setProperty("--el", "var(--taste-" + t.key + ")");
      card.innerHTML =
        '<div class="taste__label">' +
          '<div class="taste__name">' + t.name + "</div>" +
          '<div class="taste__chem">' + t.chem + "</div>" +
          '<div class="taste__role">' + t.role.map(function (r) { return "<span>" + r + "</span>"; }).join("") + "</div>" +
        "</div>" +
        '<div class="taste__items">' + t.items.map(function (i) { return '<span class="taste__item">' + i + "</span>"; }).join("") + "</div>";
      grid.appendChild(card);
    });
  }

  // ——— Boot
  renderQuickAdd();
  renderPantry();
  renderTasteLab();
  renderPantryGuide();
  initTheme();
  initVision();
})();
