'use babel';

import repl from './repl.js';
import Pdsend from './pdsend.js';

export default class Main {

  constructor() {
    this.pdsend = null;
  }

  start(pdsend, portNo) {
    this.pdsend = new Pdsend(pdsend, portNo);
    document.body.classList.add('rampcode');
    atom.notifications.addSuccess('Rampcode has started.');
  }

  stop() {
    this.pdsend.kill();
    document.body.classList.remove('rampcode');
    atom.notifications.addSuccess('Rampcode has stopped.');
  }

  evalCode(code) {
    this.pdsend.write(repl(code));
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

  stopSound() {
    const code = '0;';
    this.evalCode(code);
  }
}
