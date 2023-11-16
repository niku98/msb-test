import { ModuleNode, Plugin } from "vite";
import {
  getDefinePageMetaArgsString,
  transformDefinePageMetaMacro,
  transformDefinePageMetaMacroWithImportsOnly,
} from "./definePageMetaUtils";

const DefinePageMetaMacro = (): Plugin[] => {
  // Route meta args
  const routesMeta: Record<string, string> = {};

  return [
    {
      name: "ReactJsCoreFileSystemRouting_DefinePageMetaMacro",
      enforce: "pre",
      transform(inputCode, id) {
        if (!id.includes(".tsx") || id.endsWith("pageMeta")) {
          return;
        }
        const code = transformDefinePageMetaMacro(inputCode);

        if (code) {
          return {
            code,
            id,
          };
        }
      },
    },
    {
      name: "ReactJsCoreFileSystemRouting_DefinePageMetaExportOnly",
      enforce: "post",

      transform(code, id) {
        if (/\.tsx\?pageMeta/.test(id)) {
          const [path] = id.split("?", 2);
          const result = transformDefinePageMetaMacroWithImportsOnly(
            code,
            path
          );

          return result;
        }
      },

      async handleHotUpdate({ file, modules, server, read }) {
        if (/(.*?)\/pages\/(.*?)\.tsx/.test(file)) {
          const content = await read();

          const args = getDefinePageMetaArgsString(content);

          if (routesMeta[file] !== args) {
            routesMeta[file] = args;
            const { moduleGraph } = server;
            const modules = moduleGraph.getModulesByFile(file);

            const seen = new Set<ModuleNode>();
            modules.forEach((module) => {
              moduleGraph.invalidateModule(module, seen);
            });
          }
        }

        return modules;
      },
    },
  ];
};

export default DefinePageMetaMacro;
