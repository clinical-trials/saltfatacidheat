/* Fuchsia — knowledge base
 * The four elements: Salt · Fat · Acid · Heat (Samin Nosrat's "Salt, Fat, Acid, Heat").
 * Salt/Fat/Acid are carried by ingredients (0–2 strength). Heat is a technique the dish supplies.
 *
 * Ingredient shape:
 *   name   canonical display name
 *   aka    aliases / plurals for matching
 *   role   plate role: protein | veg | starch | aromatic | fat | acid | dairy | fruit | herb | spice | salt | nut | sweet | condiment | egg | legume
 *   s,f,a  salt / fat / acid contribution, 0–2
 *   perish 0 pantry-stable · 1 keeps a while · 2 use this week · 3 use now
 *   tags   flavor / cuisine affinities and flags
 */
window.HAF = window.HAF || {};

HAF.ingredients = [
  // ——— Proteins
  { name: "chicken", aka: ["chicken breast", "chicken thigh", "chicken thighs"], role: "protein", s: 0, f: 1, a: 0, perish: 2, tags: ["versatile", "searable"] },
  { name: "ground beef", aka: ["beef", "mince", "hamburger"], role: "protein", s: 0, f: 2, a: 0, perish: 2, tags: ["hearty", "searable"] },
  { name: "steak", aka: ["beef steak"], role: "protein", s: 0, f: 2, a: 0, perish: 2, tags: ["searable"] },
  { name: "pork", aka: ["pork chop", "pork chops", "ground pork"], role: "protein", s: 0, f: 2, a: 0, perish: 2, tags: ["searable"] },
  { name: "bacon", aka: [], role: "protein", s: 2, f: 2, a: 0, perish: 1, tags: ["cured", "salt", "umami"] },
  { name: "sausage", aka: ["sausages", "chorizo"], role: "protein", s: 1, f: 2, a: 0, perish: 2, tags: ["searable", "salt"] },
  { name: "deli ham", aka: ["ham"], role: "protein", s: 2, f: 1, a: 0, perish: 1, tags: ["cured", "salt"] },
  { name: "salmon", aka: [], role: "protein", s: 0, f: 2, a: 0, perish: 3, tags: ["fish", "searable"] },
  { name: "white fish", aka: ["cod", "tilapia", "fish fillet"], role: "protein", s: 0, f: 0, a: 0, perish: 3, tags: ["fish", "delicate"] },
  { name: "shrimp", aka: ["prawns"], role: "protein", s: 0, f: 0, a: 0, perish: 3, tags: ["seafood", "quick"] },
  { name: "canned tuna", aka: ["tuna"], role: "protein", s: 1, f: 1, a: 0, perish: 0, tags: ["pantry"] },
  { name: "tofu", aka: [], role: "protein", s: 0, f: 1, a: 0, perish: 2, tags: ["asian", "neutral"] },
  { name: "eggs", aka: ["egg"], role: "egg", s: 0, f: 1, a: 0, perish: 1, tags: ["binder", "versatile"] },
  { name: "canned beans", aka: ["beans", "black beans", "kidney beans", "cannellini"], role: "legume", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "hearty"] },
  { name: "chickpeas", aka: ["garbanzo", "garbanzos"], role: "legume", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "hearty"] },
  { name: "lentils", aka: ["red lentils", "green lentils"], role: "legume", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "hearty"] },

  // ——— Dairy
  { name: "milk", aka: [], role: "dairy", s: 0, f: 1, a: 0, perish: 2, tags: [] },
  { name: "butter", aka: [], role: "fat", s: 0, f: 2, a: 0, perish: 1, tags: ["rich"] },
  { name: "yogurt", aka: ["greek yogurt", "plain yogurt"], role: "dairy", s: 0, f: 1, a: 1, perish: 2, tags: ["tangy", "creamy"] },
  { name: "sour cream", aka: [], role: "dairy", s: 0, f: 2, a: 1, perish: 2, tags: ["tangy", "creamy"] },
  { name: "parmesan", aka: ["parmigiano", "pecorino", "grana"], role: "dairy", s: 2, f: 1, a: 0, perish: 1, tags: ["umami", "salt", "italian"] },
  { name: "cheddar", aka: ["cheese"], role: "dairy", s: 1, f: 2, a: 0, perish: 1, tags: ["melty"] },
  { name: "feta", aka: [], role: "dairy", s: 2, f: 1, a: 1, perish: 1, tags: ["salt", "tangy", "mediterranean"] },
  { name: "mozzarella", aka: [], role: "dairy", s: 1, f: 1, a: 0, perish: 2, tags: ["melty", "italian"] },
  { name: "cream", aka: ["heavy cream"], role: "fat", s: 0, f: 2, a: 0, perish: 2, tags: ["rich"] },
  { name: "cream cheese", aka: [], role: "dairy", s: 1, f: 2, a: 1, perish: 1, tags: ["creamy"] },

  // ——— Vegetables
  { name: "spinach", aka: ["baby spinach"], role: "veg", s: 0, f: 0, a: 0, perish: 3, tags: ["leafy", "wilts"] },
  { name: "kale", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["leafy", "hearty"] },
  { name: "lettuce", aka: ["romaine", "mixed greens", "salad greens"], role: "veg", s: 0, f: 0, a: 0, perish: 3, tags: ["leafy", "raw", "wilts"] },
  { name: "arugula", aka: ["rocket"], role: "veg", s: 0, f: 0, a: 0, perish: 3, tags: ["leafy", "peppery", "raw"] },
  { name: "tomato", aka: ["tomatoes", "cherry tomatoes"], role: "veg", s: 0, f: 0, a: 1, perish: 2, tags: ["acid", "fresh"] },
  { name: "carrot", aka: ["carrots"], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["sweet", "hardy"] },
  { name: "bell pepper", aka: ["pepper", "peppers", "capsicum"], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["sweet"] },
  { name: "broccoli", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["roastable"] },
  { name: "cauliflower", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["roastable"] },
  { name: "zucchini", aka: ["courgette"], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["watery"] },
  { name: "mushroom", aka: ["mushrooms"], role: "veg", s: 0, f: 0, a: 0, perish: 3, tags: ["umami", "searable"] },
  { name: "cabbage", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["hardy", "crunch"] },
  { name: "cucumber", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["fresh", "raw"] },
  { name: "corn", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["sweet"] },
  { name: "peas", aka: ["green peas", "frozen peas"], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["sweet", "freezer"] },
  { name: "green beans", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: [] },
  { name: "eggplant", aka: ["aubergine"], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["roastable"] },
  { name: "asparagus", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 3, tags: ["quick"] },
  { name: "beet", aka: ["beets", "beetroot"], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["sweet", "hardy"] },
  { name: "squash", aka: ["butternut", "pumpkin"], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["sweet", "hardy", "roastable"] },
  { name: "avocado", aka: [], role: "fruit", s: 0, f: 2, a: 0, perish: 2, tags: ["fat", "creamy"] },

  // ——— Aromatics
  { name: "onion", aka: ["onions", "yellow onion", "red onion"], role: "aromatic", s: 0, f: 0, a: 0, perish: 1, tags: ["base", "hardy"] },
  { name: "garlic", aka: [], role: "aromatic", s: 0, f: 0, a: 0, perish: 0, tags: ["base", "pantry"] },
  { name: "ginger", aka: [], role: "aromatic", s: 0, f: 0, a: 0, perish: 1, tags: ["asian"] },
  { name: "scallion", aka: ["scallions", "green onion", "green onions", "spring onion"], role: "aromatic", s: 0, f: 0, a: 0, perish: 2, tags: ["asian", "fresh"] },
  { name: "leek", aka: ["leeks"], role: "aromatic", s: 0, f: 0, a: 0, perish: 1, tags: ["base"] },
  { name: "celery", aka: [], role: "aromatic", s: 0, f: 0, a: 0, perish: 2, tags: ["base"] },
  { name: "shallot", aka: ["shallots"], role: "aromatic", s: 0, f: 0, a: 0, perish: 1, tags: ["base"] },
  { name: "jalapeño", aka: ["jalapeno", "chili", "chile", "serrano"], role: "aromatic", s: 0, f: 0, a: 0, perish: 2, tags: ["spicy", "heat"] },

  // ——— Fruit
  { name: "lemon", aka: ["lemons"], role: "acid", s: 0, f: 0, a: 2, perish: 1, tags: ["bright", "finisher"] },
  { name: "lime", aka: ["limes"], role: "acid", s: 0, f: 0, a: 2, perish: 1, tags: ["bright", "finisher", "mexican"] },
  { name: "orange", aka: ["oranges"], role: "fruit", s: 0, f: 0, a: 1, perish: 1, tags: ["sweet", "bright"] },
  { name: "apple", aka: ["apples"], role: "fruit", s: 0, f: 0, a: 1, perish: 1, tags: ["sweet", "crunch"] },
  { name: "banana", aka: ["bananas"], role: "fruit", s: 0, f: 0, a: 0, perish: 2, tags: ["sweet"] },
  { name: "berries", aka: ["strawberries", "blueberries", "raspberries"], role: "fruit", s: 0, f: 0, a: 1, perish: 3, tags: ["sweet", "wilts"] },
  { name: "grapes", aka: [], role: "fruit", s: 0, f: 0, a: 0, perish: 1, tags: ["sweet"] },

  // ——— Starch / grains
  { name: "rice", aka: ["white rice", "brown rice"], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "neutral"] },
  { name: "cooked rice", aka: ["leftover rice", "day-old rice"], role: "starch", s: 0, f: 0, a: 0, perish: 2, tags: ["leftover", "friedrice"] },
  { name: "pasta", aka: ["spaghetti", "penne", "macaroni"], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "italian"] },
  { name: "bread", aka: ["stale bread", "baguette", "loaf"], role: "starch", s: 0, f: 0, a: 0, perish: 1, tags: ["stale-ok"] },
  { name: "tortilla", aka: ["tortillas", "wrap", "wraps"], role: "starch", s: 0, f: 0, a: 0, perish: 1, tags: ["mexican"] },
  { name: "quinoa", aka: [], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "protein"] },
  { name: "couscous", aka: [], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "quick"] },
  { name: "noodles", aka: ["ramen", "udon", "rice noodles"], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["asian", "pantry"] },
  { name: "potato", aka: ["potatoes"], role: "starch", s: 0, f: 0, a: 0, perish: 1, tags: ["hardy", "roastable"] },
  { name: "sweet potato", aka: ["sweet potatoes"], role: "starch", s: 0, f: 0, a: 0, perish: 1, tags: ["hardy", "sweet", "roastable"] },
  { name: "oats", aka: ["oatmeal", "rolled oats"], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry", "breakfast"] },

  // ——— Fats / oils
  { name: "olive oil", aka: ["evoo"], role: "fat", s: 0, f: 2, a: 0, perish: 0, tags: ["pantry", "finisher"] },
  { name: "vegetable oil", aka: ["canola oil", "cooking oil", "neutral oil"], role: "fat", s: 0, f: 2, a: 0, perish: 0, tags: ["pantry", "high-heat"] },
  { name: "sesame oil", aka: [], role: "fat", s: 0, f: 1, a: 0, perish: 0, tags: ["asian", "finisher"] },
  { name: "coconut milk", aka: [], role: "fat", s: 0, f: 2, a: 0, perish: 0, tags: ["curry", "creamy"] },
  { name: "tahini", aka: [], role: "fat", s: 0, f: 2, a: 0, perish: 0, tags: ["nutty", "creamy"] },
  { name: "mayonnaise", aka: ["mayo"], role: "fat", s: 0, f: 2, a: 1, perish: 1, tags: ["creamy"] },
  { name: "peanut butter", aka: [], role: "nut", s: 0, f: 2, a: 0, perish: 0, tags: ["nutty", "asian"] },
  { name: "almonds", aka: ["walnuts", "nuts", "pecans"], role: "nut", s: 0, f: 1, a: 0, perish: 0, tags: ["crunch", "finisher"] },

  // ——— Acids
  { name: "vinegar", aka: ["red wine vinegar", "white vinegar", "apple cider vinegar", "rice vinegar"], role: "acid", s: 0, f: 0, a: 2, perish: 0, tags: ["pantry", "finisher"] },
  { name: "balsamic", aka: ["balsamic vinegar"], role: "acid", s: 0, f: 0, a: 2, perish: 0, tags: ["pantry", "sweet-sour"] },
  { name: "wine", aka: ["white wine", "red wine"], role: "acid", s: 0, f: 0, a: 1, perish: 0, tags: ["deglaze"] },
  { name: "dijon mustard", aka: ["mustard"], role: "condiment", s: 1, f: 0, a: 1, perish: 0, tags: ["pantry", "emulsifier"] },
  { name: "pickles", aka: ["pickle", "cornichons"], role: "acid", s: 1, f: 0, a: 2, perish: 0, tags: ["pantry", "crunch"] },
  { name: "salsa", aka: [], role: "condiment", s: 1, f: 0, a: 1, perish: 1, tags: ["mexican", "fresh"] },
  { name: "canned tomatoes", aka: ["crushed tomatoes", "diced tomatoes", "passata"], role: "veg", s: 0, f: 0, a: 1, perish: 0, tags: ["pantry", "acid", "base"] },
  { name: "tomato paste", aka: [], role: "condiment", s: 0, f: 0, a: 1, perish: 0, tags: ["pantry", "umami"] },
  { name: "ketchup", aka: [], role: "condiment", s: 1, f: 0, a: 1, perish: 0, tags: ["sweet"] },
  { name: "hot sauce", aka: ["sriracha", "tabasco"], role: "condiment", s: 1, f: 0, a: 1, perish: 0, tags: ["spicy", "heat"] },

  // ——— Salt / umami
  { name: "soy sauce", aka: ["soy", "tamari"], role: "salt", s: 2, f: 0, a: 0, perish: 0, tags: ["umami", "asian", "pantry"] },
  { name: "miso", aka: ["miso paste"], role: "salt", s: 2, f: 0, a: 0, perish: 0, tags: ["umami", "asian"] },
  { name: "fish sauce", aka: [], role: "salt", s: 2, f: 0, a: 0, perish: 0, tags: ["umami", "asian"] },
  { name: "anchovy", aka: ["anchovies"], role: "salt", s: 2, f: 1, a: 0, perish: 0, tags: ["umami", "melts"] },
  { name: "capers", aka: [], role: "salt", s: 2, f: 0, a: 1, perish: 0, tags: ["briny", "mediterranean"] },
  { name: "olives", aka: [], role: "salt", s: 2, f: 1, a: 0, perish: 0, tags: ["briny", "mediterranean"] },
  { name: "stock", aka: ["broth", "chicken stock", "vegetable stock", "bouillon"], role: "salt", s: 1, f: 0, a: 0, perish: 0, tags: ["base", "pantry"] },

  // ——— Herbs
  { name: "basil", aka: [], role: "herb", s: 0, f: 0, a: 0, perish: 3, tags: ["italian", "fresh", "wilts"] },
  { name: "cilantro", aka: ["coriander"], role: "herb", s: 0, f: 0, a: 0, perish: 3, tags: ["mexican", "asian", "fresh", "wilts"] },
  { name: "parsley", aka: [], role: "herb", s: 0, f: 0, a: 0, perish: 2, tags: ["fresh", "finisher"] },
  { name: "mint", aka: [], role: "herb", s: 0, f: 0, a: 0, perish: 3, tags: ["fresh", "wilts"] },
  { name: "dill", aka: [], role: "herb", s: 0, f: 0, a: 0, perish: 3, tags: ["fresh", "wilts"] },
  { name: "rosemary", aka: ["thyme", "sage"], role: "herb", s: 0, f: 0, a: 0, perish: 1, tags: ["woody", "roast"] },

  // ——— Spices
  { name: "cumin", aka: [], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["warm", "mexican"] },
  { name: "paprika", aka: ["smoked paprika"], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["warm", "smoky"] },
  { name: "chili flakes", aka: ["red pepper flakes", "chilli flakes"], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["heat", "spicy"] },
  { name: "curry powder", aka: ["garam masala"], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["warm", "curry"] },
  { name: "oregano", aka: ["dried oregano", "italian seasoning"], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["italian"] },
  { name: "cinnamon", aka: [], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["warm", "sweet"] },

  // ——— Sweet
  { name: "honey", aka: [], role: "sweet", s: 0, f: 0, a: 0, perish: 0, tags: ["balancer"] },
  { name: "maple syrup", aka: ["maple"], role: "sweet", s: 0, f: 0, a: 0, perish: 0, tags: ["balancer"] },
  { name: "sugar", aka: ["brown sugar"], role: "sweet", s: 0, f: 0, a: 0, perish: 0, tags: ["balancer"] },

  // ——— Wider coverage
  { name: "turkey", aka: ["ground turkey"], role: "protein", s: 0, f: 1, a: 0, perish: 2, tags: ["searable"] },
  { name: "lamb", aka: [], role: "protein", s: 0, f: 2, a: 0, perish: 2, tags: ["searable"] },
  { name: "edamame", aka: [], role: "legume", s: 0, f: 0, a: 0, perish: 1, tags: ["asian", "freezer"] },
  { name: "smoked salmon", aka: ["lox"], role: "protein", s: 2, f: 1, a: 0, perish: 1, tags: ["cured", "salt"] },
  { name: "brussels sprouts", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["roastable", "hardy"] },
  { name: "bok choy", aka: ["pak choi"], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["leafy", "asian"] },
  { name: "chard", aka: ["swiss chard"], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["leafy"] },
  { name: "radish", aka: ["radishes"], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["crunch", "raw"] },
  { name: "fennel", aka: [], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["aromatic"] },
  { name: "turnip", aka: ["turnips"], role: "veg", s: 0, f: 0, a: 0, perish: 1, tags: ["hardy", "roastable"] },
  { name: "snap peas", aka: ["snow peas", "sugar snap peas"], role: "veg", s: 0, f: 0, a: 0, perish: 2, tags: ["crunch"] },
  { name: "pear", aka: ["pears"], role: "fruit", s: 0, f: 0, a: 1, perish: 1, tags: ["sweet"] },
  { name: "mango", aka: [], role: "fruit", s: 0, f: 0, a: 1, perish: 2, tags: ["sweet"] },
  { name: "pineapple", aka: [], role: "fruit", s: 0, f: 0, a: 1, perish: 2, tags: ["sweet", "bright"] },
  { name: "ricotta", aka: [], role: "dairy", s: 0, f: 1, a: 0, perish: 2, tags: ["creamy", "italian"] },
  { name: "goat cheese", aka: ["chevre"], role: "dairy", s: 1, f: 1, a: 1, perish: 1, tags: ["tangy"] },
  { name: "cottage cheese", aka: [], role: "dairy", s: 1, f: 1, a: 0, perish: 2, tags: ["creamy"] },
  { name: "gnocchi", aka: [], role: "starch", s: 0, f: 0, a: 0, perish: 1, tags: ["italian"] },
  { name: "polenta", aka: ["cornmeal", "grits"], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["pantry"] },
  { name: "pita", aka: ["flatbread", "naan"], role: "starch", s: 0, f: 0, a: 0, perish: 1, tags: ["bread"] },
  { name: "chives", aka: [], role: "herb", s: 0, f: 0, a: 0, perish: 2, tags: ["fresh", "finisher"] },
  { name: "coconut oil", aka: [], role: "fat", s: 0, f: 2, a: 0, perish: 0, tags: ["pantry"] },
  { name: "ghee", aka: ["clarified butter"], role: "fat", s: 0, f: 2, a: 0, perish: 0, tags: ["high-heat", "curry"] },
  { name: "pesto", aka: [], role: "fat", s: 1, f: 2, a: 0, perish: 1, tags: ["italian", "finisher"] },
  { name: "hummus", aka: [], role: "legume", s: 1, f: 1, a: 1, perish: 1, tags: ["creamy", "mediterranean"] },
  { name: "curry paste", aka: ["thai curry paste"], role: "spice", s: 1, f: 0, a: 0, perish: 0, tags: ["curry", "asian"] },
  { name: "gochujang", aka: ["chili paste"], role: "condiment", s: 1, f: 0, a: 1, perish: 0, tags: ["spicy", "asian", "heat"] },
  { name: "sesame seeds", aka: ["sesame"], role: "nut", s: 0, f: 1, a: 0, perish: 0, tags: ["crunch", "asian", "finisher"] },
  { name: "breadcrumbs", aka: ["panko"], role: "starch", s: 0, f: 0, a: 0, perish: 0, tags: ["crunch", "pantry"] },
  { name: "turmeric", aka: [], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["curry", "warm"] },
  { name: "cayenne", aka: ["chili powder"], role: "spice", s: 0, f: 0, a: 0, perish: 0, tags: ["heat", "spicy"] },
  { name: "jam", aka: ["jelly", "preserves"], role: "sweet", s: 0, f: 0, a: 1, perish: 0, tags: ["balancer"] }
];

/* Dish templates.
 * needs: role weights (how much this shape wants each role). Engine checks what the pantry can fill.
 * key: the make-or-break role — if the pantry can't fill it, the dish isn't offered.
 * heat: the Heat move (the technique this shape supplies).
 * absorb: how well it soaks up odds-and-ends (drives the waste score).
 */
HAF.dishes = [
  {
    id: "frittata", name: "Frittata", emoji: "🍳",
    blurb: "Eggs are the great rescuers — almost any wilting veg, herb, or cheese heel disappears into a frittata.",
    needs: { egg: 2, veg: 1.5, aromatic: 1, dairy: 1, starch: 0.5 }, key: "egg",
    heat: "Sweat the veg in a glug of fat, pour beaten eggs over low heat, then finish under the broiler until just set — pull it while the center still wobbles.",
    absorb: 1.6, raw: false, cuisines: ["italian"]
  },
  {
    id: "stirfry", name: "Stir-fry", emoji: "🥢",
    blurb: "The fastest way to clear a crisper drawer: hot pan, hard-and-fast, one bright-salty sauce to tie it together.",
    needs: { protein: 1.5, veg: 2, aromatic: 1.5, starch: 0.5 }, key: "veg",
    heat: "Get the pan screaming hot before anything goes in. Cook in batches so it sears instead of steams — crowding is the enemy of a good stir-fry.",
    absorb: 1.7, raw: false, cuisines: ["asian"]
  },
  {
    id: "soup", name: "Soup or stew", emoji: "🍲",
    blurb: "The most forgiving pot in the kitchen. Sad, bendy vegetables become the whole point here.",
    needs: { aromatic: 1.5, veg: 2, protein: 1, legume: 1, starch: 0.5 }, key: "veg",
    heat: "Build a base with aromatics in fat, add everything else, then a low simmer — long and gentle for stew, 20 quick minutes for a brothy soup.",
    absorb: 2.0, raw: false, cuisines: []
  },
  {
    id: "grainbowl", name: "Grain bowl", emoji: "🥗",
    blurb: "A grain, a protein, whatever veg you've got, and a dressing doing the heavy lifting. Endlessly mix-and-match.",
    needs: { starch: 2, veg: 1.5, protein: 1, acid: 1 }, key: "starch",
    heat: "Mostly assembly — but roast or sear at least one component so the bowl has a warm, browned anchor instead of tasting like a pile of parts.",
    absorb: 1.5, raw: false, cuisines: []
  },
  {
    id: "pasta", name: "Pasta", emoji: "🍝",
    blurb: "Salty, starchy pasta water is a sauce ingredient in disguise. A little fat and something savory, and dinner's done.",
    needs: { starch: 2, veg: 1, aromatic: 1 }, key: "starch",
    heat: "Boil the pasta in well-salted water; pull it a minute early and finish it in the pan with your fat and a splash of that starchy water to emulsify a glossy sauce.",
    absorb: 1.3, raw: false, cuisines: ["italian"]
  },
  {
    id: "tacos", name: "Tacos or wraps", emoji: "🌮",
    blurb: "Anything savory, folded in a warm tortilla with something crunchy and something bright. Leftovers love this.",
    needs: { protein: 1.5, starch: 1.5, veg: 1, acid: 1, aromatic: 0.5 }, key: "starch",
    heat: "Sear the filling hard for browned edges, and char the tortillas straight over the flame or in a dry pan until they blister.",
    absorb: 1.4, raw: false, cuisines: ["mexican"]
  },
  {
    id: "friedrice", name: "Fried rice", emoji: "🍚",
    blurb: "Purpose-built for day-old rice and the last of everything. Cold rice fries up better than fresh.",
    needs: { starch: 2, egg: 1, veg: 1.5, aromatic: 1 }, key: "starch",
    heat: "Very hot pan, cold rice, keep it moving. Push everything aside to scramble the egg, then fold it back through. Soy at the end so it doesn't burn.",
    absorb: 1.7, raw: false, cuisines: ["asian"]
  },
  {
    id: "sheetpan", name: "Sheet-pan roast", emoji: "🔥",
    blurb: "Hardy veg and a protein on one tray. Hands-off, and the oven does the browning for you.",
    needs: { veg: 2, protein: 1.5, aromatic: 0.5 }, key: "veg",
    heat: "Hot oven, ~425°F. Toss everything in enough fat to coat, spread it out with room to breathe, and don't stir too early — let it brown before you flip.",
    absorb: 1.4, raw: false, cuisines: []
  },
  {
    id: "salad", name: "Big salad", emoji: "🥬",
    blurb: "For crisp things on their last good day. A real dressing — fat plus acid — turns raw veg into a meal.",
    needs: { veg: 2, protein: 1, acid: 1.5, fat: 1 }, key: "veg",
    heat: "No heat needed — but toast some nuts or bread, or add a warm seared element, so it eats like dinner and not a side.",
    absorb: 1.2, raw: true, cuisines: []
  },
  {
    id: "shakshuka", name: "Eggs in tomato", emoji: "🍅",
    blurb: "Shakshuka-style: a spiced tomato base with eggs poached right in it. Built from pantry staples.",
    needs: { egg: 2, veg: 1.5, aromatic: 1, acid: 1 }, key: "egg",
    heat: "Simmer a tomato base until jammy, make wells, crack the eggs in, cover, and cook low until the whites set and the yolks stay runny.",
    absorb: 1.5, raw: false, cuisines: ["mediterranean"]
  },
  {
    id: "curry", name: "Curry", emoji: "🍛",
    blurb: "Aromatics, spice, and something creamy carry almost any protein or vegetable. Deeply forgiving.",
    needs: { aromatic: 1.5, protein: 1, veg: 1.5, starch: 1, fat: 0.5 }, key: "aromatic",
    heat: "Bloom your spices in fat with the aromatics first — that base is the whole dish — then add everything and simmer in coconut milk or stock until it thickens.",
    absorb: 1.5, raw: false, cuisines: ["asian", "curry"]
  },
  {
    id: "noodlesoup", name: "Noodle soup", emoji: "🍜",
    blurb: "A brothy bowl that stretches a little protein and a lot of odds-and-ends into dinner.",
    needs: { starch: 1.5, aromatic: 1, veg: 1.5, protein: 1 }, key: "starch",
    heat: "Simmer a savory broth with the aromatics, then add quick-cooking veg and the noodles right at the end so they don't turn to mush.",
    absorb: 1.7, raw: false, cuisines: ["asian"]
  },
  {
    id: "quesadilla", name: "Quesadilla or melt", emoji: "🫓",
    blurb: "Cheese is the glue. A tortilla or bread plus whatever savory bits need using up.",
    needs: { starch: 1.5, dairy: 1.5, veg: 1, protein: 0.5 }, key: "starch",
    heat: "Low and slow in a dry or lightly buttered pan — the outside should be crisp and golden by the time the cheese is fully molten.",
    absorb: 1.3, raw: false, cuisines: ["mexican"]
  },
  {
    id: "hash", name: "Crispy hash", emoji: "🥔",
    blurb: "Crispy potatoes, a protein, and eggs. Breakfast-for-dinner that clears the drawer.",
    needs: { starch: 1.5, protein: 1, egg: 1, veg: 1, aromatic: 0.5 }, key: "starch",
    heat: "Crisp the potatoes hard in plenty of fat and resist stirring — let a real crust form. Fold everything else in, then finish with eggs on top.",
    absorb: 1.8, raw: false, cuisines: [], meals: ["breakfast", "lunch", "dinner"]
  },
  {
    id: "scramble", name: "Soft scramble", emoji: "🍳",
    blurb: "Two minutes and a hot pan. Eggs plus whatever soft veg, herb, or cheese heel needs a home.",
    needs: { egg: 2, veg: 1, dairy: 0.5, aromatic: 0.5 }, key: "egg",
    heat: "Low and slow, stirring constantly, and pull it off the heat while it's still glossy — it finishes on the plate.",
    absorb: 1.4, raw: false, cuisines: [], meals: ["breakfast"]
  },
  {
    id: "savoryoats", name: "Savory oats", emoji: "🥣",
    blurb: "Porridge's savory cousin — creamy oats under a jammy egg, herbs, and something crunchy.",
    needs: { starch: 2, egg: 0.5, veg: 0.5 }, key: "starch",
    heat: "Simmer the oats in well-salted water or stock until creamy, then top with a soft egg and a drizzle of fat.",
    absorb: 1.3, raw: false, cuisines: [], meals: ["breakfast"]
  },
  {
    id: "yogurtbowl", name: "Yogurt bowl", emoji: "🥛",
    blurb: "Tangy yogurt as the canvas — fruit, a drizzle of honey, nuts or seeds for crunch. No cooking required.",
    needs: { dairy: 2 }, key: "dairy",
    heat: "No heat — just layer it up. Toast the nuts or seeds first if you like, for extra depth.",
    absorb: 1.1, raw: true, cuisines: [], meals: ["breakfast"]
  },
  {
    id: "toast", name: "Loaded toast", emoji: "🍞",
    blurb: "Good bread, toasted deep, piled with a fat and a protein. Breakfast, or a fast lunch.",
    needs: { starch: 1.5, fat: 1, protein: 0.5 }, key: "starch",
    heat: "Toast the bread until it's properly golden and crisp — that's the whole texture. Warm the topping, then finish with salt and a squeeze of acid.",
    absorb: 1.2, raw: false, cuisines: [], meals: ["breakfast", "lunch"]
  }
];

/* One-line lessons — the "why," true to the four elements. */
HAF.lessons = {
  salt: "Salt isn't just seasoning — it's the volume knob for every other flavor. Season in layers as you cook, not just at the table, and taste as you go.",
  fat: "Fat carries flavor and gives food its richness and crisp. Without it, dishes taste thin and flat no matter how much you season.",
  acid: "Acid is the balancer. A squeeze of something sour at the end cuts through richness and makes a dish taste bright and finished instead of heavy.",
  heat: "Heat decides texture — a hard sear browns and crisps, a gentle simmer keeps things tender. Match the heat to what you want the food to become."
};

/* Grouped quick-add — the most common fridge suspects, one tap each. */
HAF.quickAdd = [
  { group: "Going off soon", items: ["spinach", "lettuce", "herbs", "mushroom", "tomato", "berries", "avocado"] },
  { group: "Proteins", items: ["eggs", "chicken", "ground beef", "canned beans", "tofu", "canned tuna"] },
  { group: "Veg & aromatics", items: ["onion", "garlic", "carrot", "bell pepper", "broccoli", "zucchini", "scallion"] },
  { group: "Dairy", items: ["butter", "parmesan", "cheddar", "yogurt", "milk"] },
  { group: "Starch", items: ["rice", "cooked rice", "pasta", "bread", "tortilla", "potato"] },
  { group: "Pantry heroes", items: ["olive oil", "lemon", "garlic", "soy sauce", "vinegar", "canned tomatoes", "chili flakes"] }
];

/* Stock-your-pantry guide — assemble a kitchen by the four elements, shelf by shelf.
 * Keep one of each element on hand and you can balance almost anything you cook. */
HAF.pantryShelves = [
  {
    el: "salt", name: "Salt", tagline: "Seasoning & savory depth — the volume knob for every other flavor.",
    groups: [
      { label: "Everyday", items: ["kosher salt", "flaky sea salt", "black pepper"] },
      { label: "Savory boosters", items: ["soy sauce", "miso", "fish sauce", "parmesan", "anchovies", "capers", "olives", "stock"] }
    ]
  },
  {
    el: "fat", name: "Fat", tagline: "Richness, crispness, and the carrier that spreads flavor around.",
    groups: [
      { label: "Oils", items: ["olive oil", "a neutral oil", "toasted sesame oil"] },
      { label: "Rich & creamy", items: ["butter", "coconut milk", "tahini", "mayonnaise", "nuts", "a hard cheese"] }
    ]
  },
  {
    el: "acid", name: "Acid", tagline: "Brightness and balance — the thing that cuts through richness.",
    groups: [
      { label: "The vinegar shelf", items: ["red wine vinegar", "rice vinegar", "apple cider vinegar", "balsamic"] },
      { label: "Citrus & tang", items: ["lemons", "limes", "dijon mustard", "yogurt", "canned tomatoes", "pickles"] }
    ]
  },
  {
    el: "heat", name: "Heat", tagline: "Warmth and fire — build a chile shelf and dial the level to taste.",
    chile: [
      { level: "Mild", flames: 1, items: ["sweet paprika", "aleppo pepper"] },
      { level: "Medium", flames: 2, items: ["chili flakes", "jalapeño", "gochujang", "smoked paprika"] },
      { level: "Hot", flames: 3, items: ["cayenne", "hot sauce", "serrano", "thai chile"] }
    ],
    note: "In Salt, Fat, Acid, Heat, heat is really the cooking method — but a stocked chile-and-spice shelf lets you build warmth and depth whenever a dish needs a lift."
  }
];

/* The six tastes — the flavor-science reference (a "flavor lab" specimen set).
 * Salt / Fat / Acid overlap with the cooking engine; Sweet / Bitter / Umami round out
 * the full palette the tongue reads. Chemistry + role mirror the flavor-lab reference. */
HAF.tastes = [
  { key: "salt", name: "Salt", chem: "NaCl",           role: ["Enhances flavor", "Controls moisture"],  items: ["sea salt", "soy sauce", "miso", "parmesan", "anchovies", "olives"] },
  { key: "fat",  name: "Fat",  chem: "Triglycerides",  role: ["Adds richness", "Carries flavor"],       items: ["olive oil", "butter", "avocado", "cheese", "nuts", "cream"] },
  { key: "acid", name: "Acid", chem: "Organic acids",  role: ["Brightens flavor", "Balances taste"],    items: ["lemon", "vinegar", "yogurt", "tomato", "wine", "pickles"] },
  { key: "heat", name: "Heat", chem: "Thermal energy", role: ["Transforms texture", "Develops flavor"], items: ["a hard sear", "a gentle simmer", "a hot roast", "a slow braise", "a blistering pan"] }
];
