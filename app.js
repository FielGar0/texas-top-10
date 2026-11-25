(function () {
  "use strict";

  const app = document.getElementById("app");
  const cities = window.CITIES || [];

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const gradient = (city) =>
    `linear-gradient(135deg, ${city.colors[0]} 0%, ${city.colors[1]} 100%)`;

  const mapUrl = (place, city) =>
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${place.name}, ${city.name}, TX`);

  function cityCard(city) {
    return `
      <a class="city-card" href="#/city/${city.slug}" style="background:${gradient(city)}">
        <span class="badge">Top ${city.places.length}</span>
        <h3>${esc(city.name)}</h3>
        <p>${esc(city.tagline)}</p>
      </a>`;
  }

  function renderHome() {
    document.title = "Texas Top 10 — The best places in every Texas city";
    app.innerHTML = `
      <section class="hero">
        <h1>The Top 10 in Every Texas City</h1>
        <p>Hand-picked lists of the places worth the drive, from the Gulf Coast to the Chihuahuan Desert.</p>
        <input class="search" id="search" type="search" placeholder="Search a city or a place…" aria-label="Search cities and places" />
      </section>
      <section>
        <div class="section-title">
          <h2>Pick a city</h2>
          <span id="count"></span>
        </div>
        <div class="city-grid" id="grid"></div>
      </section>`;

    const grid = document.getElementById("grid");
    const count = document.getElementById("count");
    const search = document.getElementById("search");

    const draw = (q) => {
      const term = q.trim().toLowerCase();
      const list = !term
        ? cities
        : cities.filter(
            (c) =>
              c.name.toLowerCase().includes(term) ||
              c.places.some((p) => p.name.toLowerCase().includes(term))
          );
      grid.innerHTML = list.length
        ? list.map(cityCard).join("")
        : `<p class="empty">No cities or places match “${esc(q)}” yet.</p>`;
      count.textContent = `${list.length} of ${cities.length} cities`;
    };

    search.addEventListener("input", (e) => draw(e.target.value));
    draw("");
  }

  function renderCity(slug) {
    const city = cities.find((c) => c.slug === slug);
    if (!city) return renderNotFound();
    document.title = `Top 10 in ${city.name}, Texas — Texas Top 10`;

    const categories = ["All", ...new Set(city.places.map((p) => p.category))];

    app.innerHTML = `
      <section class="city-hero" style="background:${gradient(city)}">
        <div class="inner">
          <a class="back" href="#/">← All cities</a>
          <h1>Top 10 in ${esc(city.name)}</h1>
          <p class="tagline">${esc(city.tagline)}</p>
          <p class="region">${esc(city.region)}</p>
        </div>
      </section>
      <div class="filters" role="group" aria-label="Filter by category">
        ${categories
          .map((c, i) => `<button class="chip" data-cat="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`)
          .join("")}
      </div>
      <ol class="top-list" id="list"></ol>`;

    const list = document.getElementById("list");
    const draw = (cat) => {
      list.innerHTML = city.places
        .map((p, i) => ({ p, rank: i + 1 }))
        .filter(({ p }) => cat === "All" || p.category === cat)
        .map(
          ({ p, rank }) => `
          <li class="place">
            <div class="rank" aria-label="Number ${rank}">${rank}</div>
            <div>
              <h3>${esc(p.name)}</h3>
              <div class="meta">
                <span class="tag">${esc(p.category)}</span>
                ${p.area ? `<span>${esc(p.area)}</span>` : ""}
              </div>
              <p>${esc(p.blurb)}</p>
              <a class="map-link" href="${mapUrl(p, city)}" target="_blank" rel="noopener">View on map →</a>
            </div>
          </li>`
        )
        .join("");
    };

    app.querySelectorAll(".chip").forEach((btn) =>
      btn.addEventListener("click", () => {
        app.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        draw(btn.dataset.cat);
      })
    );
    draw("All");
  }

  function renderAbout() {
    document.title = "About — Texas Top 10";
    app.innerHTML = `
      <article class="prose">
        <h1>About Texas Top 10</h1>
        <p>Texas is too big to see in one trip, so this site boils each city down to ten places worth your time: landmarks, museums, parks, food and the spots locals send their friends to.</p>
        <p>Each list is ranked, and you can filter by category. Every entry links to a map so you can plan the route.</p>
        <p>New cities are added as they're researched. Hours, prices and availability change, so check with each place before you go.</p>
      </article>`;
  }

  function renderNotFound() {
    document.title = "Not found — Texas Top 10";
    app.innerHTML = `
      <article class="prose">
        <h1>That city isn't on the map yet</h1>
        <p><a href="#/">Back to all cities</a></p>
      </article>`;
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    const [section, slug] = hash.split("/");
    if (section === "city" && slug) renderCity(slug);
    else if (section === "about") renderAbout();
    else renderHome();
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", route);
  route();
})();
