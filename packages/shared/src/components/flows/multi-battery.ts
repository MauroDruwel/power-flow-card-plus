import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { checkShouldShowDots } from "@flixlix-cards/shared/utils/check-should-show-dots";
import { showLine } from "@flixlix-cards/shared/utils/show-line";
import { styleLine } from "@flixlix-cards/shared/utils/style-line";
import { html, nothing, svg } from "lit";
import { type Flows } from "./index";

export const X_BATTERY_1 = 38;
export const X_BATTERY_2 = 64;
export const X_GRID = 8;
export const X_HOME = 92;
export const X_SOLAR = 50;
export const Y_BATTERY_ANCHOR = 90;
export const Y_GRID_HOME_ANCHOR = 55;
export const Y_SOLAR_ANCHOR = 0;

const dot = (
  config: FlowCardPlusConfig,
  condition: boolean,
  cls: string,
  href: string,
  dur: number,
  reverse = false
) => {
  if (!checkShouldShowDots(config) || !condition) return nothing;
  return svg`<circle r="1" class="${cls}" vector-effect="non-scaling-stroke">
    <animateMotion
      dur="${dur}s"
      repeatCount="indefinite"
      calcMode="paced"
      keyPoints="${reverse ? "1;0" : "0;1"}"
      keyTimes="0;1"
    >
      <mpath xlink:href="#${href}" />
    </animateMotion>
  </circle>`;
};

export const flowMultiBattery = (
  config: FlowCardPlusConfig,
  { battery1, battery2, grid, solar, newDur }: Flows
) => {
  if (!battery1?.has || !battery2?.has) return nothing;
  const showGrid =
    grid.has &&
    showLine(
      config,
      Math.max(
        grid.state.toBattery || 0,
        battery1.state.toGrid || 0,
        battery2.state.toGrid || 0
      )
    );
  const showHome =
    showLine(config, battery1.state.toHome || 0) ||
    showLine(config, battery2.state.toHome || 0);
  const showSolar = solar.has && showLine(config, solar.state.toBattery || 0);
  if (!showGrid && !showHome && !showSolar) return nothing;

  return html`<div class="lines multi-battery-lines high">
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      ${showGrid
        ? svg`
            <path
              id="mb-grid-b1"
              class="battery-from-grid ${styleLine(
                grid.state.toBattery || 0,
                config
              )}"
              d="M${X_BATTERY_1},${Y_BATTERY_ANCHOR} C${X_BATTERY_1},70 20,55 ${X_GRID},55"
              vector-effect="non-scaling-stroke"
            ></path>
            <path
              id="mb-grid-b2"
              class="battery-from-grid ${styleLine(
                grid.state.toBattery || 0,
                config
              )}"
              d="M${X_BATTERY_2},${Y_BATTERY_ANCHOR} C${X_BATTERY_2},65 20,55 ${X_GRID},55"
              vector-effect="non-scaling-stroke"
            ></path>
            ${dot(
              config,
              !!grid.state.toBattery,
              "battery-from-grid",
              "mb-grid-b1",
              newDur.batteryGrid,
              true
            )}
            ${dot(
              config,
              !!grid.state.toBattery,
              "battery-from-grid",
              "mb-grid-b2",
              newDur.batteryGrid,
              true
            )}
            ${dot(
              config,
              !!battery1.state.toGrid,
              "battery-to-grid",
              "mb-grid-b1",
              newDur.batteryGrid
            )}
            ${dot(
              config,
              !!battery2.state.toGrid,
              "battery-to-grid",
              "mb-grid-b2",
              newDur.batteryGrid
            )}
          `
        : nothing}
      ${showHome
        ? svg`
            <path
              id="mb-home-b1"
              class="battery-home ${styleLine(
                battery1.state.toHome || 0,
                config
              )}"
              d="M${X_BATTERY_1},${Y_BATTERY_ANCHOR} C${X_BATTERY_1},70 80,55 ${X_HOME},55"
              vector-effect="non-scaling-stroke"
            ></path>
            <path
              id="mb-home-b2"
              class="battery-home ${styleLine(
                battery2.state.toHome || 0,
                config
              )}"
              d="M${X_BATTERY_2},${Y_BATTERY_ANCHOR} C${X_BATTERY_2},70 80,55 ${X_HOME},55"
              vector-effect="non-scaling-stroke"
            ></path>
            ${dot(
              config,
              !!battery1.state.toHome,
              "battery-home",
              "mb-home-b1",
              newDur.batteryToHome
            )}
            ${dot(
              config,
              !!battery2.state.toHome,
              "battery-home",
              "mb-home-b2",
              newDur.batteryToHome
            )}
          `
        : nothing}
      ${showSolar
        ? svg`
            <path
              id="mb-solar-b1"
              class="battery-solar ${styleLine(
                solar.state.toBattery || 0,
                config
              )}"
              d="M${X_SOLAR},${Y_SOLAR_ANCHOR} C${X_SOLAR},40 ${X_BATTERY_1},60 ${X_BATTERY_1},${Y_BATTERY_ANCHOR}"
              vector-effect="non-scaling-stroke"
            ></path>
            <path
              id="mb-solar-b2"
              class="battery-solar ${styleLine(
                solar.state.toBattery || 0,
                config
              )}"
              d="M${X_SOLAR},${Y_SOLAR_ANCHOR} C${X_SOLAR},40 ${X_BATTERY_2},60 ${X_BATTERY_2},${Y_BATTERY_ANCHOR}"
              vector-effect="non-scaling-stroke"
            ></path>
            ${dot(
              config,
              !!solar.state.toBattery,
              "battery-solar",
              "mb-solar-b1",
              newDur.solarToBattery
            )}
            ${dot(
              config,
              !!solar.state.toBattery,
              "battery-solar",
              "mb-solar-b2",
              newDur.solarToBattery
            )}
          `
        : nothing}
    </svg>
  </div>`;
};
