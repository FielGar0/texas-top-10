// Texas map: draws real boundaries (from data/geo.js) and city markers as SVG, and zooms smoothly onto a city.
(function () {
  "use strict";

  const GEO = window.TX_GEO;
  const P = GEO.projection;
  const COS = Math.cos((P.lat * Math.PI) / 180);
  const W = GEO.width, H = GEO.height;
  const project = (lon, lat) => [(lon - P.lon0) * P.K * COS, (P.lat1 - lat) * P.K];

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /**
   * Render a map into `container`.
   * opts.cities: city list. opts.interactive: markers respond to hover/click. opts.id: unique id for defs.
   * Returns { focus(slug, scale), reset(), on(event, fn), current }.
   */
  function create(container, opts) {
    const cities = opts.cities;
    const id = opts.id;
    const handlers = { hover: [], select: [] };
    const emit = (ev, arg) => handlers[ev].forEach((fn) => fn(arg));

    const markers = cities
      .map((c) => {
        const [x, y] = project(c.lon, c.lat);
        const left = c.labelSide === "left";
        return `
          <g class="marker" data-slug="${c.slug}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"
             ${opts.interactive ? `tabindex="0" role="link" aria-label="${esc(c.name)}: preview top 10"` : ""}>
            <g class="marker-inner">
              <circle class="halo" r="46"></circle>
              <circle class="ring" r="7"></circle>
              <circle class="hit" r="16"></circle>
              <circle class="dot" r="5.5"></circle>
              <text class="label" x="${left ? -11 : 11}" y="5" text-anchor="${left ? "end" : "start"}">${esc(c.name)}</text>
            </g>
          </g>`;
      })
      .join("");

    const regionLabels = GEO.labels
      .map((l) => `<g transform="translate(${l.x} ${l.y})"><g class="rl"><text class="region-label" text-anchor="middle">${esc(l.text)}</text></g></g>`)
      .join("");

    container.innerHTML = `
      <svg class="txmap${opts.interactive ? " is-interactive" : ""}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"
           role="img" aria-label="Map of Texas with featured cities">
        <defs>
          <clipPath id="tx-${id}"><path d="${GEO.texas}"></path></clipPath>
          <filter id="lift-${id}" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.12"></feDropShadow>
          </filter>
        </defs>
        <g class="world">
          <rect class="land-other" x="-3000" y="-3000" width="7000" height="7000"></rect>
          <path class="water" d="${GEO.water}"></path>
          <path class="neighbors" d="${GEO.neighbors}"></path>
          <path class="state" d="${GEO.texas}" filter="url(#lift-${id})"></path>
          <g clip-path="url(#tx-${id})">
            <path class="counties" d="${GEO.counties}"></path>
            <path class="roads" d="${GEO.roads}"></path>
          </g>
          <path class="state-edge" d="${GEO.texas}"></path>
          <g class="region-labels">${regionLabels}</g>
          ${markers}
        </g>
      </svg>`;

    const svg = container.querySelector("svg");
    const world = svg.querySelector(".world");
    let current = null;

    function focus(slug, scale) {
      const c = cities.find((x) => x.slug === slug);
      if (!c) return reset();
      const s = scale || 2.6;
      const [x, y] = project(c.lon, c.lat);
      world.style.transform = `translate(${W / 2 - s * x}px, ${H / 2 - s * y}px) scale(${s})`;
      world.style.setProperty("--inv", (1 / s).toFixed(4));
      svg.classList.add("has-focus");
      svg.querySelectorAll(".marker").forEach((m) => m.classList.toggle("active", m.dataset.slug === slug));
      current = slug;
    }

    function reset() {
      world.style.transform = "translate(0px, 0px) scale(1)";
      world.style.setProperty("--inv", "1");
      svg.classList.remove("has-focus");
      svg.querySelectorAll(".marker").forEach((m) => m.classList.remove("active"));
      current = null;
    }

    if (opts.interactive) {
      let lastPointer = "mouse";
      svg.querySelectorAll(".marker").forEach((m) => {
        const slug = m.dataset.slug;
        m.addEventListener("pointerdown", (e) => (lastPointer = e.pointerType));
        // Mouse hover previews; touch is handled on click below.
        m.addEventListener("pointerenter", (e) => {
          if (e.pointerType === "mouse") emit("hover", slug);
        });
        // Keyboard focus previews (not the focus that comes from a tap).
        m.addEventListener("focus", () => {
          if (m.matches(":focus-visible")) emit("hover", slug);
        });
        m.addEventListener("click", () => {
          // A tap previews first; tapping the previewed city opens it.
          if (lastPointer !== "mouse" && current !== slug) emit("hover", slug);
          else emit("select", slug);
        });
        m.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            emit("select", slug);
          }
        });
      });
    }

    reset();
    return {
      focus,
      reset,
      get current() { return current; },
      on(ev, fn) { handlers[ev].push(fn); }
    };
  }

  window.TexasMap = { create };
})();
