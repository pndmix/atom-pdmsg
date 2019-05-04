'use babel';

import { CompositeDisposable } from 'atom';
import { install } from 'atom-package-deps';
import Main from './main.js';

export default {

  subscriptions: null,
  main: null,
  isActive: false,

  config: {
    pdsendPath: {
      title: 'Pdsend path',
      description: 'Leave empty to use pdsend from the PATH.',
      type: 'string',
      default: '',
      order: 1,
    },
    portNumber: {
      title: 'Rampcode port number',
      description: 'Change the port number.',
      type: 'integer',
      default: 8080,
      order: 2,
    },
  },

  activate(state) {
    // Install dependencies
    install();

    this.main = new Main();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rampcode:toggle': () => this.toggle(),
      'atom-rampcode:evalLine': () => this.main.evalLine(),
      'atom-rampcode:evalBlock': () => this.main.evalBlock()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.main.stop();
  },

  serialize() {
    return;
  },

  toggle() {
    if (this.isActive) {
      this.main.stop();
      this.isActive = false;
    } else {
      const pdsend = atom.config.get('atom-rampcode.pdsendPath') || 'pdsend';
      const portNo = atom.config.get('atom-rampcode.portNumber');
      this.main.start(pdsend, portNo);
      this.isActive = true;
    }
  }

};
