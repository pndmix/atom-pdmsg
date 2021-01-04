import { MessagePanelView, PlainMessageView, PlainMessageOptions } from 'atom-message-panel';

export default class Logger {
  private panel: MessagePanelView | null;

  constructor(title?: string) {
    this.panel = new MessagePanelView({ title });
    this.panel.attach();
    this.panel.toggle();
  }

  log(options: PlainMessageOptions): void {
    this.panel?.clear();
    this.panel?.add(new PlainMessageView(options));
  }

  success(message: string): void {
    const className = 'message-success-pdmsg';
    this.log({ message, className });
  }

  info(message: string): void {
    const className = 'message-info-pdmsg';
    this.log({ message, className });
  }

  error(message: string): void {
    const className = 'message-error-pdmsg';
    this.log({ message, className });
  }

  warning(message: string): void {
    const className = 'message-warning-pdmsg';
    this.log({ message, className });
  }

  close(): void {
    this.panel?.close();
    this.panel = null;
  }
}
