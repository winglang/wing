import { Documentation, Language } from "../../../src";

jest.setTimeout(30 * 1000);

describe("wing", () => {
  test("single package", async () => {
    const docs = await Documentation.forPackage("@aws-cdk/aws-ecr@1.106.0");
    try {
      const json = await docs.toJson({ language: Language.WING });
      const markdown = await docs.toMarkdown({ language: Language.WING });

      expect(json.content).toMatchSnapshot();
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });

  test("package with submodules", async () => {
    const docs = await Documentation.forPackage("aws-cdk-lib@2.12.0");
    try {
      const json = await docs.toJson({ language: Language.WING });
      const markdown = await docs.toMarkdown({ language: Language.WING });

      expect(json.content).toMatchSnapshot();
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });
});
