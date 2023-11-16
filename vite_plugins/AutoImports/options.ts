import { Options } from "./types";

const autoImportsOptions: Options = {
  include: [/\.[jt]sx?$/, /\.[jt]sx\?pageMeta/],
  dts: "auto-types/auto-imports.d.ts",
  dirs: [
    "./src/assets",

    "./src/modules/common/**/!(stories)/*.tsx",
    "./src/modules/common/utilities/**/*",
    "./src/modules/common/hooks/**/*",
    "./src/modules/common/providers/**/*",

    "./src/modules/core/components/**/*",
    "./src/modules/core/utilities/*",
    "./src/modules/core/hooks/*",
    "./src/modules/core/providers",
    "./src/modules/core/loading",
    "./src/modules/core/api",
    "./src/modules/core/repository/*",
    "./src/modules/core/router/**/*",
    "./src/modules/core/localization/**/*",
    "./src/modules/core/auth/**/*",
    "./src/modules/core/app/**/*",
    "./src/modules/core/query/**/*",
  ],
  imports: ["react", "react-router-dom", "react-i18next", "lodash-es", "rxjs"],
  defaultExportByFilename: true,
  eslintrc: {
    enabled: true,
    filepath: "./eslintrc/.eslintrc-auto-import.json",
  },
};

export default autoImportsOptions;
