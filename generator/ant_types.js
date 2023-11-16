import fs from "fs";
import _ from "lodash-es";

const types = fs.readFileSync("node_modules/antd/es/index.d.ts", {
  encoding: "utf-8",
});

const componentMatches = types.matchAll(/export { (.*?) }/g);
const components = _.flatten(
  Array.from(componentMatches).map((m) =>
    m[1].replace("default as ", "").replaceAll(",", "").split(" ")
  )
);
components.pop();

const preset = components.map((component) => [component, `Ant${component}`]);

const presetContent = `import type { ImportsMap } from "../types";

export default <ImportsMap>{
  "antd": ${JSON.stringify(preset)}
};

`;

fs.writeFileSync("./vite_plugins/AutoImports/presets/antd.ts", presetContent);
