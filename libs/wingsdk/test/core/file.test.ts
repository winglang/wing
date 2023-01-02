import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { Files } from "../../src/core";
import { JsonFile, TextFile } from "../../src/fs";
import { mkdtemp } from "../../src/util";
import { appSnapshot } from "../util";

test("nothing in output directory if there are no files", () => {
  const app = new App({ outdir: mkdtemp() });
  expect(appSnapshot(app)).toStrictEqual({});
});

test("files are saved in the output directory", () => {
  const app = new App({ outdir: mkdtemp() });
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
    const app = new App({ outdir: mkdtemp() });
    new TextFile(app, "TextFile", "myfile.txt", {
      lines: ["boom"],
    });
    expect(appSnapshot(app)).toStrictEqual({
      "myfile.txt": "boom",
    });
  });

  test("no state file if there are no files", () => {
    const app = new App({
      outdir: mkdtemp(),
      stateFile: "state.file",
    });

    expect(appSnapshot(app)).toStrictEqual({});
  });

  test("state file includes list of generated files", () => {
    const app = new App({
      outdir: mkdtemp(),
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

  test("files are deleted if they were in the state file but not in the new app", () => {
    const workdir = mkdtemp();
    const stateFileName = "state.file";
    writeFileSync(join(workdir, "delete-me.txt"), "hello");
    writeFileSync(join(workdir, "another-file.txt"), "world");
    writeFileSync(
      join(workdir, stateFileName),
      ["delete-me.txt", "another-file.txt"].join("\n")
    );

    const app = new App({
      outdir: workdir,
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
      outdir: workdir1,
      stateFile: join(workdir2, "another.file"),
    });
    new JsonFile(app, "JsonFile", "my.json", {
      obj: { fo: 123 },
    });

    app.synth();
    expect(readdirSync(workdir1)).toEqual(["my.json"]);
    expect(readdirSync(workdir2)).toEqual(["another.file"]);
  });
});

export interface AppProps {
  readonly outdir: string;
  readonly stateFile?: string;
}

export class App extends Construct {
  public readonly outdir: string;
  private readonly files: Files;

  constructor(props: AppProps) {
    super(undefined as any, "root");
    this.outdir = props.outdir;
    this.files = new Files({ app: this, stateFile: props.stateFile });
  }

  public synth(): string {
    this.files.synth();
    return this.outdir;
  }
}
