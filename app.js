(function () {
  "use strict";

  const app = document.getElementById("app");
  const cities = window.CITIES || [];
  const UPDATED = "November 2026";
  const totalPlaces = cities.reduce((n, c) => n + c.places.length, 0);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const go = (slug) => (location.hash = `#/city/${slug}`);

  const appleMaps = (place, city) =>
    "https://maps.apple.com/?q=" + encodeURIComponent(`${place.name}, ${city.name}, TX`);
  const googleMaps = (place, city) =>
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${place.name}, ${city.name}, TX`);

  /* ---------- Photos (Wikimedia Commons, see data/photos.js) ---------- */

  const PHOTOS = window.PHOTOS || {};
  const cityPhoto = (city) => (PHOTOS[city.slug] || {}).city || null;
  const placePhoto = (city, place) => ((PHOTOS[city.slug] || {}).places || {})[place.name] || null;
  // Wikimedia serves standard thumbnail widths; swap the 960px URL for a smaller one where it fits.
  const sized = (photo, w) => photo.src.replace(/\/960px-/, `/${w}px-`);

  function img(photo, alt, w, cls) {
    if (!photo) return `<div class="ph-empty ${cls || ""}" aria-hidden="true"></div>`;
    return `<img class="${cls || ""}" src="${esc(sized(photo, w))}" alt="${esc(alt)}" width="${photo.w}" height="${photo.h}" loading="lazy" decoding="async" onload="this.classList.add('loaded')" />`;
  }

  function credit(photo) {
    if (!photo) return "";
    return `<span class="credit">Photo: ${esc(photo.credit)} · <a href="${esc(photo.page)}" target="_blank" rel="noopener">${esc(photo.license)}</a></span>`;
  }

  /* ---------- Details, regions, place sheet ---------- */

  const DETAILS = window.DETAILS || {};
  const detail = (city, place) => {
    const d = (DETAILS[city.slug] || {})[place.name] || [];
    return { more: d[0] || "", time: d[1] || "" };
  };
  const GROUPS = ["Central Texas", "North Texas", "Gulf Coast", "East Texas", "West Texas", "Panhandle & Plains"];
  const citiesIn = (g) => cities.filter((c) => c.group === g);
  const allPlaces = cities.flatMap((c) => c.places.map((p, i) => ({ city: c, place: p, rank: i + 1 })));
  const findPlace = (slug, rank) => {
    const c = cities.find((x) => x.slug === slug);
    return c ? { city: c, place: c.places[rank - 1], rank } : null;
  };

  // Place detail sheet (native <dialog>): opened from the map preview, search results and Explore.
  const sheet = document.getElementById("sheet");
  function openPlace(slug, rank) {
    const hit = findPlace(slug, rank);
    if (!hit || !hit.place) return;
    const { city, place } = hit;
    const ph = placePhoto(city, place);
    const d = detail(city, place);
    sheet.innerHTML = `
      <div class="sheet-inner">
        <button class="sheet-close" aria-label="Close">×</button>
        <div class="sheet-media">${img(ph, place.name, 960, "sheet-img")}</div>
        <div class="sheet-body">
          <div class="kicker">${esc(place.category)} <span class="area">· ${esc(place.area)}</span></div>
          <h2 class="sheet-title">${esc(place.name)}</h2>
          <p class="sheet-city">No. ${rank} in <a href="#/city/${city.slug}">${esc(city.name)}</a></p>
          <p class="body">${esc(place.blurb)}</p>
          ${d.more ? `<p class="body more-text">${esc(d.more)}</p>` : ""}
          ${d.time ? `<p class="allow"><strong>Allow</strong> ${esc(d.time)}</p>` : ""}
          ${place.tip ? `<p class="tip"><strong>Good to know.</strong> ${esc(place.tip)}</p>` : ""}
          <div class="links">
            <a class="more" href="${appleMaps(place, city)}" target="_blank" rel="noopener">Directions</a>
            <a class="more" href="#/city/${city.slug}">All 10 in ${esc(city.name)}</a>
          </div>
          ${credit(ph)}
        </div>
      </div>`;
    sheet.querySelector(".sheet-close").addEventListener("click", () => sheet.close());
    sheet.querySelectorAll('a[href^="#/"]').forEach((a) => a.addEventListener("click", () => sheet.close()));
    if (!sheet.open) sheet.showModal();
  }
  // Close when clicking the backdrop.
  sheet.addEventListener("click", (e) => {
    if (e.target === sheet) sheet.close();
  });
  // Any element with data-open="slug:rank" opens that place.
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-open]");
    if (!el) return;
    e.preventDefault();
    const [slug, rank] = el.dataset.open.split(":");
    openPlace(slug, Number(rank));
  });

  function placeCard({ city, place, rank }) {
    return `
      <a class="pcard" href="#/city/${city.slug}" data-open="${city.slug}:${rank}">
        <div class="pcard-media">${img(placePhoto(city, place), "", 500, "pcard-img")}</div>
        <div class="pcard-body">
          <div class="kicker">${esc(place.category)} <span class="area">· ${esc(city.name)}</span></div>
          <h3>${esc(place.name)}</h3>
          <p>${esc(place.blurb)}</p>
        </div>
      </a>`;
  }

  // Cities menu in the global nav, grouped by region.
  function buildCityMenu() {
    const btn = document.getElementById("cities-btn");
    const menu = document.getElementById("citymenu");
    menu.innerHTML = `
      <div class="citymenu-inner">
        ${GROUPS.map(
          (g) => `
          <div class="citymenu-col">
            <h3>${esc(g)}</h3>
            ${citiesIn(g).map((c) => `<a href="#/city/${c.slug}">${esc(c.name)}</a>`).join("")}
          </div>`
        ).join("")}
        <div class="citymenu-col citymenu-extra">
          <h3>Browse</h3>
          <a href="#/">Texas map</a>
          <a href="#/explore">All ${allPlaces.length} places</a>
        </div>
      </div>`;
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    };
    btn.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    menu.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });
    window.addEventListener("hashchange", () => setOpen(false));
  }

  const searchIcon =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M6.5 1a5.5 5.5 0 0 1 4.38 8.83l3.65 3.64a.75.75 0 1 1-1.06 1.06l-3.64-3.65A5.5 5.5 0 1 1 6.5 1Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>';

  function setNav(key) {
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.dataset.nav === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // Fade elements in as they scroll into view.
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
      { rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((e) => observer.observe(e));
  }

  /* ---------- Home ---------- */

  function panelIdle() {
    return `
      <div class="panel-content idle">
        <span class="eyebrow">Explore</span>
        <h2 class="panel-title">Pick a city.</h2>
        <p class="panel-sub">${
          window.matchMedia("(hover: none)").matches
            ? "Tap a city on the map to zoom in and see what's on its list. Tap again to open the full ten."
            : "Hover over a city on the map to zoom in and see what's on its list. Click to open the full ten."
        }</p>
        <div class="stats">
          <div><span class="stat">${cities.length}</span><span class="stat-label">cities</span></div>
          <div><span class="stat">${totalPlaces}</span><span class="stat-label">places</span></div>
          <div><span class="stat">10</span><span class="stat-label">per city</span></div>
        </div>
      </div>`;
  }

  function panelCity(city) {
    return `
      <div class="panel-content" data-slug="${city.slug}">
        <span class="eyebrow">${esc(city.region)}</span>
        <h2 class="panel-title">${esc(city.name)}</h2>
        <p class="panel-sub">${esc(city.tagline)}</p>
        <ol class="peek">
          ${city.places
            .slice(0, 5)
            .map(
              (p, i) => `
            <li style="animation-delay:${120 + i * 55}ms" data-open="${city.slug}:${i + 1}" tabindex="0" role="button">
              <span class="peek-n">${pad(i + 1)}</span>
              ${img(placePhoto(city, p), "", 330, "peek-img")}
              <span class="peek-text"><strong>${esc(p.name)}</strong><span>${esc(p.category)} · ${esc(p.area)}</span></span>
            </li>`
            )
            .join("")}
        </ol>
        <a class="button" href="#/city/${city.slug}" style="animation-delay:480ms">See all ${city.places.length} in ${esc(city.name)}</a>
      </div>`;
  }

  function tile(city) {
    return `
      <a class="tile" href="#/city/${city.slug}">
        <div class="tile-media">${img(cityPhoto(city), "", 500, "tile-img")}</div>
        <span class="region">${esc(city.region)}</span>
        <h3>${esc(city.name)}</h3>
        <div class="tile-swap">
          <p class="tile-tagline">${esc(city.tagline)}</p>
          <ol class="tile-peek">
            ${city.places.slice(0, 3).map((p, i) => `<li style="transition-delay:${60 + i * 50}ms"><span>${pad(i + 1)}</span>${esc(p.name)}</li>`).join("")}
          </ol>
        </div>
        <div class="tile-foot">
          <span class="count">${city.places.length} places</span>
          <span class="more">See the list</span>
        </div>
      </a>`;
  }

  // Home page view: "map" (interactive Texas map) or "list" (city directory by region).
  let homeView = (() => {
    try {
      return localStorage.getItem("tt10-view") === "list" ? "list" : "map";
    } catch (e) {
      return "map";
    }
  })();

  function renderHome() {
    document.title = "Texas Top 10";
    setNav("home");
    app.innerHTML = `
      <section class="stage">
        <div class="stage-head">
          <span class="eyebrow">Texas Top 10</span>
          <h1 class="headline">Ten places.<br />Every city.</h1>
          <div class="view-switch">
            <div class="segmented" role="group" aria-label="Choose how to browse" id="view-seg">
              <span class="seg-thumb" aria-hidden="true"></span>
              <button data-view="map" aria-pressed="${homeView === "map"}">Map</button>
              <button data-view="list" aria-pressed="${homeView === "list"}">List</button>
            </div>
          </div>
        </div>

        <div class="view view-map" id="view-map" ${homeView === "map" ? "" : "hidden"}>
          <div class="stage-grid">
            <div class="map-wrap" id="map"></div>
            <aside class="panel" id="panel" aria-live="polite"></aside>
          </div>
          <div class="city-strip" role="list" aria-label="Cities">
            ${cities.map((c) => `<a role="listitem" class="city-chip" href="#/city/${c.slug}" data-slug="${c.slug}">${esc(c.name)}</a>`).join("")}
          </div>
        </div>

        <div class="view view-list" id="view-list" ${homeView === "list" ? "" : "hidden"}>
          ${GROUPS.map(
            (g) => `
            <section class="dir-group">
              <h2 class="dir-title">${esc(g)}</h2>
              <ul class="dir-list">
                ${citiesIn(g)
                  .map(
                    (c) => `
                  <li><a class="dir-row" href="#/city/${c.slug}">
                    <span class="dir-thumb">${img(cityPhoto(c), "", 330, "dir-img")}</span>
                    <span class="dir-text"><strong>${esc(c.name)}</strong><span>${esc(c.tagline)}</span></span>
                    <span class="dir-chev" aria-hidden="true">›</span>
                  </a></li>`
                  )
                  .join("")}
              </ul>
            </section>`
          ).join("")}
          <p class="dir-foot"><a class="more" href="#/explore">Or browse all ${allPlaces.length} places</a></p>
        </div>
      </section>

      <section class="section section-alt" id="cities">
        <div class="container-wide">
          <div class="section-head reveal">
            <h2 class="headline-md">Every list, at a glance.</h2>
            <label class="searchfield">
              ${searchIcon}
              <input id="search" type="search" placeholder="Search cities and places" aria-label="Search cities and places" autocomplete="off" />
            </label>
          </div>
          <div class="region-bar">
            <div class="segmented" role="group" aria-label="Filter by region" id="region-seg">
              <span class="seg-thumb" aria-hidden="true"></span>
              ${["All regions", ...GROUPS].map((g, k) => `<button data-group="${esc(g)}" aria-pressed="${k === 0}">${esc(g)}</button>`).join("")}
            </div>
          </div>
          <div id="place-hits"></div>
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

    // Map / List switch. The choice is remembered for the next visit.
    segmented(document.getElementById("view-seg"), (b) => {
      homeView = b.dataset.view;
      try {
        localStorage.setItem("tt10-view", homeView);
      } catch (e) {}
      ["map", "list"].forEach((v) => {
        const el = document.getElementById("view-" + v);
        el.hidden = v !== homeView;
        if (v === homeView) {
          el.classList.remove("view-enter");
          void el.offsetWidth;
          el.classList.add("view-enter");
        }
      });
    });

    // Map + preview panel
    const panel = document.getElementById("panel");
    const stage = app.querySelector(".stage-grid");
    const map = TexasMap.create(document.getElementById("map"), { cities, interactive: true, id: "home" });
    let shown = null;
    let leaveTimer;

    const show = (slug) => {
      clearTimeout(leaveTimer);
      if (shown === slug) return;
      shown = slug;
      const city = cities.find((c) => c.slug === slug);
      map.focus(slug);
      panel.innerHTML = city ? panelCity(city) : panelIdle();
      app.querySelectorAll(".city-chip").forEach((ch) => ch.classList.toggle("active", ch.dataset.slug === slug));
    };
    const clear = () => {
      shown = null;
      map.reset();
      panel.innerHTML = panelIdle();
      app.querySelectorAll(".city-chip").forEach((ch) => ch.classList.remove("active"));
    };

    map.on("hover", show);
    map.on("select", go);
    // Leaving the map area zooms back out, after a short pause so the panel can be reached.
    // Mouse only: on touch screens the preview stays until another city is tapped.
    const leave = (e) => {
      if (e.pointerType !== "mouse") return;
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(clear, 500);
    };
    stage.addEventListener("pointerleave", leave);
    stage.addEventListener("pointerenter", () => clearTimeout(leaveTimer));
    app.querySelectorAll(".city-chip").forEach((ch) => {
      ch.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && show(ch.dataset.slug));
      ch.addEventListener("focus", () => ch.matches(":focus-visible") && show(ch.dataset.slug));
    });
    app.querySelector(".city-strip").addEventListener("pointerleave", leave);
    panel.innerHTML = panelIdle();

    // Tiles: region filter + search (search also lists matching places)
    const grid = document.getElementById("tiles");
    const hits = document.getElementById("place-hits");
    const search = document.getElementById("search");
    let group = "All regions";
    const draw = () => {
      const q = search.value;
      const t = q.trim().toLowerCase();
      const inGroup = (c) => group === "All regions" || c.group === group;
      const list = cities.filter(
        (c) => inGroup(c) && (!t || c.name.toLowerCase().includes(t) || c.places.some((p) => p.name.toLowerCase().includes(t)))
      );
      const places = t
        ? allPlaces.filter(
            ({ city, place }) =>
              inGroup(city) && (place.name.toLowerCase().includes(t) || place.category.toLowerCase().includes(t))
          )
        : [];
      hits.innerHTML = places.length
        ? `<h3 class="hits-title">${places.length} place${places.length === 1 ? "" : "s"}</h3>
           <div class="pgrid">${places.slice(0, 8).map(placeCard).join("")}</div>
           ${places.length > 8 ? `<p class="hits-more"><a class="more" href="#/explore?q=${encodeURIComponent(q.trim())}">See all ${places.length}</a></p>` : ""}
           <h3 class="hits-title">Cities</h3>`
        : "";
      grid.innerHTML = list.length
        ? list.map(tile).join("")
        : places.length
        ? ""
        : `<p class="empty">No city or place matches “${esc(q)}.”</p>`;
    };
    search.addEventListener("input", draw);
    segmented(document.getElementById("region-seg"), (btn) => {
      group = btn.dataset.group;
      draw();
    });
    draw();
  }

  // Wire up a segmented control with a sliding thumb. onPick(button) runs on each choice.
  function segmented(seg, onPick) {
    const thumb = seg.querySelector(".seg-thumb");
    const moveThumb = (btn) => {
      thumb.style.width = btn.offsetWidth + "px";
      thumb.style.transform = `translateX(${btn.offsetLeft - 3}px)`;
    };
    seg.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => {
        seg.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        moveThumb(b);
        b.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
        onPick(b);
      })
    );
    requestAnimationFrame(() => moveThumb(seg.querySelector('button[aria-pressed="true"]')));
  }

  /* ---------- City ---------- */

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
        <div class="container city-head-grid">
          <div>
            <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Texas</a><span>›</span>${esc(city.name)}</nav>
            <span class="eyebrow">${esc(city.region)}</span>
            <h1 class="headline">${esc(city.name)}</h1>
            <p class="intro">${esc(city.intro)}</p>
            <div class="city-meta"><span>${city.places.length} places</span><span>Updated ${UPDATED}</span></div>
          </div>
          <div class="mini-map" id="mini-map" aria-hidden="true"></div>
        </div>
      </header>

      ${
        cityPhoto(city)
          ? `<figure class="city-hero-photo container-wide">
              <div class="hero-frame">${img(cityPhoto(city), city.name, 1280, "hero-img")}</div>
              <figcaption>${credit(cityPhoto(city))}</figcaption>
            </figure>`
          : ""
      }

      <nav class="container-wide toc" aria-label="In this list">
        <h2 class="toc-title">In this list</h2>
        <ol class="toc-list">
          ${city.places.map((p, k) => `<li><button data-jump="${k + 1}"><span>${pad(k + 1)}</span>${esc(p.name)}</button></li>`).join("")}
        </ol>
      </nav>

      <div class="toolbar">
        <div class="container">
          <div class="segmented" role="group" aria-label="Filter by category">
            <span class="seg-thumb" aria-hidden="true"></span>
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

    // Mini map starts on the whole state, then glides in to the city.
    const mini = TexasMap.create(document.getElementById("mini-map"), { cities, interactive: false, id: "mini" });
    setTimeout(() => mini.focus(city.slug, 3.2), 250);

    const list = document.getElementById("list");
    const draw = (cat) => {
      list.innerHTML = city.places
        .map((p, k) => ({ p, rank: k + 1 }))
        .filter(({ p }) => cat === "All" || p.category === cat)
        .map(
          ({ p, rank }, k) => `
          <li class="entry" id="place-${rank}" style="animation-delay:${Math.min(k, 6) * 60}ms">
            <div class="n" aria-hidden="true">${pad(rank)}</div>
            <div>
              <div class="kicker">${esc(p.category)}${p.area ? ` <span class="area">· ${esc(p.area)}</span>` : ""}</div>
              <h2><span class="sr">Number ${rank}: </span>${esc(p.name)}</h2>
              <p class="body">${esc(p.blurb)}</p>
              ${detail(city, p).more ? `<p class="body more-text">${esc(detail(city, p).more)}</p>` : ""}
              ${detail(city, p).time ? `<p class="allow"><strong>Allow</strong> ${esc(detail(city, p).time)}</p>` : ""}
              ${p.tip ? `<p class="tip"><strong>Good to know.</strong> ${esc(p.tip)}</p>` : ""}
              <div class="links">
                <a class="more" href="${appleMaps(p, city)}" target="_blank" rel="noopener">Directions</a>
                <a class="more" href="${googleMaps(p, city)}" target="_blank" rel="noopener">Google Maps</a>
              </div>
            </div>
            <figure class="entry-photo">
              <div class="entry-frame">${img(placePhoto(city, p), p.name, 960, "entry-img")}</div>
              <figcaption>${credit(placePhoto(city, p))}</figcaption>
            </figure>
          </li>`
        )
        .join("");
    };

    const seg = app.querySelector(".toolbar .segmented");
    segmented(seg, (b) => draw(b.dataset.cat));
    draw("All");

    // "In this list" jumps to an entry (resetting the filter so it's visible).
    app.querySelectorAll("[data-jump]").forEach((b) =>
      b.addEventListener("click", () => {
        if (!document.getElementById("place-" + b.dataset.jump)) seg.querySelector("button").click();
        const el = document.getElementById("place-" + b.dataset.jump);
        const y = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: y, behavior: "smooth" });
      })
    );
  }

  /* ---------- Explore: every place, filterable ---------- */

  function renderExplore(params) {
    document.title = "Explore All Places — Texas Top 10";
    setNav("explore");
    const cats = ["All", ...new Set(allPlaces.map((x) => x.place.category))].sort((a, b) =>
      a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
    );
    app.innerHTML = `
      <header class="explore-head">
        <div class="container-wide">
          <span class="eyebrow">Explore</span>
          <h1 class="headline-md">Every place, in one list.</h1>
          <p class="subhead">All ${allPlaces.length} places across ${cities.length} Texas cities. Filter by region, city or kind of place, or search by name.</p>
          <div class="filters">
            <label class="searchfield">
              ${searchIcon}
              <input id="xsearch" type="search" placeholder="Search places" aria-label="Search places" autocomplete="off" />
            </label>
            <label class="select"><span class="sr">Region</span>
              <select id="xregion"><option value="">All regions</option>${GROUPS.map((g) => `<option>${esc(g)}</option>`).join("")}</select>
            </label>
            <label class="select"><span class="sr">City</span>
              <select id="xcity"><option value="">All cities</option>${cities
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((c) => `<option value="${c.slug}">${esc(c.name)}</option>`)
                .join("")}</select>
            </label>
          </div>
          <div class="chips" role="group" aria-label="Kind of place">
            ${cats.map((c, k) => `<button class="chip-btn" data-cat="${esc(c)}" aria-pressed="${k === 0}">${esc(c)}</button>`).join("")}
          </div>
          <p class="result-count" id="xcount" aria-live="polite"></p>
        </div>
      </header>
      <section class="container-wide explore-grid">
        <div class="pgrid" id="xgrid"></div>
      </section>`;

    const q = document.getElementById("xsearch");
    const region = document.getElementById("xregion");
    const cityS = document.getElementById("xcity");
    let cat = "All";
    q.value = params.get("q") || "";
    const draw = () => {
      const t = q.value.trim().toLowerCase();
      const list = allPlaces.filter(
        ({ city, place }) =>
          (!region.value || city.group === region.value) &&
          (!cityS.value || city.slug === cityS.value) &&
          (cat === "All" || place.category === cat) &&
          (!t || place.name.toLowerCase().includes(t) || city.name.toLowerCase().includes(t) || place.blurb.toLowerCase().includes(t))
      );
      document.getElementById("xcount").textContent = `${list.length} place${list.length === 1 ? "" : "s"}`;
      document.getElementById("xgrid").innerHTML = list.length
        ? list.map(placeCard).join("")
        : `<p class="empty">Nothing matches those filters.</p>`;
    };
    q.addEventListener("input", draw);
    region.addEventListener("change", () => {
      // Keep the city choice consistent with the region.
      const c = cities.find((x) => x.slug === cityS.value);
      if (c && region.value && c.group !== region.value) cityS.value = "";
      draw();
    });
    cityS.addEventListener("change", draw);
    app.querySelectorAll(".chip-btn").forEach((b) =>
      b.addEventListener("click", () => {
        app.querySelectorAll(".chip-btn").forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        cat = b.dataset.cat;
        draw();
      })
    );
    draw();
  }

  /* ---------- Text pages ---------- */

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

  function renderCredits() {
    document.title = "Photo Credits — Texas Top 10";
    setNav("");
    const rows = cities
      .map((c) => {
        const items = [
          cityPhoto(c) ? { label: c.name, photo: cityPhoto(c) } : null,
          ...c.places.map((p) => (placePhoto(c, p) ? { label: p.name, photo: placePhoto(c, p) } : null)),
        ].filter(Boolean);
        if (!items.length) return "";
        return `
          <h2>${esc(c.name)}</h2>
          <ul class="credit-list">
            ${items
              .map(
                ({ label, photo }) => `
              <li><span>${esc(label)}</span><span>${esc(photo.credit)} · <a href="${esc(photo.page)}" target="_blank" rel="noopener">${esc(photo.license)}</a></span></li>`
              )
              .join("")}
          </ul>`;
      })
      .join("");
    app.innerHTML = `
      <article class="article article-wide">
        <span class="eyebrow">Photo credits</span>
        <h1 class="headline-md">Thank you to the photographers.</h1>
        <p>Every photo on this site comes from Wikimedia Commons and is used under the license shown. Follow a license link to see the original image, its author and full terms.</p>
        ${rows}
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

  /* ---------- Router ---------- */

  function route() {
    const hash = location.hash;
    // In-page anchor on the home page (e.g. #cities): keep home rendered and scroll.
    if (hash && !hash.startsWith("#/")) {
      if (!document.getElementById("tiles")) renderHome();
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      return;
    }
    if (sheet.open) sheet.close();
    const [path, query] = hash.replace(/^#\/?/, "").split("?");
    const [section, slug] = path.split("/");
    if (section === "city" && slug) renderCity(slug);
    else if (section === "explore") renderExplore(new URLSearchParams(query || ""));
    else if (section === "method") renderMethod();
    else if (section === "about") renderAbout();
    else if (section === "credits") renderCredits();
    else renderHome();

    // Page transition
    app.classList.remove("enter");
    void app.offsetWidth;
    app.classList.add("enter");

    window.scrollTo({ top: 0, behavior: "instant" });
    app.focus({ preventScroll: true });
    reveal();
  }

  buildCityMenu();
  window.addEventListener("hashchange", route);
  route();
})();
