import adviceRequestLocales from "src/modules/adviceRequest/locales";

declare global {
  interface Localizations {
    advice_request: typeof adviceRequestLocales.en &
      typeof adviceRequestLocales.vi;
  }
}
