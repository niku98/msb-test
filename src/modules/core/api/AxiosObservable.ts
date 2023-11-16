import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { AxiosObservableRequestConfig } from "src/modules/core/api/models";

export class AxiosObservable<GlobalResponseType = any> {
  private config?: AxiosObservableRequestConfig;
  private axios: AxiosInstance;

  constructor(config?: AxiosObservableRequestConfig) {
    if (config) {
      this.config = config;
    }

    this.axios = Axios.create(this.config);
  }

  get interceptors() {
    return this.axios.interceptors;
  }

  static create<ResponseType = any>(config?: AxiosObservableRequestConfig) {
    return new AxiosObservable<ResponseType>(config);
  }

  request<ResponseType = GlobalResponseType>(
    config: AxiosObservableRequestConfig
  ) {
    return new Observable<AxiosResponse<ResponseType>>((destination) => {
      const abortController = new AbortController();

      if (config.signal?.addEventListener !== undefined) {
        config.signal.addEventListener("abort", () => {
          abortController.abort();
        });
      }

      let onUploadProgress;
      let onDownloadProgress;

      if (config.uploadProgressSubscriber) {
        onUploadProgress = (progress: any) => {
          if (config.uploadProgressSubscriber) {
            config.uploadProgressSubscriber.next(progress);
          }
        };
      }

      if (config.downloadProgressSubscriber) {
        onDownloadProgress = (progress: any) => {
          if (config.downloadProgressSubscriber) {
            config.downloadProgressSubscriber.next(progress);
          }
        };
      }

      this.axios
        .request<ResponseType>({
          ...config,
          onUploadProgress,
          onDownloadProgress,
          signal: abortController.signal,
        })
        .then((response) => {
          destination.next(response);
          destination.complete();

          config.uploadProgressSubscriber &&
            config.uploadProgressSubscriber.complete();

          config.downloadProgressSubscriber &&
            config.downloadProgressSubscriber.complete();
        })
        .catch((reason) => {
          destination.error(reason);
          config.uploadProgressSubscriber &&
            config.uploadProgressSubscriber.error(reason);
        });

      return () => {
        abortController.abort();
      };
    });
  }

  get<ResponseType = GlobalResponseType>(
    url: string,
    config?: AxiosObservableRequestConfig
  ) {
    return this.request<ResponseType>({
      url,
      method: "GET",
      ...config,
    });
  }

  delete<ResponseType = GlobalResponseType>(
    url: string,
    config?: AxiosObservableRequestConfig
  ) {
    return this.request<ResponseType>({
      url,
      method: "DELETE",
      ...config,
    });
  }

  post<ResponseType = GlobalResponseType>(
    url: string,
    data?: any,
    config?: AxiosObservableRequestConfig
  ) {
    return this.request<ResponseType>({
      url,
      data,
      method: "POST",
      ...config,
    });
  }

  put<ResponseType = GlobalResponseType>(
    url: string,
    data?: any,
    config?: AxiosObservableRequestConfig
  ) {
    return this.request<ResponseType>({
      url,
      data,
      method: "PUT",
      ...config,
    });
  }

  patch<ResponseType = GlobalResponseType>(
    url: string,
    data?: any,
    config?: AxiosObservableRequestConfig
  ) {
    return this.request<ResponseType>({
      url,
      data,
      method: "PATCH",
      ...config,
    });
  }
}
