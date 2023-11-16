import fs from "fs";
import _ from "lodash-es";

const nameRegex = /^([a-z])([a-zA-Z0-9]+)$/g;

const types = fs.readFileSync("node_modules/rxjs/dist/types/index.d.ts", {
  encoding: "utf-8",
});

const operatorMatches = types.matchAll(/export { (.*?) }/g);
const operators = _.flatten(
  Array.from(operatorMatches).map((m) =>
    m[1].replace("default as ", "").replaceAll(",", "").split(" ")
  )
).filter((operator) => nameRegex.test(operator));

const preset = operators.map((helper) => [helper, _.camelCase(`rx_${helper}`)]);

const presetContent = `import type { ImportsMap } from "../types";

export default <ImportsMap>{
  "rxjs": ${JSON.stringify(preset)}
};

`;

fs.writeFileSync("./vite_plugins/AutoImports/presets/rxjs.ts", presetContent);
