import { isObservable, lastValueFrom, Observable } from "rxjs";
import { create as createStore } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface CreateAuthenticationOptions {
  state?: () => AuthenticationData;
  login?: (
    state: AuthenticationData
  ) =>
    | Observable<AuthenticationData>
    | Promise<AuthenticationData>
    | AuthenticationData;
  refreshToken?: (
    state: AuthenticationData
  ) =>
    | Observable<AuthenticationData>
    | Promise<AuthenticationData>
    | AuthenticationData;
  logout?: (state: AuthenticationData) => void;
  isAuthenticated?: (state: AuthenticationData) => boolean;
  fetchPermissions?: (
    state: AuthenticationData
  ) => Observable<string[]> | Promise<string[]> | string[];
}

export function createAuthStore(options: CreateAuthenticationOptions) {
  const getDefaultState = () => {
    return {
      authState: options.state
        ? options.state()
        : {
            accessToken: undefined,
            refreshToken: undefined,
            permissions: [] as string[],
          },
    };
  };

  return createStore<{
    authState: AuthenticationData;
    isAuthenticated(): boolean;
    login(authState: Partial<AuthenticationData>): Promise<void>;
    refreshToken(): Promise<void>;
    logout(): Promise<void>;
    fetchPermissions(): Promise<void>;
    can(permissions: string | string[]): boolean;
  }>()(
    persist(
      immer((setState, getState) => ({
        ...getDefaultState(),
        isAuthenticated() {
          return (
            options.isAuthenticated?.(getState().authState) ??
            !!getState().authState.accessToken
          );
        },
        async login(authState: Partial<AuthenticationData>) {
          setState((state) => {
            state.authState = {
              ...state.authState,
              ...authState,
            };
          });

          if (!options.login) {
            return;
          }

          const loginResult = options.login(getState().authState);

          setState(async (state) => {
            state.authState = isObservable(loginResult)
              ? await lastValueFrom(loginResult)
              : await loginResult;
          });
        },

        async refreshToken() {
          if (!options.refreshToken) {
            return;
          }

          const refreshTokenResult = options.refreshToken(
            _cloneDeep(getState().authState)
          );

          const authState = isObservable(refreshTokenResult)
            ? await lastValueFrom(refreshTokenResult)
            : await refreshTokenResult;

          setState((state) => {
            state.authState = authState;
          });
        },

        async logout() {
          const tempState = _cloneDeep(getState().authState);
          setState((state) => {
            state.authState = getDefaultState().authState;
          });
          options.logout?.(tempState);
        },

        async fetchPermissions() {
          if (!options.fetchPermissions) {
            return;
          }
          const fetchPermissionsResult = options.fetchPermissions(
            _cloneDeep(getState().authState)
          );
          setState(async (state) => {
            state.authState.permissions = isObservable(fetchPermissionsResult)
              ? await lastValueFrom(fetchPermissionsResult)
              : await fetchPermissionsResult;
          });
        },

        can(permissions: string | string[]) {
          let listPermissions: string[] = [];

          if (!Array.isArray(permissions)) {
            listPermissions = permissions.split(",");
          } else {
            listPermissions = permissions;
          }

          if (!listPermissions.length) {
            return true;
          }

          const granted =
            getState().authState.permissions.filter((perm) =>
              listPermissions.includes(perm)
            ).length > 0;

          return granted;
        },
      })),
      {
        name: "auth",
      }
    )
  );
}

export type AuthStore = ReturnType<typeof createAuthStore>;
