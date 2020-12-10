import Logger from './logger';
import Parser from './parser';
import { SyntaxNode } from 'tree-sitter';

type PdMessage = {
  port: number;
  host?: string;
  expressions: string[][];
};

const DEFAULT_MESSAGE: PdMessage = {
  port: 8080,
  host: 'localhost',
  expressions: [],
};

export default class Repl {
  private logger: Logger | null = null;
  private parser: Parser | null = null;

  constructor() {
    this.logger = new Logger();
    this.parser = new Parser();
    this.parser.setLanguage(require('tree-sitter-pdmsg'));
  }

  private getStatementNodes(message: string): SyntaxNode[] {
    const tree = this.parser!.parse(message);
    const nodes: SyntaxNode[] = [];
    for (const namedChildNode of tree.rootNode.namedChildren) {
      if (namedChildNode.type !== 'comment') nodes.push(namedChildNode);
    }
    return nodes;
  }

  private parseStatementNode(node: SyntaxNode): PdMessage {
    const pdMessage: PdMessage = { ...DEFAULT_MESSAGE };
    pdMessage.expressions = [];

    const parseConnect = (node: SyntaxNode): [number, string | undefined] => {
      const [port, host] = Parser.getNodesByName(node, ['port', 'host']).map((v) => v.text);
      return [Number(port), host];
    };

    const parseMessage = (node: SyntaxNode): string[] => {
      return Parser.getNodesByName(node, ['expression']).map((v) => v.text);
    };

    for (const namedChildNode of node.namedChildren) {
      switch (namedChildNode.type) {
        case 'connect':
          const [port, host] = parseConnect(namedChildNode);
          pdMessage.port = port;
          if (typeof host !== 'undefined') pdMessage.host = host;
          break;
        case 'message':
          const expressions = parseMessage(namedChildNode);
          pdMessage.expressions.push(expressions);
          break;
        default:
          break;
      }
    }

    return pdMessage;
  }

  eval(message: string): void {
    const statements = this.getStatementNodes(message);
    for (const statement of statements) {
      const pdMessage = this.parseStatementNode(statement);
      console.log(pdMessage);
    }

    this.logger?.success(message);
  }

  close(): void {
    this.logger?.close();
    this.logger = null;
    this.parser = null;
  }
}
