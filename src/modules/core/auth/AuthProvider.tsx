import { ReactNode } from "react";
import { AuthStore } from "src/modules/core/auth/createStore";
import { SetupAuthOptions } from "src/modules/core/auth/setup";

interface AuthProviderProps {
  children?:
    | ReactNode
    | ((props: {
        store: AuthStore;
        routeLoader: AppRouteLoaderFunction;
      }) => JSX.Element);
  options?: SetupAuthOptions;
  onSetup?: (store: AuthStore) => void;
}

const AuthProvider = ({
  children,
  options = {},
  onSetup,
}: AuthProviderProps) => {
  const [authData, setAuthData] = useState<{
    store: AuthStore;
    routeLoader: AppRouteLoaderFunction;
  }>();

  useConstructor(async () => {
    const { loader, store } = await setupAuth(options);
    setAuthData({ routeLoader: loader, store });
    onSetup?.(store);
  });

  return (
    <>
      {typeof children === "function"
        ? !!authData && children(authData)
        : children}
    </>
  );
};

export default AuthProvider;
