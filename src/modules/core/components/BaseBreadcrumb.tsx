import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";

interface BreadcrumbProps {
  current: AppRoute;
  routes: AppRoute[];
}

const sortRoutes = (routes: AppRoute[]) => {
  return routes.toSorted((a, b) =>
    (a.path && /\/?:(.*?)\/?/.test(a.path)) ||
    (b.path && /\/?:(.*?)\/?/.test(b.path))
      ? -1
      : 0
  );
};

const getListMatchedRoutes = (
  current: AppRoute,
  routes: AppRoute[],
  result: AppRoute[] = []
) => {
  const sortedRoutes = sortRoutes(routes);

  for (const route of sortedRoutes) {
    if (!current.path || !route.path) {
      continue;
    }

    if (pathMatched(current.path, route.path)) {
      if (route.children) {
        result.push(route, ...getListMatchedRoutes(current, route.children));
        break;
      } else if (pathMatched(current.path, route.path, true)) {
        result.push(route);
        break;
      }
    }
  }

  return result;
};

const BaseBreadcrumb = ({ routes, current }: BreadcrumbProps) => {
  const { t } = useTranslation();

  const getTitle = useCallback(
    (route: AppRoute) => {
      if (
        route.meta?.breadcrumb === undefined ||
        typeof route.meta.breadcrumb === "boolean"
      ) {
        return t(route.meta?.title as any);
      }

      return t(route.meta.breadcrumb.title as any);
    },
    [t]
  );

  const breadcrumbItems: BreadcrumbItemType[] = useMemo(() => {
    const matchedRoutes = getListMatchedRoutes(current, routes).filter(
      (route) => {
        if (route.meta?.breadcrumb === undefined) {
          return true;
        }

        if (typeof route.meta.breadcrumb === "boolean") {
          return route.meta.breadcrumb;
        }

        return route.meta.breadcrumb.show;
      }
    );

    return matchedRoutes.map<BreadcrumbItemType>((item, index) => {
      return {
        title:
          item.path && matchedRoutes.length - 1 > index ? (
            <Link path={item.path ?? ""}>{getTitle(item)}</Link>
          ) : (
            getTitle(item)
          ),
        key: `${item.path}-${index}`,
      };
    });
  }, [routes, current, getTitle]);

  return <AntBreadcrumb items={breadcrumbItems} />;
};

export default BaseBreadcrumb;
