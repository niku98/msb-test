import { InitOptions, type i18n } from "i18next";
import createI18n from "src/modules/core/localization/utils/createI18n";
import loadModulesLocale from "src/modules/core/localization/utils/loadModulesLocale";

export interface LocaleProviderProps {
  children?: React.ReactNode;
  options?: InitOptions;
  onInstanceCreated?: (i18n: i18n) => void;
  onLocaleLoaded?: (i18n: i18n) => void;
}

export default function LocaleProvider({
  children,
  options,
  onInstanceCreated,
  onLocaleLoaded,
}: LocaleProviderProps) {
  const [loaded, setLoaded] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  useMount(() => {
    const i18n = createI18n(options);
    onInstanceCreated?.(i18n);

    startLoading();
    loadModulesLocale(i18n).then(() => {
      setLoaded(true);
      onLocaleLoaded?.(i18n);
      stopLoading();
    });
  });

  return <>{loaded ? children : null}</>;
}
