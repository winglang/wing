import { Documentation } from "../../../src";
import { Language } from "../../../src/docgen/transpile/transpile";
import { Assemblies } from "../assemblies";

jest.setTimeout(60000);

describe("language", () => {
  test("typescript is supported", () => {
    expect(Language.fromString("typescript")).toEqual(Language.TYPESCRIPT);
    // Allows undefined configuration
    expect(Language.TYPESCRIPT.isValidConfiguration(undefined)).toBeTruthy();
    // Allows random configuration
    expect(
      Language.TYPESCRIPT.isValidConfiguration({ foo: "bar" })
    ).toBeTruthy();
  });

  test("python is supported", () => {
    expect(Language.fromString("python")).toEqual(Language.PYTHON);
    // Disallows undefined configuration
    expect(Language.PYTHON.isValidConfiguration(undefined)).toBeFalsy();
    // Allows valid configuration
    expect(
      Language.PYTHON.isValidConfiguration({ distName: "bar", module: "foo" })
    ).toBeTruthy();
  });

  test("java is supported", () => {
    expect(Language.fromString("java")).toEqual(Language.JAVA);
    // Disallows undefined configuration
    expect(Language.JAVA.isValidConfiguration(undefined)).toBeFalsy();
    // Allows valid configuration
    expect(
      Language.JAVA.isValidConfiguration({
        package: "com.acme.package",
        maven: { groupId: "group", artifactId: "artifact" },
      })
    ).toBeTruthy();
  });

  test("csharp is supported", () => {
    expect(Language.fromString("csharp")).toEqual(Language.CSHARP);
    // Disallows undefined configuration
    expect(Language.CSHARP.isValidConfiguration(undefined)).toBeFalsy();
    // Allows valid configuration
    expect(
      Language.CSHARP.isValidConfiguration({
        namespace: "Com.Acme.Package",
        packageId: "AcmePackage",
      })
    ).toBeTruthy();
  });

  test("go is supported", () => {
    expect(Language.fromString("go")).toEqual(Language.GO);
    // Disallows undefined configuration
    expect(Language.GO.isValidConfiguration(undefined)).toBeFalsy();
    // Allows valid configuration
    expect(
      Language.GO.isValidConfiguration({
        moduleName: "github.com/acme/package",
      })
    ).toBeTruthy();
  });

  test("throw error on unsupported language", () => {
    expect(() => Language.fromString("unsupported")).toThrowError(
      /Unsupported language: unsupported. Supported languages are/
    );
  });

  test("toString()", () => {
    expect(Language.PYTHON.toString()).toEqual("python");
  });
});

describe("submodules without an explicit name", () => {
  test("java", async () => {
    const docs = await Documentation.forAssembly(
      "@aws-cdk/aws-cloudfront",
      Assemblies.AWSCDK_1_126_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.JAVA,
      submodule: "experimental",
    });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("python", async () => {
    const docs = await Documentation.forAssembly(
      "@aws-cdk/aws-cloudfront",
      Assemblies.AWSCDK_1_126_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.PYTHON,
      submodule: "experimental",
    });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("csharp", async () => {
    const docs = await Documentation.forAssembly(
      "@aws-cdk/aws-cloudfront",
      Assemblies.AWSCDK_1_126_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.CSHARP,
      submodule: "experimental",
    });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("go", async () => {
    // NOTE: @aws-cdk/aws-cloudfront 1.126.0 does not support Go, so we use region_info from aws-cdk-lib instead, which does.
    const docs = await Documentation.forAssembly(
      "aws-cdk-lib",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.GO,
      submodule: "region_info",
    });
    expect(markdown.render()).toMatchSnapshot();
  });
});
