import * as ts from "typescript";
import { getMagicString } from "unimport";
import { getTsSourceFile, walkTsAst } from "../utils/typescript";

const IDENTIFIERS_WHITE_LIST = [
  "_jsxDEV",
  "jsxDEV",
  "_jsxFileName",
  "_jsx",
  "jsx",
];

const DEFINE_PAGE_META_MACRO = "definePageMeta";

type CallExpressionInfo = {
  callExpression: ts.CallExpression;
  identifier: ts.Identifier;
  args: ts.NodeArray<ts.Expression>;
};

export function transformDefinePageMetaMacro(content: string) {
  const definePageMetaExpressionInfo = getDefinePageMetaNode(content);

  if (!definePageMetaExpressionInfo) {
    return undefined;
  }
  const { callExpression, args } = definePageMetaExpressionInfo;
  const firstArg = args[0];
  const lastArg = args[arguments.length - 1];
  const magicString = getMagicString(content);

  const argsString = magicString.snip(firstArg.pos, lastArg.end).toString();
  magicString.overwrite(
    callExpression.pos,
    callExpression.end,
    `export const pageMeta = ${argsString};\n`
  );

  return magicString.toString();
}

export function transformDefinePageMetaMacroWithImportsOnly(
  content: string,
  id: string
) {
  const definePageMetaExpressionInfo = getDefinePageMetaNode(content);

  if (!definePageMetaExpressionInfo) {
    return "export const pageMeta = {};";
  }

  const { args } = definePageMetaExpressionInfo;

  const scopes = getMainScopes(getTsSourceFile(content));

  const argsIdentifiers = getArgumentsIdentifiers(args, [
    ...scopes.imports,
    ...scopes.variables,
  ]);

  if (
    argsIdentifiers.some((identifier) =>
      identifier.startsWith("_jsx")
        ? false
        : scopes.variables.includes(identifier)
    )
  ) {
    throw new Error(
      `"${DEFINE_PAGE_META_MACRO}" only can use variables from import. But, you are using variables from main scope.\nFile: ${id}`
    );
  }

  const magicString = getMagicString(content);

  const imports = getFilteredImportsString(content, argsIdentifiers);

  const firstArg = args[0];
  const lastArg = args[args.length - 1];

  const argsString = magicString.snip(firstArg.pos, lastArg.end).toString();
  return `${imports}\nexport const pageMeta = ${argsString}`;
}

export function getDefinePageMetaArgsString(content: string) {
  const definePageMetaExpressionInfo = getDefinePageMetaNode(content);

  if (!definePageMetaExpressionInfo) {
    return "";
  }

  const { args } = definePageMetaExpressionInfo;

  const magicString = getMagicString(content);

  const firstArg = args[0];
  const lastArg = args[args.length - 1];

  const argsString = magicString.snip(firstArg.pos, lastArg.end).toString();

  return argsString;
}

export function getDefinePageMetaNode(content: string) {
  const sourceFile = getTsSourceFile(content);
  let result: CallExpressionInfo | undefined;

  walkTsAst(sourceFile, (node) => {
    if (ts.isCallExpression(node)) {
      const identifier = node.expression;
      if (ts.isIdentifier(identifier)) {
        if (identifier.escapedText === DEFINE_PAGE_META_MACRO) {
          result = {
            callExpression: node,
            identifier,
            args: node.arguments,
          };
        }
      }
    }
  });

  return result;
}

export function getFilteredMainVariableDeclarationNodes(
  content: string,
  args: string[]
) {
  const source = getTsSourceFile(content);
  const nodes: ts.Node[] = [];
  source.forEachChild((node) => {
    if (ts.isVariableStatement(node)) {
      nodes.push(node);
    } else if (ts.isFunctionDeclaration(node)) {
      nodes.push(node);
    }
  });

  return nodes.filter((node) => {
    if (ts.isVariableStatement(node)) {
      const identifiers = getVariableIdentifiers(node);
      return args.some((arg) => identifiers.includes(arg));
    } else if (ts.isFunctionDeclaration(node)) {
      return args.includes(node.name.getText());
    }

    return false;
  });
}

export function getFilteredImportsString(content: string, names: string[]) {
  const imports = getImportNodes(content);
  const importStrings = imports.map((node) => node.getFullText()).join("");

  const s = getMagicString(importStrings);
  const importSourceLength: Record<string, number> = {};
  const removed: string[] = [];
  const removedImportIndex: number[] = [];

  walkTsAst(getTsSourceFile(importStrings), (node) => {
    if (ts.isImportClause(node)) {
      const identifiers = node.name
        ? [node.name]
        : getIdentifierNodes(node.namedBindings);
      const importDeclaration = node.parent;
      const importSourceName = importDeclaration.getText();
      importSourceLength[importSourceName] = identifiers.length;

      identifiers.forEach((identifier, index) => {
        if (IDENTIFIERS_WHITE_LIST.includes(identifier.getText())) {
          return;
        }

        if (
          !names.includes(identifier.getText()) &&
          !removed.includes(identifier.getText())
        ) {
          removed.push(identifier.getText());
          importSourceLength[importSourceName]--;

          identifier.pos &&
            identifier.end &&
            s.remove(
              identifier.pos,
              identifier.end + (index !== identifiers.length - 1 ? 1 : 0)
            );

          if (importSourceLength[importSourceName] === 0) {
            s.remove(importDeclaration.pos, importDeclaration.end);
          }
        }
      });
    }
  });

  imports.forEach((_, index) => {
    if (removedImportIndex.includes(index)) {
      imports.splice(index, 1);
    }
  });

  return s.toString();
}

function getImportNodes(content) {
  const sourceFile = getTsSourceFile(content);
  const imports: ts.ImportDeclaration[] = [];
  sourceFile.forEachChild((node) => {
    if (ts.isImportDeclaration(node)) {
      imports.push(node);
    }
  });

  return imports;
}

function getArgumentsIdentifiers(
  args: ts.NodeArray<ts.Expression>,
  scopes: string[] = []
): string[] {
  const identifiers: string[] = [];

  args.forEach((node) => {
    walkTsAst(node, (n) => {
      if (ts.isIdentifier(n)) {
        const identifier = String(n.escapedText);
        if (!identifiers.includes(identifier) && scopes.includes(identifier)) {
          identifiers.push(identifier);
        }
      }
    });
  });

  return identifiers;
}

function getMainScopes(source: ts.SourceFile) {
  const scopes: {
    imports: string[];
    variables: string[];
  } = {
    imports: [],
    variables: [],
  };

  source.forEachChild((node) => {
    if (ts.isImportDeclaration(node)) {
      node.importClause &&
        scopes.imports.push(...getIdentifiers(node.importClause));
    } else if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach((declaration) => {
        if (ts.isIdentifier(declaration.name)) {
          scopes.variables.push(String(declaration.name.escapedText));
        } else {
          scopes.variables.push(...getIdentifiers(declaration.name));
        }
      });
    } else if (ts.isFunctionDeclaration(node)) {
      scopes.variables.push(String(node.name.escapedText));
    }
  });

  return scopes;
}

function getVariableIdentifiers(node: ts.VariableStatement) {
  const identifiers: string[] = [];

  node.declarationList.declarations.forEach((declaration) => {
    if (ts.isIdentifier(declaration.name)) {
      identifiers.push(declaration.name.getText());
    } else {
      identifiers.push(...getIdentifiers(declaration.name));
    }
  });

  return identifiers;
}

function getIdentifiers(node: ts.Node) {
  return getIdentifierNodes(node).map((n) => n.getText());
}

function getIdentifierNodes(node: ts.Node) {
  const result: ts.Identifier[] = [];

  walkTsAst(node, (child) => {
    if (ts.isIdentifier(child)) {
      result.push(child);
    }
  });

  return result;
}
