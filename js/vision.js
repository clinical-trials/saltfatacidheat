/* Fuchsia — fridge-photo reader.
 * Browser-direct Claude vision: one photo -> a list of ingredients that feeds the
 * same editable chip list as manual entry. The user's Anthropic key is stored only
 * in their browser and sent only to Anthropic. No backend; still deploys to Pages.
 */
window.HAF = window.HAF || {};
(function () {
  var HAF = window.HAF;
  var KEY_STORE = "fuchsia.anthropic_key";
  // Default per Anthropic guidance. For lower cost per photo, switch to
  // "claude-haiku-4-5" (cheapest, great for this) or "claude-sonnet-5".
  var MODEL = "claude-opus-5";
  var ENDPOINT = "https://api.anthropic.com/v1/messages";

  HAF.getKey = function () { try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; } };
  HAF.setKey = function (k) {
    try { if (k) localStorage.setItem(KEY_STORE, k); else localStorage.removeItem(KEY_STORE); } catch (e) {}
  };

  // Downscale a photo to a base64 JPEG (max edge 1024px) — keeps payload and token cost small.
  HAF.fileToImage = function (file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var max = 1024;
          var scale = Math.min(1, max / Math.max(img.width, img.height));
          var w = Math.round(img.width * scale), h = Math.round(img.height * scale);
          var canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          var dataUrl = canvas.toDataURL("image/jpeg", 0.82);
          resolve({ dataUrl: dataUrl, base64: dataUrl.split(",")[1], mediaType: "image/jpeg" });
        };
        img.onerror = function () { reject(new Error("decode")); };
        img.src = reader.result;
      };
      reader.onerror = function () { reject(new Error("read")); };
      reader.readAsDataURL(file);
    });
  };

  var PROMPT =
    "Look at this photo of a fridge, pantry, or groceries and identify the distinct food " +
    "ingredients you can actually see. For each, decide if it looks like it should be used " +
    "first (wilting, browning, very ripe, or an opened / partly-used item). Use simple common " +
    "names a home cook would use (\"spinach\", \"lemon\", \"eggs\", \"cheddar\"). Don't guess at " +
    "things you can't clearly see. Respond with ONLY a JSON object — no prose, no code fences: " +
    "{\"items\":[{\"name\":\"spinach\",\"useFirst\":true},{\"name\":\"eggs\",\"useFirst\":false}]}";

  // Returns a promise resolving to [{name, useFirst}]. Rejects with Error("no-key") if unconfigured.
  HAF.readFridge = function (base64, mediaType) {
    var key = HAF.getKey();
    if (!key) return Promise.reject(new Error("no-key"));
    return fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            { type: "text", text: PROMPT }
          ]
        }]
      })
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) { throw new Error("api:" + res.status + ":" + t); });
      }
      return res.json();
    }).then(function (data) {
      // Response content may include thinking blocks before the text block — scan for text.
      var text = (data.content || [])
        .filter(function (b) { return b.type === "text"; })
        .map(function (b) { return b.text; })
        .join("");
      return HAF.parseItems(text);
    });
  };

  // Tolerant JSON extraction — strips any stray prose or fences around the object.
  HAF.parseItems = function (text) {
    if (!text) return [];
    var start = text.indexOf("{"), end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end < start) return [];
    var obj;
    try { obj = JSON.parse(text.slice(start, end + 1)); } catch (e) { return []; }
    var items = (obj && obj.items) || [];
    return items.filter(function (i) { return i && i.name; }).map(function (i) {
      return { name: String(i.name).toLowerCase().trim(), useFirst: !!i.useFirst };
    });
  };
})();
