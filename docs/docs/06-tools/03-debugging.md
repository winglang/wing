---
title: Debugging
id: Debugging
description: Learn how to debug your Wing application
keywords: [debugging, debug, test, vscode]
---

## Overview

Internally Wing uses JavaScript to execute preflight and inflight code, so standard JavaScript debugging tools can be used to debug your Wing application. The best-supported debugger is the built-in VS Code one so this guide will focus on that. 

### Local/Simulator Debugging

To start, open your .w file in VS Code and set breakpoints by clicking in the gutter to the left of the line number. Breakpoints can also be set in extern files.
Once set, press F5 or use the "Run and Debug" button in the sidebar to start the debugger. This will use the current file if it's an entrypoint or it will prompt you to select one. Different CLI arguments can be provided as well.
By default, `wing test` will be run with an attached debugger.

#### Non-VSCode Support

The Wing CLI itself is a Node.js application, so you can use the `--inspect` flag to debug it and expose a debug server.

```bash
node --inspect $(which wing)
```

Note that inflight code will be executed among multiple child processes, so it's recommended to use a debugger that supports automatically attaching to child processes.
