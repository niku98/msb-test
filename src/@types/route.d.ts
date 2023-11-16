import { Namespace, TFuncKey } from "i18next";
import { ComponentType } from "react";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  RouteObject,
} from "react-router-dom";

declare global {
  interface RoutePaths {}

  type FullRoutePaths<
    Path = ObjectPropertyType<RoutePaths, Normalize<RoutePaths>>
  > = Path extends string ? Path : never;

  interface PageMeta<Title> {
    title?: TFuncKey<Namespace, undefined> | Title;
    menu?:
      | {
          title?: TFuncKey<Namespace, undefined> | Title;
          show?: boolean;
          showChildren?: boolean;
        }
      | boolean;
    breadcrumb?:
      | {
          show?: boolean;
          title?: TFuncKey<Namespace, undefined> | Title;
        }
      | boolean;
    icon?: ComponentType;
    loader?: AppRouteLoaderFunction;
    order?: number;
  }

  type AppRoute = Omit<RouteObject, "children"> & {
    meta?: PageMeta;
    children?: AppRoute[];
  };

  type AppRouteLoaderFunction = (
    args: LoaderFunctionArgs,
    route: Pick<AppRoute, "meta" | "path">
  ) => ReturnType<LoaderFunction>;
}

export {};
