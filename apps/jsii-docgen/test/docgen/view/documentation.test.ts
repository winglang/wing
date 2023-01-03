import { Documentation, Language } from "../../../src";
import { Assemblies } from "../assemblies";

jest.setTimeout(30 * 1000);

describe("wing", () => {
  test("WING", async () => {
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

  test("snapshot - root module", async () => {
    const docs = await Documentation.forAssembly(
      "@aws-cdk/aws-ecr",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({ language: Language.WING });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules", async () => {
    const docs = await Documentation.forAssembly(
      "aws-cdk-lib",
      Assemblies.AWSCDK_1_106_0
    );
    try {
      const markdown = await docs.toMarkdown({
        language: Language.WING,
        submodule: "aws_eks",
      });
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });
});
