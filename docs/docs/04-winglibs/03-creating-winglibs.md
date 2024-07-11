---
title: Creating winglibs
id: creating-winglibs
description: Documentation for creating winglibs
sidebar_label: Creating winglibs
keywords: [Wing reference, Wing libraries, libraries, packaging, packages]
---

Packaging your own Wing code as a library is straightforward.
Let's walk through it step by step.

First, check that your project is organized based on how you want to structure your library.
There are two main rules to be aware of:

1. APIs can only be exported from non-entrypoint files (files that do not end in `.main.w` or `.test.w`).
   Entrypoint files are perfect for writing tests and deployment scenarios that can be executed as-is - but if you have classes and other APIs you want to share, they have to be defined in non-entrypoint files (also known as module files).

2. APIs are organized based on the project's directory structure.
   If you want a group of classes to be part of a namespace named "storage", define them in a directory named "storage" (for example, some classes could be defined in `storage/file1.w`, several more in `storage/file2.w`, and so on).
   All public APIs defined at the root of your project will be available at top-level namespace in your library.

Next, run `npm init` to create a `package.json` file with information about your library.
Make sure you fill out the "name", "version", "description", "author", and "license" fields.

Finally, run `wing pack` at the root of your project directory.
`wing pack` will compile your project and create a .tgz file that can be published to [npm](https://www.npmjs.com/), [GitHub Packages](https://github.com/features/packages), or any other Node.js package managing service.

