# Texas Top 10

A website showcasing the top 10 places in cities across Texas.

Plain HTML, CSS and JavaScript with no build step, so it can be hosted on GitHub Pages as-is.

## Run locally

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Then open http://127.0.0.1:5173

## Project layout

- `index.html`: page shell
- `styles.css`: all styling
- `map.js`: the interactive Texas map (outline, city markers, zoom)
- `app.js`: routing (`#/`, `#/city/<slug>`, `#/method`, `#/about`), rendering and animations
- `data/cities.js`: the city lists. Add a city by adding an entry here, including its `lat`/`lon` for the map.

When you change CSS or JS, bump the `?v=` number on the links in `index.html` so browsers load the new files.
- `TASKS.md`: what's done and what's next
