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
        unAuthenticatedMessage: "Bạn cần đăng nhập để truy cập trang này.",
        createAuthStoreOptions: {
          state() {
            return {
              user: undefined,
              accessToken: undefined,
              refreshToken: undefined,
              permissions: [],
            };
          },
          logout(state) {
            if (window.location.pathname.startsWith("/profile")) {
              getAppRouter().navigate({ pathname: "/" });
            }
            return state;
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
