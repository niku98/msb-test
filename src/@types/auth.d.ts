import { UserProfile } from "src/modules/auth/models/Auth";

declare global {
  interface AuthenticationData {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    permissions: string[];
    user: UserProfile | undefined;
  }

  interface PageMeta {
    requiredAuth?: boolean;
    permissions?: string[] | string;
  }
}

export {};
