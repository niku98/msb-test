import { Router } from "@remix-run/router";
import {
  RouterProvider as ReactRouterProvider,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import { LoadModulesPagesOptions } from "src/modules/core/router/setup";

export interface RouteProviderProps {
  options?: Omit<LoadModulesPagesOptions, "onLoad"> & {
    routes?: AppRoute[];
    loader?: (
      ...args: Parameters<AppRouteLoaderFunction>
    ) => void | Promise<void>;
  };
  onRouteLoad?: AppRouteLoaderFunction;
  onSetup?: (props: {
    router: Router;
    routes: AppRoute[];
    routePaths: RoutePaths;
  }) => void;
}

const RouterProvider = ({
  options,
  onRouteLoad,
  onSetup,
}: RouteProviderProps) => {
  const routeData = useConst<{
    router: Router;
    routes: AppRoute[];
    routePaths: RoutePaths;
  }>(() => {
    const { routes, routePaths } = loadModulesPages({
      onLoad: async (args, route) => {
        await options?.loader?.(args, route);

        return onRouteLoad?.(args, route);
      },
      ...options,
    });

    const router = createBrowserRouter([
      {
        element: <LayoutLoader />,
        children: [...(options?.routes ?? []), ...routes] as RouteObject[],
        errorElement: options?.errorElement,
      },
    ]);

    handleRouteHotUpdate();
    return { routes, router, routePaths: routePaths as RoutePaths };
  });

  useMount(() => {
    onSetup?.(routeData);
  });

  return <ReactRouterProvider router={routeData?.router} />;
};

export default RouterProvider;
