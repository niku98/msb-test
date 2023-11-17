import authLocales from "src/modules/auth/locales";

declare global {
  interface Localizations {
    auth: typeof authLocales.en &
      typeof authLocales.vi;
  }
}
