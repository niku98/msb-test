import { InitOptions } from "i18next";
import { ReactElement, ReactNode, Suspense } from "react";
import { SetupAuthOptions } from "src/modules/core/auth/setup";
import { LoadingProviderProps } from "src/modules/core/loading";
import { RouteProviderProps } from "src/modules/core/router/RouterProvider";

export interface AppProviderProps {
  i18n?: InitOptions;
  auth?: SetupAuthOptions;
  router?: RouteProviderProps["options"];
  loading: LoadingProviderProps;
  children?: (app: ReactElement) => ReactNode;
}

const AppProvider = ({
  i18n: i18nOptions,
  auth,
  router: routerOptions,
  loading,
  children,
}: AppProviderProps) => {
  const app = useApp();
  const { component: LoadingComponent } = loading;

  return (
    <Suspense
      fallback={<LoadingComponent state={true} color={loading.color} />}
    >
      {
        <LoadingProvider {...loading}>
          <LocaleProvider
            onInstanceCreated={app.changeI18n}
            options={i18nOptions}
          >
            <AuthProvider options={auth} onSetup={app.changeAuth}>
              {({ routeLoader }) => {
                const appRoute = (
                  <RouterProvider
                    options={routerOptions}
                    onRouteLoad={routeLoader}
                    onSetup={({ router, routes, routePaths }) => {
                      app.changeRoutes(routes);
                      app.changeRouter(router);
                      app.changeRoutePaths(routePaths);
                    }}
                  />
                );

                return <>{children ? children(appRoute) : appRoute}</>;
              }}
            </AuthProvider>
          </LocaleProvider>
        </LoadingProvider>
      }
    </Suspense>
  );
};

export default AppProvider;
