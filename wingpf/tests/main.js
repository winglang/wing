console.log('-- testing JS:');
console.log('Hello From JavaScript!');
console.log('-- testing TS:');
require("./main.ts");
console.log('-- testing Python:');
const fs = require("fs");
const loadPyodide = require("../dist/pyodide");
loadPyodide({ indexURL: `../dist/pyodide` }).then((pyodide) => {
  pyodide.runPythonAsync(fs.readFileSync('./main.py', 'utf8'));
});
