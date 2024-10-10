---
title: Reading and writing files
id: reading-and-writing-files
slug: /reading-and-writing-files
sidebar_label: Reading and writing files
description: Reading and writing files with Wing
keywords: [Wing language, Reading files, Writing files]
image: /img/wing-by-example.png
---

```js playground example title="main.w"
bring fs;

let filename: str = fs.join(@dirname, "test.txt");

log(fs.exists(filename));

fs.writeFile(filename, "hello world!");
fs.exists(filename);

let file: str = fs.readFile(filename);

log(file);
log(fs.extension(filename) ?? "");
log(fs.isDir(filename));

fs.appendFile(filename, "testing");

let extendedValue = fs.readFile(filename);

log(extendedValue);

fs.remove(filename);
```

```bash title="Wing console output"
# Run locally with wing console
true
hello world!
txt
false
hello world!testing
```




