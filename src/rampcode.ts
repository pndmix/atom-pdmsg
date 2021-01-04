import Editor from './editor';
import Repl from './repl';

export default class Rampcode {
  private state = { isActive: false };
  private editor: Editor | null = null;
  private repl: Repl | null = null;

  start(): void {
    this.editor = new Editor();
    this.repl = new Repl();
    atom.notifications.addSuccess('pdmsg has started.');
  }

  stop(): void {
    this.editor = null;
    this.repl?.close();
    this.repl = null;
    atom.notifications.addSuccess('pdmsg has stopped.');
  }

  toggle(): void {
    this.state.isActive ? this.stop() : this.start();
    this.state.isActive = !this.state.isActive;
  }

  evalLine(): void {
    const message = this.editor?.getLineOfText() || '';
    this.repl?.eval(message);
  }

  evalBlock(): void {
    const message = this.editor?.getBlockOfText() || '';
    this.repl?.eval(message);
  }
}
