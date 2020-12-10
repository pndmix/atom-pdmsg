import Editor from './editor';
import Repl from './repl';

export default class Rampcode {
  private state = { isActive: false };
  private editor: Editor | null = null;
  private repl: Repl | null = null;
  // private pdsends: Map<string, Pdsend> | null = null;

  start(): void {
    this.editor = new Editor();
    this.repl = new Repl();
    // this.pdsends = new Map();
    atom.notifications.addSuccess('pdmsg has started.');
  }

  stop(): void {
    this.editor = null;
    this.repl?.close();
    this.repl = null;
    // this.pdsends?.forEach((pdsend) => pdsend.kill());
    // this.pdsends?.clear();
    // this.pdsends = null;
    atom.notifications.addSuccess('pdmsg has stopped.');
  }

  toggle(): void {
    this.state.isActive ? this.stop() : this.start();
    this.state.isActive = !this.state.isActive;
  }

  // private getPdsendConnection(name: string): Pdsend | undefined {
  //   const pdsend = this.pdsends!.get(name);
  //   if (pdsend?.hasProcess()) return pdsend;
  //   this.pdsends!.delete(name);
  //   return;
  // }

  // private eval(message: string): void {
  //   if (!this.state.isActive) return;
  //
  //   let pdsend = this.getPdsendConnection('8080');
  //   if (!pdsend) {
  //     pdsend = new Pdsend();
  //     this.pdsends!.set(pdsend.name, pdsend);
  //   }
  //
  //   pdsend.write(message);
  // }

  evalLine(): void {
    const message = this.editor?.getLineOfText() || '';
    this.repl?.eval(message);
  }

  evalBlock(): void {
    const message = this.editor?.getBlockOfText() || '';
    this.repl?.eval(message);
  }
}
