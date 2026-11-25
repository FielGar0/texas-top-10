// Texas map: draws the state outline and city markers as SVG, and zooms smoothly onto a city.
(function () {
  "use strict";

  // Simplified Texas border, [longitude, latitude], clockwise from the Sabine Pass.
  const BORDER = [
    [-93.84, 29.69], [-94.36, 29.56], [-94.75, 29.33], [-95.1, 29.07], [-95.5, 28.8], [-96.0, 28.6],
    [-96.4, 28.4], [-96.8, 28.15], [-97.05, 27.85], [-97.25, 27.55], [-97.35, 27.1], [-97.3, 26.6],
    [-97.2, 26.1], [-97.15, 25.96], [-97.45, 25.88], [-97.95, 26.06], [-98.3, 26.15], [-98.7, 26.3],
    [-99.1, 26.45], [-99.25, 26.85], [-99.5, 27.5], [-99.8, 27.75], [-100.3, 28.25], [-100.65, 28.9],
    [-100.9, 29.35], [-101.4, 29.77], [-101.8, 29.8], [-102.3, 29.88], [-102.7, 29.7], [-102.9, 29.25],
    [-103.15, 28.98], [-103.5, 29.15], [-103.95, 29.3], [-104.4, 29.6], [-104.7, 30.0], [-105.0, 30.68],
    [-105.4, 30.9], [-105.95, 31.35], [-106.3, 31.62], [-106.53, 31.78], [-106.62, 32.0], [-103.06, 32.0],
    [-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-99.4, 34.38], [-99.0, 34.21], [-98.5, 34.1],
    [-98.1, 34.13], [-97.6, 33.9], [-97.1, 33.73], [-96.6, 33.85], [-96.1, 33.82], [-95.6, 33.9],
    [-95.1, 33.88], [-94.5, 33.64], [-94.04, 33.55], [-94.04, 33.02], [-94.04, 31.99], [-93.8, 31.6],
    [-93.55, 31.18], [-93.6, 30.7], [-93.7, 30.3], [-93.84, 29.69]
  ];

  const K = 60; // units per degree of latitude
  const COS = Math.cos((31 * Math.PI) / 180);
  const PAD = 28;
  const MIN_LON = -106.65, MAX_LAT = 36.5;
  const project = (lon, lat) => [PAD + (lon - MIN_LON) * K * COS, PAD + (MAX_LAT - lat) * K];

  const pts = BORDER.map(([lon, lat]) => project(lon, lat));
  // Extra room on the right so east-side labels (Houston) aren't clipped.
  const W = Math.ceil(Math.max(...pts.map((p) => p[0])) + PAD + 56);
  const H = Math.ceil(Math.max(...pts.map((p) => p[1])) + PAD);
  const outline = "M" + pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join("L") + "Z";

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /**
   * Render a map into `container`.
   * opts.cities: city list. opts.interactive: markers respond to hover/click.
   * Returns { focus(slug, scale), reset(), on(event, fn) }.
   */
  function create(container, opts) {
    const cities = opts.cities;
    const handlers = { hover: [], leave: [], select: [] };
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
              <circle class="hit" r="18"></circle>
              <circle class="dot" r="5.5"></circle>
              <text class="label" x="${left ? -12 : 12}" y="5" text-anchor="${left ? "end" : "start"}">${esc(c.name)}</text>
            </g>
          </g>`;
      })
      .join("");

    container.innerHTML = `
      <svg class="txmap${opts.interactive ? " is-interactive" : ""}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of Texas with featured cities">
        <defs>
          <pattern id="grid-${opts.id}" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" class="grid-dot"></circle>
          </pattern>
          <clipPath id="clip-${opts.id}"><path d="${outline}"></path></clipPath>
        </defs>
        <g class="world">
          <path class="state-shadow" d="${outline}"></path>
          <path class="state" d="${outline}"></path>
          <rect class="state-grid" x="0" y="0" width="${W}" height="${H}" fill="url(#grid-${opts.id})" clip-path="url(#clip-${opts.id})"></rect>
          <path class="state-edge" d="${outline}"></path>
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
      const tx = W / 2 - s * x;
      const ty = H / 2 - s * y;
      world.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
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
