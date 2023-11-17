import { i18nOptions } from "src/modules/common/localization";
import RouteError from "src/pages/RouteError";
import appRootRoutes from "src/routes/routes";

export default function App() {
  return (
    <AppProvider
      i18n={i18nOptions}
      router={{
        errorElement: <RouteError />,
        routes: appRootRoutes,
      }}
      loading={{
        component: AppMainLoading,
      }}
      auth={{
        loginPath: "/auth/login",
        createAuthStoreOptions: {
          state() {
            return {
              user: undefined,
              accessToken: undefined,
              refreshToken: undefined,
              permissions: [],
            };
          },
        },
      }}
    >
      {(routes) => (
        <>
          {routes} <Toaster />
        </>
      )}
    </AppProvider>
  );
}
