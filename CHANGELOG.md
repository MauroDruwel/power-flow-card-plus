# power-flow-card-plus (dual-battery fork)

## 0.3.7-fork

### Features

- **Multiple battery support**: a second battery can be configured via `entities.battery_2` (same configuration structure as `battery`). Both battery circles are displayed side by side (centered). Flow lines, flow rates and the home circle use the combined power of both batteries, while each circle shows its own state of charge and charge/discharge values. Single battery usage is fully backward compatible.

### Fixes

- Multi-battery overlay flow lines: correct stroke colors, per-battery toGrid/toHome split, proper SVG coordinate alignment
- Battery 2 configurator icon (`mdi:battery`)
- Repo metadata, build pipeline, and README updated for this fork
