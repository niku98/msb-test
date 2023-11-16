import "react-i18next";
import { resources } from "src/modules/common/localization";
declare global {
  interface Localizations {}
  type GlobalTranslationMessages = typeof resources["vi"] &
    typeof resources["en"] &
    Localizations;
}

declare module "i18next" {
  interface CustomTypeOptions {
    resources: GlobalTranslationMessages;
  }
}

export {};
