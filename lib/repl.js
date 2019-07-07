'use babel';

const REPLACERS = [
  [/-{2}.*\r?\n+|\/\*.*\*\//g, ''],
  [/(set|rec) /g, '$1@'],
  [/\s/g, ''],
  [/\\,|,/g, '\\,'],
  [/(@|:)/g, ' ']
];

export default function repl(code) {
  for (const replacer of REPLACERS) {
    code = code.replace(replacer[0], replacer[1]);
  }
  return code;
}
