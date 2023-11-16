import { exec } from "child_process";
import { Plugin } from "vite";

export default function TypescriptChecker(): Plugin {
  return {
    name: "reactjs-core-typescript-checker",
    enforce: "pre",
    apply: "build",
    buildStart() {
      return new Promise((resolve, reject) => {
        const tsc = exec("yarn tsc");

        tsc.stdout.on("data", console.log);
        tsc.stderr.on("data", (output) => {
          console.error(output);
          reject(new Error("Typescript error."));
        });
        tsc.on("close", () => {
          resolve();
        });
      });
    },
  };
}
