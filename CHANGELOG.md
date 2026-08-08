# power-flow-card-plus (dual-battery fork)

## 0.4.1

### Features

- **`debug_dots` option**: when enabled, the card overlays dots on the multi-battery flow lines showing the assumed SVG anchors (blue) versus the real circle centers measured from the DOM (red), each labeled with `svg(x,y)` and `px(x,y)` coordinates and logged to the browser console. Helps tune the multi-battery line positions.

## 0.4.0

### Features

- **Multiple battery support**: a second battery can be configured via `entities.battery_2` (same configuration structure as `battery`). Both battery circles are displayed side by side (centered). Flow lines, flow rates and the home circle use the combined power of both batteries, while each circle shows its own state of charge and charge/discharge values. Single battery usage is fully backward compatible.

### Fixes

- Multi-battery overlay flow lines: correct stroke colors, per-battery toGrid/toHome split, proper SVG coordinate alignment
- Battery 2 configurator icon (`mdi:battery`)

### Repository / Tooling

- Build artifacts are no longer committed; a release workflow builds the bundle and attaches it to GitHub releases on `v*` tags
- CI runs typecheck and build on push/PR; README, `hacs.json` and repo metadata cleaned up
- Added MIT license

## 0.3.7-fork

### Fixes

- Repo metadata, build pipeline, and README updated for this fork
