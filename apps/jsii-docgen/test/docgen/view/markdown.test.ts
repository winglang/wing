import * as path from "path";
import { Documentation, Language } from "../../../src";
import { JsiiEntity } from "../../../src/docgen/schema";

let docs: Documentation;

beforeAll(async () => {
  docs = await Documentation.forProject(
    path.join(__dirname, "../../__fixtures__/libraries/construct-library"),
  );
});

afterAll(async () => {
  await docs.cleanup();
});

describe("simple link formatter", () => {
  test("wing snapshot", async () => {
    const markdown = await docs.toMarkdown({
      language: Language.WING,
      linkFormatter: (type: JsiiEntity) =>
        `<a href="#custom-${type.id}">${type.displayName}</a>`,
    });
    expect(markdown.render()).toMatchSnapshot();
  });
});

describe("complex link formatter", () => {
  test("wing snapshot", async () => {
    const markdown = await docs.toMarkdown({
      language: Language.WING,
      anchorFormatter: (type: JsiiEntity) => getAssemblyRelativeName(type),
      linkFormatter: complexLinkFormatter,
    });
    expect(markdown.render()).toMatchSnapshot();
  });
});

function complexLinkFormatter(type: JsiiEntity) {
  const name = getAssemblyRelativeName(type); // BucketProps.parameter.accessControl
  const submoduleParam = type.submodule ? `&submodule=${type.submodule}` : "";
  return `<a href="/packages/${type.packageName}/v/${type.packageVersion}/api/${name}?lang=python${submoduleParam}">${type.displayName}</a>`;
}

/**
 * Converts a type's id to an assembly-relative version, e.g.:
 * `aws-cdk-lib.aws_s3.Bucket.parameter.accessControl` => `Bucket.parameter.accessControl`
 */
function getAssemblyRelativeName(type: JsiiEntity): string {
  let name = type.id;
  if (!name.startsWith(type.packageName)) {
    throw new Error(
      `Expected first part of "${type.id}" to start with "${type.packageName}".`,
    );
  }
  name = name.slice(type.packageName.length + 1); // remove "aws-cdk-lib.""
  if (type.submodule) {
    if (!name.startsWith(type.submodule)) {
      throw new Error(
        `Expected second part of "${type.id}" to start with "${type.submodule}".`,
      );
    }
    name = name.slice(type.submodule.length + 1); // remove "aws_s3."
  }
  return name;
}
