import { getEntityState } from "@flixlix-cards/shared/states/utils/get-entity-state";
import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { type HomeAssistant } from "custom-card-helpers";
import { getFieldInState, getFieldOutState } from "./base";

export type BatteryField = "battery" | "battery_2";

export const getBatteryStateOfCharge = (
  hass: HomeAssistant,
  config: FlowCardPlusConfig,
  field: BatteryField = "battery"
) => {
  const entity = config.entities[field]?.state_of_charge;

  if (entity === undefined) return null;

  return getEntityState(hass, entity);
};

export const getBatteryInState = (
  hass: HomeAssistant,
  config: FlowCardPlusConfig,
  field: BatteryField = "battery"
) => getFieldInState(hass, config, field);

export const getBatteryOutState = (
  hass: HomeAssistant,
  config: FlowCardPlusConfig,
  field: BatteryField = "battery"
) => getFieldOutState(hass, config, field);
