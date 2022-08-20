import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { App } from "../../src/core";
import { JsonFile, TextFile } from "../../src/fs";
import { appSnapshot, mkdtemp } from "../util";
import { NoopSynthesizer } from "./fixtures";

test("nothing in output directory if there are no files", () => {
  const app = new App({
    synthesizer: new NoopSynthesizer({ outdir: mkdtemp() }),
  });
  expect(appSnapshot(app)).toStrictEqual({});
});

test("files are saved in the output directory", () => {
  const app = new App({
    synthesizer: new NoopSynthesizer({ outdir: mkdtemp() }),
  });
  const obj: any = { hello: "world" };
  new JsonFile(app, "JsonFile", "my-file.json", { obj });
  obj.mutate = 123;

  const txt = new TextFile(app, "TextFile", "your/file.txt", {
    lines: ["line1"],
  });
  txt.addLine("another line");

  expect(appSnapshot(app)).toStrictEqual({
    "my-file.json": {
      hello: "world",
      mutate: 123,
    },
    "your/file.txt": ["line1", "another line"].join("\n"),
  });
});

describe("state file", () => {
  test("no state file by default", () => {
    const workdir = mkdtemp();
    const app = new App({
      synthesizer: new NoopSynthesizer({ outdir: workdir }),
    });
    new TextFile(app, "TextFile", "myfile.txt", {
      lines: ["boom"],
    });
    expect(appSnapshot(app)).toStrictEqual({
      "myfile.txt": "boom",
    });
  });

  test("no state file if there are no files", () => {
    const workdir = mkdtemp();
    const app = new App({
      synthesizer: new NoopSynthesizer({ outdir: workdir }),
      stateFile: "state.file",
    });

    expect(appSnapshot(app)).toStrictEqual({});
  });

  test("state file includes list of generated files", () => {
    const workdir = mkdtemp();
    const app = new App({
      synthesizer: new NoopSynthesizer({ outdir: workdir }),
      stateFile: "state.file",
    });

    new TextFile(app, "TextFile", "file1.txt", {
      lines: ["hello"],
    });

    expect(appSnapshot(app)).toStrictEqual({
      "file1.txt": "hello",
      "state.file": ["file1.txt"].join("\n"),
    });
  });

  test("files are deleted if they were in the state file but no in the new app", () => {
    const workdir = mkdtemp();
    const stateFileName = "state.file";
    writeFileSync(join(workdir, "delete-me.txt"), "hello");
    writeFileSync(join(workdir, "another-file.txt"), "world");
    writeFileSync(
      join(workdir, stateFileName),
      ["delete-me.txt", "another-file.txt"].join("\n")
    );

    const app = new App({
      synthesizer: new NoopSynthesizer({ outdir: workdir }),
      stateFile: stateFileName,
    });

    new TextFile(app, "TextFile", "another-file.txt", { lines: ["damn!"] });
    app.synth();

    expect(readdirSync(workdir)).toEqual(["another-file.txt", stateFileName]);
  });

  test("can be absolute path", () => {
    const workdir1 = mkdtemp();
    const workdir2 = mkdtemp();
    const app = new App({
      stateFile: join(workdir2, "another.file"),
      synthesizer: new NoopSynthesizer({ outdir: workdir1 }),
    });
    new JsonFile(app, "JsonFile", "my.json", {
      obj: { fo: 123 },
    });

    app.synth();
    expect(readdirSync(workdir1)).toEqual(["my.json"]);
    expect(readdirSync(workdir2)).toEqual(["another.file"]);
  });
});
