import type { i18n } from "i18next";

export default async function loadModulesLocale(i18next: i18n) {
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

  for (const moduleName in normalizedLocales) {
    if (Object.prototype.hasOwnProperty.call(normalizedLocales, moduleName)) {
      const moduleLocalesLoader = normalizedLocales[moduleName];

      const { default: moduleLocales } = await moduleLocalesLoader();
      for (const language in moduleLocales) {
        if (Object.prototype.hasOwnProperty.call(moduleLocales, language)) {
          const locale = moduleLocales[language];

          i18next.addResourceBundle(language, moduleName, locale, true, false);
        }
      }
    }
  }
}
