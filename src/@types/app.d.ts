import { Router } from "@remix-run/router";
import { i18n as I18n } from "i18next";
import { AuthStore } from "src/modules/core/auth/createStore";

declare global {
  interface AppConfig {}

  type AppConfigPath = Normalize<AppConfig>;

  interface AppStoreState {
    router: Router;
    i18n: I18n;
    routes: AppRoute[];
    routePaths: RoutePaths;
    config: AppConfig;
    auth: AuthStore;
  }
}
