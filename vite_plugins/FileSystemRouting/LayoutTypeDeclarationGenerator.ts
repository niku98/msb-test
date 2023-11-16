import { mkdirSync, readdirSync, writeFileSync } from "fs";
import { debounce } from "lodash";

export interface LayoutTypeDeclarationGeneratorOptions {
  outDir: string;
  dir: string;
  isLayout?: (name: string) => boolean;
}

function genLayoutsDeclareFile(layouts: string[]) {
  const types = layouts
    .map((layout) => `"${layout.replace(".tsx", "")}"`)
    .join(" | ");
  const layoutType = `type Layout = ${types || "unknown"};\n`;
  return `declare global {
  ${layoutType}
  interface PageMeta {
    layout?: Layout;
  }
}

export {};
`;
}

const LayoutTypeDeclarationGenerator = (
  options: LayoutTypeDeclarationGeneratorOptions
) => {
  const path = process.cwd() + "/" + options.outDir;
  let currentLayoutType = "";
  function genTypeFiles() {
    const layouts = readdirSync(process.cwd() + "/" + options.dir).filter(
      (file) => file.endsWith(".tsx") && (options.isLayout?.(file) ?? true)
    );

    try {
      mkdirSync(path, { recursive: true });
    } catch (error) {
      // console.log("Dir existed");
    }

    const layoutType = genLayoutsDeclareFile(layouts);

    if (currentLayoutType === layoutType) {
      return;
    }

    currentLayoutType = layoutType;
    writeFileSync(path + "/layouts.d.ts", layoutType);
  }

  const debouncedGenTypeFiles = debounce(genTypeFiles, 2000);
  return {
    name: "ReactJsCoreLayoutTypeDeclarationGenerator",
    buildStart() {
      genTypeFiles();
    },

    transform(code, id) {
      debouncedGenTypeFiles();
      return {
        code,
        id,
      };
    },
    buildEnd() {
      genTypeFiles();
    },
  };
};

export default LayoutTypeDeclarationGenerator;
