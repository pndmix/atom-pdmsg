import TSParser, { SyntaxNode } from 'tree-sitter';

export default class Parser extends TSParser {
  constructor() {
    super();
  }

  static *nodesByNameGen(node: SyntaxNode, nodeNames: string[]): IterableIterator<SyntaxNode> {
    for (const namedChildNode of node.namedChildren) {
      const nodeName = namedChildNode.type;
      nodeNames.includes(nodeName)
        ? yield namedChildNode
        : yield* this.nodesByNameGen(namedChildNode, nodeNames);
    }
  }

  static getNodesByName(node: SyntaxNode, nodeNames: string[]): SyntaxNode[] {
    return [...Parser.nodesByNameGen(node, nodeNames)];
  }
}
