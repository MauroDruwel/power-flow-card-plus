import { type IndividualObject } from "@flixlix-cards/shared/states/raw/individual/get-individual-object";
import { type FlowCardPlusConfig, type NewDur } from "@flixlix-cards/shared/types";
import { html } from "lit";
import { flowBatteryToGrid } from "./battery-to-grid";
import { flowBatteryToHome } from "./battery-to-home";
import { flowGridToHome } from "./grid-to-home";
import { flowMultiBattery } from "./multi-battery";
import { flowSolarToGrid } from "./solar-to-grid";
import { flowSolarToHome } from "./solar-to-home";
import { flowSolarToBattery } from "./solart-to-battery";

export interface Flows {
  battery: any;
  battery1?: any;
  battery2?: any;
  grid: any;
  individual: IndividualObject[];
  solar: any;
  newDur: NewDur;
}

export const flowElement = (
  config: FlowCardPlusConfig,
  { battery, battery1, battery2, grid, individual, solar, newDur }: Flows
) => {
  const hasTwoBatteries = !!battery?.has && !!battery2?.has;
  return html`
  ${flowSolarToHome(config, { battery, grid, individual, solar, newDur })}
  ${flowSolarToGrid(config, { battery, grid, individual, solar, newDur })}
  ${hasTwoBatteries
    ? flowMultiBattery(config, { battery, battery1: battery1 ?? battery, battery2, grid, solar, newDur, individual })
    : html`
      ${flowSolarToBattery(config, { battery, individual, solar, newDur })}
      ${flowBatteryToHome(config, { battery, grid, individual, newDur })}
      ${flowBatteryToGrid(config, { battery, grid, individual, newDur })}
    `}
  ${flowGridToHome(config, { battery, grid, individual, solar, newDur })}
</div>`;
};
