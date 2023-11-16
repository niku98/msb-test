import type { i18n } from "i18next";

export default function createLocaleRouteLoader(i18next: i18n) {
  const locales = import.meta.glob<{ default: Record<string, any> }>(
    "/src/modules/*/locales/index.ts",
    {
      eager: false,
    }
  );

  const normalizedLocales = _mapKeys(locales, (_, key) => {
    return _snakeCase(
      key.replace(/\/src\/modules\/(.*?)\/locales\/index\.ts/g, "$1")
    );
  });

  const loader: AppRouteLoaderFunction = async (_, route) => {
    const moduleName = _snakeCase(route?.path?.split("/")[1]);

    const moduleLocalesLoader =
      moduleName in normalizedLocales
        ? normalizedLocales[moduleName]
        : undefined;

    if (moduleLocalesLoader) {
      const { default: moduleLocales } = await moduleLocalesLoader();
      for (const language in moduleLocales) {
        if (Object.prototype.hasOwnProperty.call(moduleLocales, language)) {
          const locale = moduleLocales[language];

          i18next.addResourceBundle(language, moduleName, locale, true, false);
        }
      }
    }
  };

  return loader;
}
