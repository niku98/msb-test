export function getAppState<AppStoreStateKey extends keyof AppStoreState>(
  key: AppStoreStateKey
) {
  return useApp.getState()[key];
}

export function getAppConfig() {
  return getAppState("config");
}

export function getAppI18n() {
  return getAppState("i18n");
}

export function getAppRoutePaths() {
  return getAppState("routePaths");
}

export function getAppRouter() {
  return getAppState("router");
}

export function getAppRoutes() {
  return getAppState("routes");
}
