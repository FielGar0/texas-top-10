// Texas map: draws real boundaries (from data/geo.js) and city markers as SVG.
// Supports focusing on a city, free zoom and pan (buttons, trackpad pinch / Ctrl+scroll, drag, touch pinch),
// and reveals small towns (tier: "town") only once the map is zoomed in.
(function () {
  "use strict";

  const GEO = window.TX_GEO;
  const P = GEO.projection;
  const COS = Math.cos((P.lat * Math.PI) / 180);
  const W = GEO.width, H = GEO.height;
  const project = (lon, lat) => [(lon - P.lon0) * P.K * COS, (P.lat1 - lat) * P.K];

  const MIN_ZOOM = 1, MAX_ZOOM = 9;
  const TOWN_ZOOM = 2; // small towns appear at this zoom and closer
  const OVERSCROLL = 0.25; // how far past the edges you can pan, as a share of the map

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /**
   * Render a map into `container`.
   * opts.cities: city list. opts.interactive: markers respond to hover/click and the map zooms and pans.
   * opts.id: unique id for defs.
   * Returns { focus, highlight, reset, zoomBy, on, current, mode, scale }.
   */
  function create(container, opts) {
    const cities = opts.cities;
    const id = opts.id;
    const handlers = { hover: [], select: [], zoom: [] };
    const emit = (ev, arg) => handlers[ev].forEach((fn) => fn(arg));

    const markers = cities
      .map((c) => {
        const [x, y] = project(c.lon, c.lat);
        const left = c.labelSide === "left";
        const town = c.tier === "town";
        return `
          <g class="marker${town ? " town" : ""}" data-slug="${c.slug}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"
             ${opts.interactive ? `tabindex="${town ? -1 : 0}" role="link" aria-label="${esc(c.name)}: preview top 10"` : ""}>
            <g class="marker-inner">
              <circle class="halo" r="46"></circle>
              <circle class="ring" r="7"></circle>
              <circle class="hit" r="${town ? 12 : 16}"></circle>
              <circle class="dot" r="${town ? 4 : 5.5}"></circle>
              <text class="label" x="${left ? -10 : 10}" y="${town ? 4 : 5}" text-anchor="${left ? "end" : "start"}">${esc(c.name)}</text>
            </g>
          </g>`;
      })
      .join("");

    const regionLabels = GEO.labels
      .map((l) => `<g transform="translate(${l.x} ${l.y})"><g class="rl"><text class="region-label" text-anchor="middle">${esc(l.text)}</text></g></g>`)
      .join("");

    const townCount = cities.filter((c) => c.tier === "town").length;
    const controls = opts.interactive
      ? `<div class="map-controls" role="group" aria-label="Map zoom">
           <button class="zin" aria-label="Zoom in">+</button>
           <button class="zout" aria-label="Zoom out">−</button>
           <button class="zreset" aria-label="Show all of Texas" title="Show all of Texas">⤢</button>
         </div>
         ${townCount ? `<p class="map-hint">Zoom in to see ${townCount} small towns</p>` : ""}`
      : "";

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
      </svg>
      ${controls}`;

    const svg = container.querySelector("svg");
    const world = svg.querySelector(".world");
    let current = null;
    let mode = "idle"; // "idle" | "focus" (zoomed by hovering a city) | "manual" (zoomed or panned by the user)
    const view = { s: 1, tx: 0, ty: 0 };

    function clamp() {
      view.s = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, view.s));
      const ox = W * OVERSCROLL, oy = H * OVERSCROLL;
      view.tx = Math.min(ox, Math.max(W - W * view.s - ox, view.tx));
      view.ty = Math.min(oy, Math.max(H - H * view.s - oy, view.ty));
    }

    function apply(animate) {
      world.classList.toggle("no-anim", !animate);
      world.style.transform = `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`;
      world.style.setProperty("--inv", (1 / view.s).toFixed(4));
      svg.classList.toggle("show-towns", view.s >= TOWN_ZOOM - 0.01);
      svg.classList.toggle("zoomed", view.s > 1.01);
      container.classList.toggle("zoomed", view.s > 1.01);
      container.classList.toggle("show-towns", view.s >= TOWN_ZOOM - 0.01);
      emit("zoom", view.s);
    }

    function setActive(slug) {
      svg.querySelectorAll(".marker").forEach((m) => m.classList.toggle("active", m.dataset.slug === slug));
      current = slug;
    }

    // Glide to a city. Towns get a closer zoom so their neighbors are readable.
    function focus(slug, scale) {
      const c = cities.find((x) => x.slug === slug);
      if (!c) return reset();
      const s = scale || (c.tier === "town" ? 4 : 2.6);
      const [x, y] = project(c.lon, c.lat);
      view.s = s;
      view.tx = W / 2 - s * x;
      view.ty = H / 2 - s * y;
      apply(true);
      svg.classList.add("has-focus");
      setActive(slug);
      mode = "focus";
    }

    // Mark a city as active without moving the map (used while the user is exploring by hand).
    function highlight(slug) {
      svg.classList.remove("has-focus");
      setActive(slug);
    }

    function reset() {
      view.s = 1;
      view.tx = 0;
      view.ty = 0;
      apply(true);
      svg.classList.remove("has-focus");
      setActive(null);
      mode = "idle";
    }

    // Zoom by `factor` keeping the point (px, py) in viewBox units fixed on screen.
    function zoomAt(factor, px, py, animate) {
      const wx = (px - view.tx) / view.s, wy = (py - view.ty) / view.s;
      view.s *= factor;
      clamp();
      view.tx = px - wx * view.s;
      view.ty = py - wy * view.s;
      clamp();
      apply(animate);
      svg.classList.remove("has-focus");
      mode = view.s > 1.01 ? "manual" : "idle";
    }
    const zoomBy = (factor) => zoomAt(factor, W / 2, H / 2, true);

    const toViewBox = (clientX, clientY) => {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    };

    if (opts.interactive) {
      let lastPointer = "mouse";
      let suppressClick = false;

      svg.querySelectorAll(".marker").forEach((m) => {
        const slug = m.dataset.slug;
        m.addEventListener("pointerdown", (e) => (lastPointer = e.pointerType));
        // Mouse hover previews; touch is handled on click below.
        m.addEventListener("pointerenter", (e) => {
          if (e.pointerType === "mouse" && !dragging) emit("hover", slug);
        });
        // Keyboard focus previews (not the focus that comes from a tap).
        m.addEventListener("focus", () => {
          if (m.matches(":focus-visible")) emit("hover", slug);
        });
        m.addEventListener("click", () => {
          if (suppressClick) return;
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

      // Buttons
      container.querySelector(".zin").addEventListener("click", () => zoomBy(1.6));
      container.querySelector(".zout").addEventListener("click", () => zoomBy(1 / 1.6));
      container.querySelector(".zreset").addEventListener("click", () => reset());

      // Trackpad pinch arrives as wheel + ctrlKey; Ctrl/⌘ + mouse wheel zooms too. A plain scroll still scrolls the page.
      svg.addEventListener(
        "wheel",
        (e) => {
          if (!e.ctrlKey && !e.metaKey) return;
          e.preventDefault();
          const p = toViewBox(e.clientX, e.clientY);
          zoomAt(Math.exp(-e.deltaY * 0.01), p.x, p.y, false);
        },
        { passive: false }
      );

      // Drag to pan; two fingers to pinch-zoom.
      const pointers = new Map();
      let dragging = false;
      let start = null;
      let pinch = null;

      svg.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.size === 1) {
          start = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
          dragging = false;
        } else if (pointers.size === 2) {
          const [a, b] = [...pointers.values()];
          const mid = toViewBox((a.x + b.x) / 2, (a.y + b.y) / 2);
          pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: view.s, mid };
        }
      });

      svg.addEventListener("pointermove", (e) => {
        if (!pointers.has(e.pointerId)) return;
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const unit = 1 / svg.getScreenCTM().a; // viewBox units per screen pixel
        if (pointers.size === 2 && pinch) {
          const [a, b] = [...pointers.values()];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          zoomAt((pinch.s * (d / pinch.d)) / view.s, pinch.mid.x, pinch.mid.y, false);
          dragging = true;
          return;
        }
        if (!start) return;
        const dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (!dragging && Math.hypot(dx, dy) < 5) return;
        // At full view on touch screens, let a one-finger drag scroll the page instead.
        if (!dragging && view.s <= 1.01 && e.pointerType !== "mouse") return;
        if (!dragging) svg.setPointerCapture(e.pointerId);
        dragging = true;
        svg.classList.add("grabbing");
        view.tx = start.tx + dx * unit;
        view.ty = start.ty + dy * unit;
        clamp();
        apply(false);
        svg.classList.remove("has-focus");
        mode = "manual";
      });

      const end = (e) => {
        pointers.delete(e.pointerId);
        if (pointers.size < 2) pinch = null;
        if (pointers.size === 0) {
          if (dragging) {
            suppressClick = true;
            setTimeout(() => (suppressClick = false), 0);
          }
          dragging = false;
          start = null;
          svg.classList.remove("grabbing");
        }
      };
      svg.addEventListener("pointerup", end);
      svg.addEventListener("pointercancel", end);
    }

    reset();
    return {
      focus,
      highlight,
      reset,
      zoomBy,
      get current() { return current; },
      get mode() { return mode; },
      get scale() { return view.s; },
      on(ev, fn) { handlers[ev].push(fn); }
    };
  }

  window.TexasMap = { create };
})();
