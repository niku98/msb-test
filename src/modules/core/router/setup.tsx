import { ComponentType, ReactElement } from "react";
import { LoaderFunction } from "react-router";

type Routes = {
  [key: string]: Routes;
} & { $route?: AppRoute };

export interface LoadModulesPagesOptions {
  onLoad?: AppRouteLoaderFunction;
  errorElement?: ReactElement;
}

export function handleRouteHotUpdate() {
  if (import.meta.hot) {
    import.meta.hot.on("reactjs-core:route-changed", () => {
      window.location.reload();
    });
  }
}

export function loadModulesPages({ onLoad }: LoadModulesPagesOptions) {
  const pagesMeta = import.meta.glob("/src/modules/*/pages/**/*.tsx", {
    import: "pageMeta",
    query: "pageMeta",
    eager: true,
  });

  const pagesComponent = import.meta.glob<{ default: ComponentType }>(
    "/src/modules/*/pages/**/*.tsx",
    {
      eager: false,
    }
  );

  const routesObject: Routes = {};
  const routePaths: Record<string, any> = {};

  for (const path in pagesMeta) {
    if (Object.prototype.hasOwnProperty.call(pagesMeta, path)) {
      const pageMeta = pagesMeta[path] as PageMeta;

      const moduleName = pascalCase(
        path.replace(/src\/modules\/(.*?)\/pages\/(.*)/, "$1").slice(1)
      );
      const nameParts = path
        .replace(/src\/modules\/(.*?)\/pages\//, "")
        .replace(/\.(t|j)sx?/g, "")
        .slice(1)
        .split("/");
      const pageName = [
        moduleName,
        ...nameParts.map((name) =>
          pascalCase(name.split("_").shift() as string)
        ),
      ].join(".");

      const pagePath = getNormalizedPath(
        [
          "",
          _kebabCase(moduleName),
          ...nameParts.map((name) => {
            const path = name.split("_").pop() as string;
            if (/^\[(.*?)\]$/g.test(path)) {
              return path
                .replace(/\[\.\.\.(.*?)\]/g, "*")
                .replace(/\[(.*?)\]/g, ":$1");
            }

            return _kebabCase(path);
          }),
        ].join("/")
      );
      _set(routePaths, pageName, pagePath);

      const route: AppRoute = {
        path: pagePath,

        element: <PageLoader factory={pagesComponent[path]} />,
        meta: pageMeta,
      };

      _set(routesObject, `${pageName}.$route`, route);
    }
  }

  const createRouteLoader = (path: string, meta: PageMeta): LoaderFunction => {
    return async function loader(args) {
      const route = {
        meta,
        path,
      };
      const loadResult = await onLoad?.(args, route);

      if (loadResult instanceof Response) {
        return loadResult;
      }

      return meta.loader ? meta.loader(args, route) : loadResult ?? null;
    };
  };

  const routes: AppRoute[] = castRoutesObjectToArray(
    routesObject,
    createRouteLoader
  );

  return { routes, routePaths };
}

function castRoutesObjectToArray(
  routes: Routes,
  createRouteLoader: (path: string, meta: PageMeta) => LoaderFunction,
  depth = 0,
  prefixPath = "/",
  defaultMeta?: PageMeta
): AppRoute[] {
  return _flattenDeep(
    Object.values(
      _mapValues(routes, (route, key) => {
        const childrenRoutes = _omit(route, "$route") as Routes;
        const hasIndexPage = !!route.Index?.$route;

        const path = getNormalizedPath(prefixPath + _kebabCase(key));

        const meta =
          route.Index && route.Index.$route && route.Index.$route.meta
            ? (route.Index.$route.meta as PageMeta).parentMeta ??
              route.Index.$route.meta
            : route.$route?.meta;

        const mergedMeta = {
          ...defaultMeta,
          ...meta,
        };

        const children = castRoutesObjectToArray(
          childrenRoutes,
          createRouteLoader,
          depth + 1,
          path + "/",
          mergedMeta
        );

        if (!route.$route && depth > 0 && !hasIndexPage) {
          return children;
        }

        const result = {
          ...route.$route,
          path: route.$route
            ? route.$route.path
            : getRoutePathFromChild(route, path),
          index: children.length === 0 && _lowerCase(key) === "index",
          meta: mergedMeta,
          loader: createRouteLoader(path, mergedMeta),
          children: children.length ? children : undefined,
        } as AppRoute;

        return result;
      })
    )
  );
}

function getNormalizedPath(path: string) {
  path = path.replace(/\/index/g, "").replace("//", "/");

  return path.length === 0 ? "/" : path;
}

function getRoutePathFromChild(
  route: Routes,
  defaultPath?: string,
  depth = 1
): string | undefined {
  const keys = Object.keys(route).sort((k) => (k === "Index" ? -1 : 1));
  const key = keys[0];
  if (!keys.length || !key || key === "$route") {
    return defaultPath;
  }

  const currentRoute = route[key].$route;

  return currentRoute
    ? currentRoute.path
        ?.split("/")
        .slice(0, key === "Index" ? undefined : -1 * depth)
        .join("/")
    : Object.keys(route[key]).length > 0
    ? getRoutePathFromChild(route[key], defaultPath, depth + 1)
    : defaultPath;
}
