document.addEventListener("DOMContentLoaded", () => {

  const templates = document.querySelectorAll("template[load]");
  const fetches = [];

  templates.forEach((el) => {
    const url = el.getAttribute("load");

    const fetchPromise = fetch(url)
      .then((res) => res.text())
      .then((html) => {
        el.innerHTML = html;
        const clone = el.content.cloneNode(true);
        document.body.appendChild(clone);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", url, err);
      });

    fetches.push(fetchPromise);
  });

  Promise.all(fetches).then(() => {
    const scripts = [
      "js/main.js",
      "js/balance.js",
      "js/down-main.js",
      "js/buy-gift.js",
      "js/inventory.js",
      "js/crash-game.js",
      "js/nav-bar.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
    });
  });

});