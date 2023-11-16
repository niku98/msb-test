import appEnv from "app-env";
import { AxiosObservable } from "src/modules/core/api/AxiosObservable";

export default function createAxiosInstance(url?: string): AxiosObservable {
  return AxiosObservable.create({
    baseURL: url || appEnv.apiUrl,
  });
}
