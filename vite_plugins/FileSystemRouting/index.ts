import { Plugin } from "vite";
import FileSystemRoutingDeclarationGenerator from "./DeclarationGenerator";
import DefinePageMetaMacro from "./DefinePageMetaMacro";
import LayoutTypeDeclarationGenerator, {
  LayoutTypeDeclarationGeneratorOptions,
} from "./LayoutTypeDeclarationGenerator";

export interface FileSystemRoutingOptions {
  dir: string;
  declarationOutDir: string;
  layout: Omit<LayoutTypeDeclarationGeneratorOptions, "outDir"> & {
    outDir?: string;
  };
}

export default function FileSystemRouting({
  dir,
  layout,
  declarationOutDir,
}: FileSystemRoutingOptions): Plugin[] {
  return [
    ...DefinePageMetaMacro(),
    FileSystemRoutingDeclarationGenerator({
      dir,
      outDir: declarationOutDir,
    }),
    LayoutTypeDeclarationGenerator({
      ...layout,
      outDir: layout.outDir ?? declarationOutDir,
    }),
  ];
}
