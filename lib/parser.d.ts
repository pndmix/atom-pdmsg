import TSParser, { SyntaxNode } from 'tree-sitter';
declare type Statement = {
    name: string;
    expression: string;
};
export default class Parser extends TSParser {
    constructor();
    static getNodesByName(node: SyntaxNode, nodeNames: string[]): IterableIterator<SyntaxNode>;
    static getStatements(node: SyntaxNode): Statement[];
}
export {};
//# sourceMappingURL=parser.d.ts.map