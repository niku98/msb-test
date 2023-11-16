import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./__test__/test.setup.ts",
      exclude: [
        "node_modules",
        "dist",
        ".idea",
        ".git",
        ".vscode",
        ".cache",
        "./src/core",
      ],
      coverage: {
        exclude: ["src/core"],
      },
    },
  })
);
