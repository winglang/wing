import { test } from "vitest";

import { getFileEncoding } from "./use-download-file.js";

test("getFileEncoding treats text and source files as utf8", async (t) => {
  for (const file of [
    "main.w",
    "hello.ts",
    "notes.txt",
    "index.tsx",
    "app.js",
    "README.md",
    "config.json",
    "data.csv",
    "main.py",
    "main.go",
    "file.c",
    "file.h",
  ]) {
    t.expect(getFileEncoding(file)).toEqual("utf8");
  }
});

test("getFileEncoding treats binary files as base64", async (t) => {
  for (const file of ["image.png", "photo.jpg", "clip.gif", "movie.mp4"]) {
    t.expect(getFileEncoding(file)).toEqual("base64");
  }
});

test("getFileEncoding treats files without a known extension as text", async (t) => {
  t.expect(getFileEncoding("README")).toEqual("utf8");
  t.expect(getFileEncoding("folder/main")).toEqual("utf8");
});
