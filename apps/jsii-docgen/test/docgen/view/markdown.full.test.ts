import { Documentation, Language } from "../../../src";
import { JsiiEntity } from "../../../src/docgen/schema";

jest.setTimeout(60 * 1000);

describe("simple link formatter", () => {
  test.each(Language.values())("%s snapshot", async (language) => {
    const docs = await Documentation.forPackage(
      language === Language.GO
        ? "constructs@10.0.78"
        : "@aws-cdk/aws-ecr@1.106.0"
    );
    try {
      const markdown = await docs.toMarkdown({
        language,
        linkFormatter: (type: JsiiEntity) =>
          `<a href="#custom-${type.id}">${type.displayName}</a>`,
      });
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });
});

describe("complex link formatter", () => {
  test.each(Language.values())("%s snapshot", async (language) => {
    const docs = await Documentation.forPackage(
      language === Language.GO
        ? "constructs@10.0.78"
        : "@aws-cdk/aws-ecr@1.106.0"
    );
    try {
      const markdown = await docs.toMarkdown({
        language,
        anchorFormatter: (type: JsiiEntity) => getAssemblyRelativeName(type),
        linkFormatter: complexLinkFormatter,
      });
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });
});

describe("complex link formatter - aws-solutions-constructs", () => {
  test.each([Language.TYPESCRIPT, Language.PYTHON, Language.JAVA])(
    "%s snapshot",
    async (language) => {
      const docs = await Documentation.forPackage(
        "@aws-solutions-constructs/aws-lambda-sqs@2.0.0"
      );
      try {
        const markdown = await docs.toMarkdown({
          language,
          anchorFormatter: (type: JsiiEntity) => getAssemblyRelativeName(type),
          linkFormatter: complexLinkFormatter,
        });
        expect(markdown.render()).toMatchSnapshot();
      } finally {
        await docs.cleanup();
      }
    }
  );
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
      `Expected first part of "${type.id}" to start with "${type.packageName}".`
    );
  }
  name = name.slice(type.packageName.length + 1); // remove "aws-cdk-lib.""
  if (type.submodule) {
    if (!name.startsWith(type.submodule)) {
      throw new Error(
        `Expected second part of "${type.id}" to start with "${type.submodule}".`
      );
    }
    name = name.slice(type.submodule.length + 1); // remove "aws_s3."
  }
  return name;
}
