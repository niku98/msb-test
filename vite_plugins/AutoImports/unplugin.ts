import { isDynamicPattern } from "fast-glob";
import { isMatch } from "micromatch";
import { createUnplugin } from "unplugin";
import { createContext } from "./ctx";
import type { Options } from "./types";

export default createUnplugin<Options>((options) => {
  let ctx = createContext(options);
  return [
    {
      name: "reactjs-core-unplugin-auto-import-write-config-files",
      enforce: "pre",
      vite: {
        apply: "build",
        async config() {
          await ctx.scanDirs();
          await ctx.writeConfigFiles();
        },
      },
    },
    {
      name: "reactjs-core-unplugin-auto-import",
      enforce: "post",
      transformInclude(id) {
        return ctx.filter(id);
      },
      async transform(code, id) {
        return ctx.transform(code, id);
      },
      async buildStart() {
        await ctx.scanDirs();
      },
      async buildEnd() {
        await ctx.writeConfigFiles();
      },
      vite: {
        async handleHotUpdate({ file }) {
          if (
            ctx.dirs?.some((dir) => {
              if (isDynamicPattern(dir)) {
                return isMatch(file, dir);
              }

              return file.startsWith(dir);
            })
          )
            await ctx.scanDirs();
        },
        async configResolved(config) {
          if (ctx.root !== config.root) {
            ctx = createContext(options, config.root);
            await ctx.scanDirs();
          }
        },
      },
    },
  ];
});
