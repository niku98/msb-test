import { Dispatch, SetStateAction } from "react";

interface UseAppConfigObjectResult {
  changeConfig<Key extends AppConfigPath>(
    key: Key,
    value: ObjectPropertyType<AppStoreState, Key>
  ): void;

  config: AppConfig;
}

type UseAppConfigResult<ConfigPath extends AppConfigPath | undefined> =
  ConfigPath extends string
    ? [
        ObjectPropertyType<AppConfig, ConfigPath>,
        Dispatch<SetStateAction<ObjectPropertyType<AppConfig, ConfigPath>>>
      ]
    : UseAppConfigObjectResult;

export default function useAppConfig<
  ConfigPath extends AppConfigPath | undefined = undefined
>(path?: ConfigPath | AppConfigPath): UseAppConfigResult<ConfigPath> {
  const { config: appConfig, changeConfig } = useApp();
  return useMemo<UseAppConfigResult<ConfigPath>>(() => {
    if (!path) {
      return { config: appConfig, changeConfig };
    }

    const config = _get(appConfig, path);
    return [
      config,
      (arg: any) => {
        if (typeof arg === "function") {
          changeConfig(path as never, arg(config) as never);
        } else {
          changeConfig(path, arg as never);
        }
      },
    ] as any;
  }, [path ? _get(appConfig, path) : appConfig]);
}
