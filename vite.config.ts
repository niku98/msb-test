import EnvCaster from "@niku/vite-env-caster";
import react from "@vitejs/plugin-react";
import { camelCase } from "lodash";
import path from "path";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import { createHtmlPlugin } from "vite-plugin-html";
import AutoImports from "./vite_plugins/AutoImports";
import FileSystemRouting from "./vite_plugins/FileSystemRouting";
import TypescriptChecker from "./vite_plugins/TypescriptChecker";

export default defineConfig({
  build: {
    target: "modules",
  },
  plugins: [
    react(),
    createHtmlPlugin(),
    AutoImports,
    FileSystemRouting({
      dir: "src/modules",
      declarationOutDir: "auto-types",
      layout: {
        dir: "src/layouts",
        isLayout(name) {
          return !name.endsWith("Element.tsx");
        },
      },
    }),
    EnvCaster({
      declaration: "auto-types/env.d.ts",
      transformKey(plainKey) {
        return camelCase(plainKey.replace("VITE_", ""));
      },
    }),
    TypescriptChecker(),
    eslintPlugin({
      cache: false,
      fix: true,
      exclude: ["/virtual:/**", "node_modules/**"],
    }),
  ],
  resolve: {
    alias: [
      { find: "src", replacement: path.resolve(__dirname, "src") },
      { find: "templates", replacement: path.resolve(__dirname, "templates") },
    ],
  },
});
