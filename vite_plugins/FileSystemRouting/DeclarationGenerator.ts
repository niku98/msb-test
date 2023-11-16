import { mkdirSync, readdirSync, statSync, writeFileSync } from "fs";
import { camelCase, debounce, kebabCase, set } from "lodash";
import { resolve } from "path";
import type { Plugin } from "vite";

interface Options {
  outDir: string;
  dir: string;
}

interface RoutesInfo {
  paths: Record<string, any>;
}

export default function FileSystemRoutingDeclarationGenerator(
  options: Options
): Plugin {
  const path = process.cwd() + "/" + options.outDir;
  const workPath = process.cwd() + "/" + options.dir;
  let currentDts = "";
  function genTypeFiles() {
    const paths = readDirRecursive(workPath).filter((path) => {
      return /(.*?)\/pages\/(.*?)\.tsx/.test(path);
    });

    const routesInfo = parsePathToRouteInfo(paths);

    try {
      mkdirSync(path, { recursive: true });
    } catch (error) {
      // console.log("Dir existed");
    }

    const dts = genRoutesDeclareFile(routesInfo);

    if (currentDts === dts) {
      return;
    }

    currentDts = dts;

    writeFileSync(path + "/routes.d.ts", dts);
  }

  const debouncedGenTypeFiles = debounce(genTypeFiles, 1000);

  return {
    name: "ReactJsCoreFileSystemRouting_DeclarationGenerator",
    enforce: "post",
    buildStart() {
      genTypeFiles();
    },
    buildEnd() {
      genTypeFiles();
    },
    transform() {
      debouncedGenTypeFiles();
    },
    async handleHotUpdate({ file, modules }) {
      if (/(.*?)\/pages\/(.*?)\.tsx/.test(file)) {
        genTypeFiles();
      }

      return modules;
    },
  };
}

function genRoutesDeclareFile(routesInfo: RoutesInfo) {
  const routePaths = JSON.stringify(routesInfo.paths, undefined, 2)
    .replace(/"(.*?)":/g, "$1:")
    .replace(/},/g, "};")
    .replace(/"\n/g, '";\n')
    .replace(/}^[;]\n/g, "};\n")
    .replace(/,\n/g, ";\n");

  const routePathsType = `interface RoutePaths` + ` ${routePaths}\n`;
  return `${routePathsType}\n`;
}

function readDirRecursive(inputPath: string, prefix = "") {
  const paths = readdirSync(inputPath);
  return paths.reduce<string[]>((result, path) => {
    result.push(prefix + path);
    const joinedPath = resolve(inputPath, path);
    if (statSync(joinedPath).isDirectory()) {
      result.push(...readDirRecursive(joinedPath, prefix + path + "/"));
    }
    return result;
  }, []);
}

function parsePathToRouteInfo(paths: string[]) {
  return paths
    .sort((a, b) => a.length - b.length)
    .reduce<RoutesInfo>(
      (result, path) => {
        const routeStrings = path
          .replace(/(.*?)\/pages/, "$1")
          .replace(".tsx", "")
          .split("/");

        const routeName = routeStrings
          .map((str) => pascalCase(str.split("_").shift() as string))
          .join(".");
        const routePath = (
          "/" +
          routeStrings
            .map((str) => {
              const path = str.split("_").pop() as string;
              if (/^\[(.*?)\]$/g.test(str)) {
                return path
                  .replace(/\[\.\.\.(.*?)\]/g, "*")
                  .replace(/\[(.*?)\]/g, ":$1");
              }

              return kebabCase(path);
            })
            .join("/")
        ).replace(/\/index/g, "");

        set(result.paths, routeName, routePath.length === 0 ? "/" : routePath);

        return result;
      },
      {
        paths: {},
      }
    );
}

export const pascalCase = (str: string) => {
  const out = camelCase(str);

  return out[0].toUpperCase() + out.slice(1);
};
