import { matchRoutes, RouteObject } from "react-router-dom";

export const useCurrentRoute = () => {
  const routes = useAppRoutes();
  const location = useLocation();

  const currentRoute = useMemo(() => {
    return findMatchedRoute(routes as RouteObject[]) as AppRoute | undefined;
  }, [location.pathname, routes]);

  return currentRoute;
};

function findMatchedRoute(routes: RouteObject[]): RouteObject | undefined {
  const matchedRoutes = matchRoutes(routes, location.pathname);

  if (!matchedRoutes) {
    return undefined;
  }

  const { route } = matchedRoutes[0];
  const { children } = route;
  if (!children || location.pathname.replace(/\/$/g, "") === route.path) {
    return route;
  }

  return findMatchedRoute(children as RouteObject[]);
}
