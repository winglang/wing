#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dep = process.argv[2];
if (!dep) {
  console.error('No dependency name provided');
  process.exit(1);
}

const pkg = require('../package.json');

if (!pkg.dependencies[dep]) {
  console.error(`Dependency ${dep} not found in "dependencies"`);
  process.exit(1);
}

delete pkg.dependencies[dep];

const index = pkg.bundledDependencies.indexOf(dep);

if (index === -1) {
  console.error(`Dependency ${dep} not found in "bundledDependencies"`);
  process.exit(1);
}

pkg.bundledDependencies.splice(index, 1);

fs.writeFileSync(
  path.join(__dirname, '..', 'package.json'),
  JSON.stringify(pkg, null, 2) + '\n'
);