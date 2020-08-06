"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Editor {
    static getTextInRange(editor, range) {
        const marker = editor.markBufferRange(range);
        editor.decorateMarker(marker, {
            type: 'highlight',
            class: 'eval-flash-rampcode',
        });
        setTimeout(() => marker.destroy(), 200);
        const buffer = editor.getBuffer();
        return buffer.getTextInRange(range);
    }
    static getLineOfText() {
        const editor = atom.workspace.getActiveTextEditor();
        if (editor === undefined)
            return '';
        const selectedRange = editor.getSelectedBufferRange();
        if (!selectedRange.isEmpty())
            return this.getTextInRange(editor, selectedRange);
        const buffer = editor.getBuffer();
        const range = buffer.rangeForRow(selectedRange.start.row, true);
        return this.getTextInRange(editor, range);
    }
    static getBlockOfText() {
        const editor = atom.workspace.getActiveTextEditor();
        if (editor === undefined)
            return '';
        const buffer = editor.getBuffer();
        const position = editor.getCursorBufferPosition();
        const lines = buffer.getLines();
        const regex = new RegExp('^\\s*$');
        let rowBefore = position.row;
        while (rowBefore >= 0 && !regex.test(lines[rowBefore])) {
            --rowBefore;
        }
        let rowAfter = position.row;
        while (rowAfter < lines.length && !regex.test(lines[rowAfter])) {
            ++rowAfter;
        }
        const range = buffer.clipRange([
            [rowBefore + 1, 0],
            [rowAfter, 0],
        ]);
        return this.getTextInRange(editor, range);
    }
}
exports.default = Editor;
//# sourceMappingURL=editor.js.map