import profileLocales from "src/modules/profile/locales";

declare global {
  interface Localizations {
    profile: typeof profileLocales.en &
      typeof profileLocales.vi;
  }
}
