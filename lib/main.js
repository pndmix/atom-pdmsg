'use babel';

import repl from './repl.js';
import { spawn } from 'child_process';
import { MessagePanelView, PlainMessageView } from 'atom-message-panel';

const PORT = 3005;

export default class Main {

  constructor() {
    this.pdsend = null;
    this.messages = null;
  }

  setupPdsend(pdsend) {
    this.pdsend = spawn(pdsend, [PORT]);

    this.pdsend.stdout.on('data', (data) => {
      atom.notifications.addInfo('pdsend stdout.', {
        detail: data,
      });
    });

    this.pdsend.stderr.on('data', (data) => {
      atom.notifications.addError('pdsend stderr.', {
        detail: data,
      });
    });

    this.pdsend.stdin.on('close', () => {
      this.stop();
    });

    this.pdsend.on('close', (code) => {
			if (code) {
				atom.notifications.addError(`Rampcode process exited with code ${code}.`);
			} else {
				atom.notifications.addSuccess('Rampcode has stopped.');
			}
      this.pdsend = null;
      this.messages = null;
		});
  }

  setupMessages() {
    this.messages = new MessagePanelView({
      title: 'Rampcode'
    });
    this.messages.attach();
    this.messages.toggle();
  }

  start(pdsend) {
    this.setupPdsend(pdsend);
    this.setupMessages();
    document.body.classList.add('rampcode');
		atom.notifications.addSuccess('Rampcode has started.');
  }

  stop() {
    this.pdsend.kill();
    this.messages.close();
    document.body.classList.remove('rampcode');
  }

  logMessage(message) {
    this.messages.clear();
    this.messages.add(new PlainMessageView({
      message: message
    }));
  }

  evalCode(code) {
    const stdin = this.pdsend.stdin;
    stdin.write(repl(code) + '\n\n');
    this.logMessage(code);
  }

  evalRange(range) {
		const editor = atom.workspace.getActiveTextEditor();
		const buffer = editor.getBuffer();

		const marker = editor.markBufferRange(range);
		editor.decorateMarker(marker, {
			type: 'line',
			class: 'evalFlash',
		});
		setTimeout(() => {
			marker.destroy();
		}, 200);

		const code = buffer.getTextInRange(range);
		this.evalCode(code);
	}

  evalRanges(ranges) {
		return ranges.forEach(range => this.evalRange(range));
	}

  evalLine() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const buffer = editor.getBuffer();
    const positions = editor.getCursorBufferPositions();
    const ranges = positions.map(position => {
      const row = position.row;
      return buffer.rangeForRow(row, true);
    });
		return this.evalRanges(ranges);
  }

  evalBlock() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const buffer = editor.getBuffer();
    const lines = buffer.getLines();
    const selectedRanges = editor.getSelectedBufferRanges();
    const ranges = selectedRanges.map(selectedRange => {
      if (!selectedRange.isEmpty()) return selectedRange;

      const row = selectedRange.start.row;

      let rowBefore = row;
      while (rowBefore >= 0 && lines[rowBefore] !== '') {
        --rowBefore;
      }

      let rowAfter = row;
      while (rowAfter < lines.length && lines[rowAfter] !== '') {
        ++rowAfter;
      }

      const range = [[rowBefore + 1, 0], [rowAfter, 0]];
      return buffer.clipRange(range);
    });

    return this.evalRanges(ranges);
  }
}
