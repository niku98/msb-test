import {
  AxiosHeaderValue,
  AxiosHeaders,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { AxiosObservable } from "src/modules/core/api/AxiosObservable";
import TokenManager from "src/modules/core/api/TokenManager";
import {
  ApiRequestConfig,
  Interceptor,
  RequestHeaderContentType,
} from "src/modules/core/api/models";

export class Api<GlobalResponse = any> {
  private axiosInstance: AxiosObservable;
  private defaultConfig: ApiRequestConfig = {
    contentType: "json",
    cache: false,
  };

  // Signal
  static signal?: AbortSignal;

  // Token
  static tokenManager = new TokenManager<TokenTypes>();
  private tokenType?: TokenTypes | null = undefined;
  private static tokenType?: TokenTypes | null = "base_token";
  static setAuthorizationTokenType(type: TokenTypes) {
    Api.tokenType = type;
  }

  // Params
  private static globalParams: { [key: string]: string } = {};
  static setGlobalParams(data: { [key: string]: string }) {
    Api.globalParams = {
      ...Api.globalParams,
      ...data,
    };
  }

  // Body data
  private static globalData: { [key: string]: any } = {};
  static setGlobalData(data: { [key: string]: any }) {
    Api.globalData = {
      ...Api.globalData,
      ...data,
    };
  }

  // Headers
  private static globalHeaders: { [key: string]: any } = {};
  static setGlobalHeaders(headers: { [key: string]: string }) {
    Api.globalHeaders = {
      ...Api.globalHeaders,
      ...headers,
    };
  }

  // Interceptors
  private static interceptors: Set<Interceptor> = new Set();

  static addInterceptor(interceptor: Interceptor) {
    Api.interceptors.add(interceptor);

    return () => {
      Api.removeInterceptor(interceptor);
    };
  }

  static removeInterceptor(interceptor: Interceptor) {
    Api.interceptors.delete(interceptor);
  }

  constructor(url?: string, config?: ApiRequestConfig) {
    this.axiosInstance = createAxiosInstance(url);
    this.setupInterceptor();
    if (config) {
      this.defaultConfig = {
        ...this.defaultConfig,
        ...config,
      };
    }
  }

  setAuthorizationTokenType(type: TokenTypes | null) {
    this.tokenType = type;
  }

  private getTokenType(config: ApiRequestConfig) {
    if (config.tokenType !== undefined) {
      return config.tokenType;
    }

    if (this.tokenType !== undefined) {
      return this.tokenType;
    }

    return Api.tokenType;
  }

  /**
   * Set up interceptors
   */
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config: ApiRequestConfig) => {
        config = await this.useRequestInterceptors(config);
        // Merge default config
        config = _merge({}, this.defaultConfig, config);

        // Merge global header
        const headers: RawAxiosRequestHeaders = {
          ...Api.globalHeaders,
          "Content-Type":
            config.contentType === "formData"
              ? false
              : config.contentType === "urlEncoded"
              ? RequestHeaderContentType.UrlEncoded
              : RequestHeaderContentType.Json,
        };

        if (!config.preparedData) {
          // Disable cache
          const cache =
            typeof config.cache !== "undefined"
              ? config.cache
              : this.defaultConfig.cache;

          if (cache === false) {
            headers["Cache-Control"] = "no-cache";
            config.params = {
              ...config.params,
              axios_timestamp: Date.now(),
            };
          }

          config.params = urlEncoded(
            clearUndefinedProperties({
              ...config.params,
              ...Api.globalParams,
            })
          );

          config.data = {
            ...config.data,
            ...Api.globalData,
          };
          clearUndefinedProperties(config.data);

          if (JSON.stringify(config.data) === "{}") {
            config.data = undefined;
          } else {
            switch (config.contentType) {
              case "formData":
                config.data = formData(config.data);
                break;
              case "urlEncoded":
                config.data = urlEncoded(config.data);
            }
          }

          config.preparedData = true;
        }

        // Add token
        const tokenType = this.getTokenType(config);
        const token = tokenType ? Api.tokenManager.getToken(tokenType) : null;
        if (token) {
          headers.Authorization = "Bearer " + token;
        }

        return {
          ...config,
          headers: new AxiosHeaders({
            ...config.headers,
            ...headers,
          } as Record<string, AxiosHeaderValue>),
        };
      },
      (error) => {
        console.log(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return this.useSuccessResponseInterceptor(response);
      },
      async (error) => {
        const result = await this.useErrorResponseInterceptor(error);
        return result instanceof Error ? Promise.reject(result) : result;
      }
    );
  }

  private async useRequestInterceptors(config: ApiRequestConfig) {
    for (const interceptor of Api.interceptors) {
      if (interceptor.request) {
        config = await interceptor.request(config);
      }
    }

    return config;
  }

  private async useErrorResponseInterceptor(error: any) {
    for (const interceptor of Api.interceptors) {
      if (interceptor.response && interceptor.response.error) {
        try {
          error = await interceptor.response.error(error, this.axiosInstance);
        } catch (err) {
          return error;
        }
      }
    }

    return error;
  }

  private async useSuccessResponseInterceptor(response: AxiosResponse) {
    for (const interceptor of Api.interceptors) {
      if (interceptor.response && interceptor.response.success) {
        response = await interceptor.response.success(response);
      }
    }

    return response;
  }
  /**
   * End setup interceptors
   */

  public request<Response = any>(config: ApiRequestConfig) {
    return this.axiosInstance.request<Response>({
      signal: Api.signal,
      ...config,
    });
  }

  public post<Response = GlobalResponse>(
    url: string,
    data: { [key: string]: any },
    config?: ApiRequestConfig
  ) {
    return this.axiosInstance.post<Response>(url, data, {
      signal: Api.signal,
      ...config,
    });
  }

  public put<Response = GlobalResponse>(
    url: string,
    data: { [key: string]: any },
    config?: ApiRequestConfig
  ) {
    return this.axiosInstance.put<Response>(url, data, {
      signal: Api.signal,
      ...config,
    });
  }

  public patch<Response = GlobalResponse>(
    url: string,
    data: { [key: string]: any },
    config?: ApiRequestConfig
  ) {
    return this.axiosInstance.patch<Response>(url, data, {
      signal: Api.signal,
      ...config,
    });
  }

  public get<Response = GlobalResponse>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ) {
    return this.axiosInstance.get<Response>(url, {
      signal: Api.signal,
      ...config,
      params: data,
    });
  }

  public delete<Response = GlobalResponse>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ) {
    return this.axiosInstance.delete<Response>(url, {
      signal: Api.signal,
      ...config,
      params: data,
    });
  }
}
