import { MessagePanelView, PlainMessageView, PlainMessageOptions } from 'atom-message-panel';

export default class Logger {
  private panel: MessagePanelView | null;

  constructor(title?: string) {
    this.panel = new MessagePanelView({ title });
    this.panel.attach();
    this.panel.toggleAutoScroll();
  }

  log(options: PlainMessageOptions): void {
    if (this.panel === null) return;
    this.panel.add(new PlainMessageView(options));
    this.panel.updateScroll();
  }

  success(message: string): void {
    const className = 'message-success-rampcode';
    this.log({ message, className });
  }

  info(message: string): void {
    const className = 'message-info-rampcode';
    this.log({ message, className });
  }

  error(message: string): void {
    const className = 'message-error-rampcode';
    this.log({ message, className });
  }

  warning(message: string): void {
    const className = 'message-warning-rampcode';
    this.log({ message, className });
  }

  close(): void {
    if (this.panel !== null) {
      this.panel.close();
      this.panel = null;
    }
  }
}
