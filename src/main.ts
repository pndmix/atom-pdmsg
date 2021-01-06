import { CompositeDisposable } from 'atom';
import App from './app';

let app: App | null = null;
let subscriptions: CompositeDisposable | null = null;

module.exports = {
  config: {
    pdsendPath: {
      title: 'Pdsend path',
      description: 'Leave empty to use pdsend from the PATH.',
      type: 'string',
      default: '',
      order: 1,
    },
    port: {
      title: 'Port number',
      description: '',
      type: 'integer',
      default: 3005,
      order: 2,
    },
  },

  activate(): void {
    app = new App();
    subscriptions = new CompositeDisposable();
    subscriptions.add(
      atom.commands.add('atom-workspace', {
        'pdmsg:toggle': () => app!.toggle(),
        'pdmsg:evalLine': () => app!.evalLine(),
        'pdmsg:evalBlock': () => app!.evalBlock(),
      })
    );
  },

  serialize(): void {
    return;
  },

  deactivate(): void {
    app?.stop();
    subscriptions?.dispose();

    app = null;
    subscriptions = null;
  },
};
