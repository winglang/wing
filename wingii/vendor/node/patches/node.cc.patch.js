#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

const patch = `
#ifndef NODE_C_INTERFACE
#define NODE_C_INTERFACE
#include "node_embedding_api.cc"
#endif  // !NODE_C_INTERFACE
`;

const node_cc_path = "src/node.cc";
const node_cc = fs.readFileSync(node_cc_path, "utf8");
if (!node_cc.includes("NODE_C_INTERFACE")) {
  fs.writeFileSync(node_cc_path, node_cc + "\n" + patch);
  fs.copyFileSync(path.join(__dirname, "../node_embedding_api.h"), "src/node_embedding_api.h");
  fs.copyFileSync(path.join(__dirname, "../node_embedding_api.cc"), "src/node_embedding_api.cc");
}
