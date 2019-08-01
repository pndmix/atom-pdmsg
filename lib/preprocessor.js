'use babel';

const REPLACERS = [
  [/(set|rec) /g, '$1@'],
  [/\s/g, ''],
  [/\\,|,/g, '\\,'],
  [/(@|:)/g, ' ']
];

export default class Preprocessor {

  constructor() {
    this.code = null;
    this.macroHash = {};
  }

  // divide the statements from the original code
  divide(regexp, flag) {
    const re = new RegExp(regexp, flag);
    const match = this.code.match(re);
    this.code = this.code.replace(re, '');
    return match;
  }

  // add define variables to the macro hash
  define() {
    const re = "define\\s+\\w+\\s+([ !$%&\\(-/<->^\\|~]|\\w)+;";
    const defines = this.divide(re, 'g');
    if (defines !== null) {
      for (const define of defines) {
        const arr = define.replace(/define\s*(\w+)\s/g, '$1@').replace(/(define|;|\s)/g, '').split('@');
        this.macroHash['$' + arr[0]] = arr[1];
      }
    }
  }

  // expand the macro
  expand() {
    const keys = Object.keys(this.macroHash);
    if (keys.length) {
      for (const key of keys) {
        const re = new RegExp('\\' + key, 'g');
        this.code = this.code.replace(re, this.macroHash[key]);
      }
    }
  }

  eval(code) {
    // remove comments
    this.code = code.replace(/-{2}.*\r?\n+|\/\*.*\*\//g, '');

    // expand the macro
    this.define();
    this.expand();

    // replace this code for PD
    for (const replacer of REPLACERS) {
      this.code = this.code.replace(replacer[0], replacer[1]);
    }
    return this.code;
  }
}
