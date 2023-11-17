import appEnv from "app-env";
import { LoginRequest, LoginResponse } from "src/modules/auth/models/Auth";

const AuthRepository = createRepository(
  {
    baseURL: appEnv.apiAuthUrl,
  },
  {
    login: (api, data: LoginRequest) => {
      return api.post<LoginResponse>("/login", data);
    },
  }
);

export default AuthRepository;
