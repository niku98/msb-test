import fs from "fs";
import process from "process";

const helperFunctions = fs
  .readdirSync(process.cwd() + "/node_modules/@types/lodash-es")
  .filter(
    (file) =>
      file !== "index.d.ts" &&
      file.endsWith("d.ts") &&
      !file.includes(".default") &&
      !file.includes("object") &&
      !file.includes("function")
  )
  .map((name) => name.replace(".d.ts", ""));

const preset = helperFunctions.map((helper) => [helper, `_${helper}`]);

const presetContent = `import type { ImportsMap } from "../types";

export default <ImportsMap>{
  "lodash-es": ${JSON.stringify(preset)}
};

`;

fs.writeFileSync("./vite_plugins/AutoImports/presets/lodash.ts", presetContent);
