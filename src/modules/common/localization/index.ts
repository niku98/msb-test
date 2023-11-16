import dayjs, { isDayjs } from "dayjs";
import { InitOptions } from "i18next";
import { camelCase, kebabCase } from "lodash";
import { SupportedLanguage } from "src/modules/common/localization/constants";
import locales from "src/modules/common/localization/locales";

export { SupportedLanguage };

export const resources = {
  [SupportedLanguage.Vi]: locales.vi,
  [SupportedLanguage.En]: locales.en,
};

export const i18nOptions: InitOptions = {
  fallbackLng: SupportedLanguage.Vi,
  lng: SupportedLanguage.Vi,
  debug: false,
  ns: Object.keys(resources),
  resources,

  interpolation: {
    escapeValue: false,
    format(value, format) {
      if (typeof value === "string") {
        switch (format) {
          case "uppercase":
            return value.toUpperCase();
          case "lowercase":
            return value.toLowerCase();
          case "firstLetterUppercase":
            return value.charAt(0).toUpperCase() + value.slice(1);
          case "pascalCase":
            return value.charAt(0).toUpperCase() + camelCase(value.slice(1));
          case "camelCase":
            return camelCase(value);
          case "kebabCase":
            return kebabCase(value);
        }
      }

      if (isDayjs(value) || value instanceof Date) {
        return dayjs(value).format(format);
      }

      return value;
    },
  },
};
