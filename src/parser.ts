import TSParser, { SyntaxNode } from 'tree-sitter';

type Statement = {
  name: string;
  expression: string;
};

export default class Parser extends TSParser {
  constructor() {
    super();
  }

  static *getNodesByName(node: SyntaxNode, nodeNames: string[]): IterableIterator<SyntaxNode> {
    for (const namedChildNode of node.namedChildren) {
      const nodeName = namedChildNode.type;
      nodeNames.includes(nodeName)
        ? yield namedChildNode
        : yield* this.getNodesByName(namedChildNode, nodeNames);
    }
  }

  static getStatements(node: SyntaxNode): Statement[] {
    const statements: Statement[] = [];
    for (const namedChildNode of node.namedChildren) {
      const name = namedChildNode.type;
      const expression = namedChildNode.text;
      if (name !== 'comment') statements.push({ name, expression });
    }
    return statements;
  }
}
