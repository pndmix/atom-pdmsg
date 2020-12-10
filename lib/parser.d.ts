import TSParser, { SyntaxNode } from 'tree-sitter';
export default class Parser extends TSParser {
    constructor();
    static nodesByNameGen(node: SyntaxNode, nodeNames: string[]): IterableIterator<SyntaxNode>;
    static getNodesByName(node: SyntaxNode, nodeNames: string[]): SyntaxNode[];
}
//# sourceMappingURL=parser.d.ts.map