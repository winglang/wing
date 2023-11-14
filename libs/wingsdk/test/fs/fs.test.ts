import { test, expect } from "vitest";
import { Util as fs } from "../../src/fs/fs";
import { Json } from "../../src/std";

const data = `{
  "foo": "bar",
  "arr": [
    1,
    2,
    3,
    "test",
    {
      "foo": "bar"
    }
  ]
}`;
const jsonObj = JSON.parse(data) as Json;

function randomStr(): string {
  return (Math.random() + 1).toString(36).substring(7);
}

test("write, read and remove file", async () => {
  const filename = `testfile-${randomStr()}.txt`;
  fs.writeFile(filename, data);

  const exist1 = fs.exists(filename);
  expect(exist1).toEqual(true);

  const text = fs.readFile(filename);
  expect(text).toEqual(text);

  fs.remove(filename);
  const exist2 = fs.exists(filename);
  expect(exist2).toEqual(false);
});

test("make directory recursively", async () => {
  const baseDir = `testdir-${randomStr()}`;
  const dirpath = `${baseDir}/test`;
  fs.mkdir(dirpath, { recursive: true });

  const dirContent = fs.readdir(dirpath);
  expect(dirContent.length).toEqual(0);

  fs.remove(baseDir, { force: true, recursive: true });
  const exist = fs.exists(dirpath);
  expect(exist).toEqual(false);
});

test("make temp directory", async () => {
  const prefix = `prefix-${randomStr()}`;
  const dirpath = fs.mkdtemp(prefix);
  expect(dirpath.split("/").pop()).match(new RegExp(`${prefix}`));

  let exist = fs.exists(dirpath);
  expect(exist).toEqual(true);

  fs.remove(dirpath, { recursive: true });
  exist = fs.exists(dirpath);
  expect(exist).toEqual(false);
});

test("write and read json", async () => {
  const filename = `testfile-${randomStr()}.json`;
  fs.writeJson(filename, jsonObj);

  const obj = fs.readJson(filename);
  expect(obj).toEqual(jsonObj);

  fs.remove(filename);
  const exist = fs.exists(filename);
  expect(exist).toEqual(false);
});

test("write and read yaml", async () => {
  const filename = `testfile-${randomStr()}.yaml`;
  fs.writeYaml(filename, jsonObj, jsonObj);

  const objs = fs.readYaml(filename);
  expect(objs).toEqual([jsonObj, jsonObj]);

  fs.remove(filename);
  const exist = fs.exists(filename);
  expect(exist).toEqual(false);
});
