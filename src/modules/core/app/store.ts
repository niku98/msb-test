import { Router } from "@remix-run/router";
import { i18n as I18n } from "i18next";
import { AuthStore } from "src/modules/core/auth/createStore";
import { create as createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useApp = createStore<
  AppStoreState & {
    changeRoutePaths(routePaths: RoutePaths): void;
    changeI18n(i18n: I18n): void;
    changeRoutes(routes: AppRoute[]): void;
    changeRouter(router: Router): void;
    changeAuth(auth: AuthStore): void;
    changeConfig<Key extends AppConfigPath>(
      key: Key,
      value: ObjectPropertyType<AppConfig, Key>
    ): void;
  }
>()(
  immer((setState) => ({
    routePaths: {} as RoutePaths,
    routes: [] as AppRoute[],
    i18n: undefined as unknown as I18n,
    config: {} as AppConfig,
    router: undefined as unknown as Router,
    auth: undefined as unknown as AuthStore,

    changeRoutePaths(routePaths: RoutePaths) {
      setState((state) => {
        state.routePaths = routePaths;
      });
    },
    changeI18n(i18n: I18n) {
      setState((state) => {
        state.i18n = i18n as any;
      });
    },
    changeRoutes(routes: AppRoute[]) {
      setState((state) => {
        state.routes = routes;
      });
    },
    changeRouter(router: Router) {
      setState((state) => {
        state.router = router as any;
      });
    },
    changeAuth(auth: AuthStore) {
      setState((state) => {
        state.auth = auth;
      });
    },
    changeConfig<Key extends AppConfigPath>(
      key: Key,
      value: ObjectPropertyType<AppConfig, Key>
    ) {
      setState((state) => {
        _set(state.config, key, _cloneDeep(value));
      });
    },
  }))
);
