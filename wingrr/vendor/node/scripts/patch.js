#! /usr/bin/env node

const fs = require("fs");

fs.writeFileSync("configure.py", 
  fs.readFileSync("configure.py", "utf8").replace(/ = shlib_suffix/g, " = 'so'")
);
