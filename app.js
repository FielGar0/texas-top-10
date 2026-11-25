(function () {
  "use strict";

  const app = document.getElementById("app");
  const cities = window.CITIES || [];
  const UPDATED = "November 2026";

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const pad = (n) => String(n).padStart(2, "0");

  const appleMaps = (place, city) =>
    "https://maps.apple.com/?q=" + encodeURIComponent(`${place.name}, ${city.name}, TX`);
  const googleMaps = (place, city) =>
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${place.name}, ${city.name}, TX`);

  const searchIcon =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M6.5 1a5.5 5.5 0 0 1 4.38 8.83l3.65 3.64a.75.75 0 1 1-1.06 1.06l-3.64-3.65A5.5 5.5 0 1 1 6.5 1Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>';

  function setNav(key) {
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.dataset.nav === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // Fade sections in as they scroll into view.
  let observer;
  function reveal() {
    if (observer) observer.disconnect();
    const els = app.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => observer.observe(e));
  }

  function tile(city) {
    return `
      <a class="tile" href="#/city/${city.slug}">
        <span class="region">${esc(city.region)}</span>
        <h3>${esc(city.name)}</h3>
        <p>${esc(city.tagline)}</p>
        <div class="tile-foot">
          <span class="count">${city.places.length} places</span>
          <span class="more">See the list</span>
        </div>
      </a>`;
  }

  function renderHome() {
    document.title = "Texas Top 10";
    setNav("home");
    app.innerHTML = `
      <section class="hero">
        <span class="eyebrow">Texas Top 10</span>
        <h1 class="headline">Ten places.<br />Every city.</h1>
        <p class="subhead">A short list for each Texas city: the landmarks, museums, parks and tables we'd send a friend to first.</p>
        <div class="cta-row">
          <a class="more" href="#cities">Browse the cities</a>
          <a class="more" href="#/method">How we choose</a>
        </div>
      </section>

      <section class="section section-alt" id="cities">
        <div class="container-wide">
          <div class="section-head reveal">
            <h2 class="headline-md">Start with a city.</h2>
            <label class="searchfield">
              ${searchIcon}
              <input id="search" type="search" placeholder="Search cities and places" aria-label="Search cities and places" autocomplete="off" />
            </label>
          </div>
          <div class="tiles" id="tiles"></div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="reveal" style="text-align:center">
            <h2 class="headline-md">Short lists, on purpose.</h2>
            <p class="subhead" style="max-width:620px;margin:16px auto 0">Big cities have hundreds of things to do. We pick ten and explain why each one made it.</p>
          </div>
          <div class="principles reveal">
            <div><span class="num">01</span><h3>Ten, never more.</h3><p>A hard limit forces real choices. If something new earns a spot, something else comes off.</p></div>
            <div><span class="num">02</span><h3>Ranked, with reasons.</h3><p>Number one is where we'd go with only one afternoon. Every entry says why it's on the list.</p></div>
            <div><span class="num">03</span><h3>Ready to go.</h3><p>Each place links straight to directions, with a practical note when timing or tickets matter.</p></div>
          </div>
        </div>
      </section>`;

    const grid = document.getElementById("tiles");
    const search = document.getElementById("search");
    const draw = (q) => {
      const t = q.trim().toLowerCase();
      const list = !t
        ? cities
        : cities.filter(
            (c) => c.name.toLowerCase().includes(t) || c.places.some((p) => p.name.toLowerCase().includes(t))
          );
      grid.innerHTML = list.length
        ? list.map(tile).join("")
        : `<p class="empty">No city or place matches “${esc(q)}.”</p>`;
    };
    search.addEventListener("input", (e) => draw(e.target.value));
    draw("");
  }

  function renderCity(slug) {
    const i = cities.findIndex((c) => c.slug === slug);
    if (i < 0) return renderNotFound();
    const city = cities[i];
    const prev = cities[(i - 1 + cities.length) % cities.length];
    const next = cities[(i + 1) % cities.length];
    document.title = `${city.name}: Top 10 Places — Texas Top 10`;
    setNav("home");

    const cats = ["All", ...new Set(city.places.map((p) => p.category))];

    app.innerHTML = `
      <header class="city-head">
        <div class="container">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Texas</a><span>›</span>${esc(city.name)}</nav>
          <span class="eyebrow">${esc(city.region)}</span>
          <h1 class="headline">${esc(city.name)}</h1>
          <p class="intro">${esc(city.intro)}</p>
          <div class="city-meta"><span>${city.places.length} places</span><span>Updated ${UPDATED}</span></div>
        </div>
      </header>

      <div class="toolbar">
        <div class="container">
          <div class="segmented" role="group" aria-label="Filter by category">
            ${cats.map((c, k) => `<button data-cat="${esc(c)}" aria-pressed="${k === 0}">${esc(c)}</button>`).join("")}
          </div>
        </div>
      </div>

      <ol class="list" id="list"></ol>

      <section class="section section-alt">
        <div class="container pager">
          <a href="#/city/${prev.slug}"><span class="label">‹ Previous city</span><div class="name">${esc(prev.name)}</div></a>
          <a class="next" href="#/city/${next.slug}"><span class="label">Next city ›</span><div class="name">${esc(next.name)}</div></a>
        </div>
      </section>`;

    const list = document.getElementById("list");
    const draw = (cat) => {
      list.innerHTML = city.places
        .map((p, k) => ({ p, rank: k + 1 }))
        .filter(({ p }) => cat === "All" || p.category === cat)
        .map(
          ({ p, rank }) => `
          <li class="entry">
            <div class="n" aria-hidden="true">${pad(rank)}</div>
            <div>
              <div class="kicker">${esc(p.category)}${p.area ? ` <span class="area">· ${esc(p.area)}</span>` : ""}</div>
              <h2><span class="visually-hidden" style="position:absolute;left:-9999px">Number ${rank}: </span>${esc(p.name)}</h2>
              <p class="body">${esc(p.blurb)}</p>
              ${p.tip ? `<p class="tip"><strong>Good to know.</strong> ${esc(p.tip)}</p>` : ""}
              <div class="links">
                <a class="more" href="${appleMaps(p, city)}" target="_blank" rel="noopener">Directions</a>
                <a class="more" href="${googleMaps(p, city)}" target="_blank" rel="noopener">Google Maps</a>
              </div>
            </div>
          </li>`
        )
        .join("");
    };

    app.querySelectorAll(".segmented button").forEach((b) =>
      b.addEventListener("click", () => {
        app.querySelectorAll(".segmented button").forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        draw(b.dataset.cat);
      })
    );
    draw("All");
  }

  function renderMethod() {
    document.title = "How We Choose — Texas Top 10";
    setNav("method");
    app.innerHTML = `
      <article class="article">
        <span class="eyebrow">How we choose</span>
        <h1 class="headline-md">Ten places, and the reasons for each.</h1>
        <p>Every list starts long. We gather the places locals recommend, the ones that define a city's history, and the ones visitors ask about most. Then we cut until ten are left.</p>
        <h2>What earns a spot</h2>
        <p>A place has to be worth planning a day around, open to the public, and different from everything else on the list. Ten museums would be a museum list, not a city list, so each city gets a mix of history, outdoors, food and neighborhoods.</p>
        <h2>How the ranking works</h2>
        <p>Number one is where we'd send someone with a single afternoon. After that, the order reflects how much a place says about the city and how easy it is to enjoy on a first visit.</p>
        <h2>Keeping it current</h2>
        <p>Each city page shows when it was last updated. Places close, move and change hours, so confirm details before you go. If something on a list has changed, we want to hear about it.</p>
      </article>`;
  }

  function renderAbout() {
    document.title = "About — Texas Top 10";
    setNav("about");
    app.innerHTML = `
      <article class="article">
        <span class="eyebrow">About</span>
        <h1 class="headline-md">An independent guide to Texas cities.</h1>
        <p>Texas has more than a dozen cities with enough to fill a long weekend, and each one deserves a starting point that respects your time. That's what this is: one page per city, ten places, no filler.</p>
        <p>We aren't paid to include anyone. Nothing here is sponsored, and no place can buy its way onto a list.</p>
        <p>New cities are added as they're finished. If yours isn't here yet, it's coming.</p>
      </article>`;
  }

  function renderNotFound() {
    document.title = "Not Found — Texas Top 10";
    setNav("");
    app.innerHTML = `
      <article class="article" style="text-align:center">
        <h1 class="headline-md">That page isn't here.</h1>
        <p><a class="more" href="#/">See all cities</a></p>
      </article>`;
  }

  function route() {
    const hash = location.hash;
    // In-page anchor on the home page (e.g. #cities): keep home rendered and scroll.
    if (hash && !hash.startsWith("#/")) {
      if (!document.getElementById("tiles")) renderHome();
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      return;
    }
    const [section, slug] = hash.replace(/^#\/?/, "").split("/");
    if (section === "city" && slug) renderCity(slug);
    else if (section === "method") renderMethod();
    else if (section === "about") renderAbout();
    else renderHome();
    window.scrollTo({ top: 0, behavior: "instant" });
    app.focus({ preventScroll: true });
    reveal();
  }

  window.addEventListener("hashchange", route);
  route();
})();
