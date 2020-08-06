declare module 'atom-message-panel' {
  export class MessagePanelView {
    public constructor(options: { title?: string });
    public attach(): void;
    public toggle(): void;
    public toggleAutoScroll(): void;
    public updateScroll(): void;
    public add(view: PlainMessageView): void;
    public close(): void;
  }

  export type PlainMessageOptions = {
    message: string;
    raw?: boolean;
    className?: string;
  };

  export class PlainMessageView {
    public constructor(options: PlainMessageOptions);
  }
}
