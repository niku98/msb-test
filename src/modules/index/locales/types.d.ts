import indexLocales from "src/modules/index/locales";

declare global {
  interface Localizations {
    index: typeof indexLocales.en &
      typeof indexLocales.vi;
  }
}
