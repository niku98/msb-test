import ts from "typescript";

export function walkTsAst(
  node: ts.Node | ts.Node[],
  visit?: (node: ts.Node) => void,
  leave?: (node: ts.Node) => void
) {
  if (Array.isArray(node)) {
    return node.forEach((n) => {
      walkTsAst(n, visit, leave);
    });
  }

  node.forEachChild((child) => {
    visit?.(child);
    walkTsAst(child, visit, leave);
    leave?.(child);
  });
}

export function getTsSourceFile(content: string) {
  return ts.createSourceFile(
    "x.ts",
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
}
