# `node_bridge.cc`

Wing Rosetta Runtime JavaScript Bridge.

## Mission

Output of this C++ lib is a single free function that allows C++ to call it.

The single free function is capable of executing arbitrary Node, akin to a REPL.

Internally it uses [N-API](https://nodejs.org/api/embedding.html).
