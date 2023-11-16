import axiosStatic from "axios";
import { LoaderFunctionArgs } from "react-router-dom";
import { lastValueFrom } from "rxjs";
import { toast } from "src/modules/common/components/ui/use-toast";
import {
  AuthStore,
  CreateAuthenticationOptions,
} from "src/modules/core/auth/createStore";

export interface SetupAuthOptions {
  createAuthStoreOptions?: CreateAuthenticationOptions;
  hasAccess?: (
    args: LoaderFunctionArgs,
    route: Pick<AppRoute, "path" | "meta">,
    authStore: AuthStore
  ) => boolean | Promise<boolean>;
  unAuthenticatedMessage?: string | (() => string);
  loginPath?: string;
}

function createRouterLoader(
  { loginPath = "/login", hasAccess, unAuthenticatedMessage }: SetupAuthOptions,
  authStore: AuthStore
) {
  const loader: AppRouteLoaderFunction = async (args, route) => {
    const { isAuthenticated, fetchPermissions, can } = authStore.getState();
    const permissions = route.meta?.permissions ?? [];
    const requiredAuth = route.meta?.requiredAuth ?? false;

    if (!requiredAuth && (!permissions || permissions.length === 0)) {
      return null;
    }

    if (!isAuthenticated()) {
      unAuthenticatedMessage !== undefined &&
        toast({
          title:
            typeof unAuthenticatedMessage === "function"
              ? unAuthenticatedMessage()
              : unAuthenticatedMessage,
          variant: "destructive",
        });
      return Response.redirect(loginPath);
    }

    await fetchPermissions();
    const checkPermissions =
      permissions && permissions.length ? can(permissions) : true;

    const customHasAccess = hasAccess
      ? hasAccess(args, route, authStore)
      : true;
    if (!checkPermissions || !customHasAccess) {
      throw new Response("", { status: 403 });
    }

    return null;
  };

  return loader;
}

function setupApiInterceptor(authStore: AuthStore) {
  const { refreshToken, logout } = authStore.getState();
  // Handle refresh token
  let isRefreshing = false;
  const failedQueue: {
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }[] = [];

  const processQueue = (error: any) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(true);
      }
    });

    failedQueue.splice(0);
  };

  Api.addInterceptor({
    response: {
      error: (error, axios) => {
        if (!(error instanceof axiosStatic.AxiosError)) {
          return error;
        }
        const { response, config } = error;

        if (response?.status === 401) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return config && lastValueFrom(axios.request(config));
              })
              .catch((err) => {
                return err;
              });
          }

          isRefreshing = true;
          return new Promise((resolve, reject) => {
            refreshToken()
              .then(() => {
                isRefreshing = false;
                processQueue(null);
                resolve(config && lastValueFrom(axios.request(config)));
              })
              .catch((error) => {
                isRefreshing = false;
                logout();
                processQueue(error);
                reject(error);
              });
          });
        }

        return error;
      },
    },
  });
}

export async function setupAuth(options: SetupAuthOptions) {
  return new Promise<{
    store: AuthStore;
    loader: AppRouteLoaderFunction;
  }>((resolve) => {
    const store = createAuthStore(options.createAuthStoreOptions ?? {});
    setupApiInterceptor(store);
    const loader = createRouterLoader(options, store);
    store.persist.onFinishHydration(() => {
      resolve({ store, loader });
    });
    store.persist.rehydrate();
  });
}
