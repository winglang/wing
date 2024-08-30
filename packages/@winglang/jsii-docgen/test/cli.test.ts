import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";

const cli = require.resolve("../lib/cli");

test("construct-library", () => {
  const libraryName = "construct-library";
  const fixture = join(`${__dirname}/__fixtures__/libraries/${libraryName}`);

  // generate the documentation
  execSync(`${process.execPath} ${cli}`, { cwd: fixture });

  const md = readFileSync(join(fixture, "API.md"), "utf-8");
  expect(md).toMatchSnapshot();
});

test("specify language", () => {
  const libraryName = "construct-library";
  const fixture = join(`${__dirname}/__fixtures__/libraries/${libraryName}`);

  // generate the documentation
  execSync(`${process.execPath} ${cli} --language python`, { cwd: fixture });

  const md = readFileSync(join(fixture, "API.md"), "utf-8");
  expect(md).toMatchSnapshot();
});

test("specify submodule", () => {
  const libraryName = "construct-library";
  const fixture = join(`${__dirname}/__fixtures__/libraries/${libraryName}`);

  // generate the documentation
  execSync(`${process.execPath} ${cli} --submodule submod1`, { cwd: fixture });

  const md = readFileSync(join(fixture, "API.md"), "utf-8");
  expect(md).toMatchSnapshot();
});

test("specify root submodule", () => {
  const libraryName = "construct-library";
  const fixture = join(`${__dirname}/__fixtures__/libraries/${libraryName}`);

  // generate the documentation
  execSync(`${process.execPath} ${cli} --submodule root`, { cwd: fixture });

  const md = readFileSync(join(fixture, "API.md"), "utf-8");
  expect(md).toMatchSnapshot();
});
