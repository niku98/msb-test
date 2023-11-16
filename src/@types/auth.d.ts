declare global {
  interface AuthenticationData {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    permissions: string[];
  }

  interface PageMeta {
    requiredAuth?: boolean;
    permissions?: string[] | string;
  }
}

export {};
