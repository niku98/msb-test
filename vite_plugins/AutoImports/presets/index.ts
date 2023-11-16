import antd from "./antd";
import lodash from "./lodash";
import react from "./react";
import reactI18next from "./react-i18next";
import reactRouterDom from "./react-router-dom";
import rxjs from "./rxjs";

export const presets = {
  react,
  "react-router-dom": reactRouterDom,
  "react-i18next": reactI18next,
  "lodash-es": lodash,
  antd,
  rxjs,
};

export type PresetName = keyof typeof presets;
