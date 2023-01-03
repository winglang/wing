import * as child from "child_process";
import * as os from "os";
import * as path from "path";
import * as fs from "fs-extra";
import {
  Language,
  Documentation,
  UnInstallablePackageError,
  CorruptedAssemblyError,
  LanguageNotSupportedError,
} from "../../../src";
import { extractPackageName } from "../../../src/docgen/view/documentation";
import { Assemblies } from "../assemblies";

const LIBRARIES = `${__dirname}/../../__fixtures__/libraries`;

// this is a little concerning...we should be mindful
// if need to keep increasing this.
jest.setTimeout(120 * 1000);

describe("extractPackageName", () => {
  test("scope only", () => {
    expect(extractPackageName("@aws-cdk/aws-ecr")).toEqual("@aws-cdk/aws-ecr");
  });

  test("scope and version", () => {
    expect(extractPackageName("@aws-cdk/aws-ecr@1.100.1")).toEqual(
      "@aws-cdk/aws-ecr"
    );
  });

  test("no scope no version", () => {
    expect(extractPackageName("aws-cdk-lib")).toEqual("aws-cdk-lib");
  });

  test("version only", () => {
    expect(extractPackageName("aws-cdk-lib@1.100.1")).toEqual("aws-cdk-lib");
  });
});

test("package installation does not run lifecycle hooks", async () => {
  const workdir = await fs.mkdtemp(path.join(os.tmpdir(), path.sep));
  const libraryName = "construct-library";
  const libraryDir = path.join(LIBRARIES, libraryName);

  await fs.copy(libraryDir, workdir);

  const manifestPath = path.join(workdir, "package.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf-8"));

  // inject a postinstall hook
  manifest.scripts.postinstall = "exit 1";
  await fs.writeFile(manifestPath, JSON.stringify(manifest));

  // create the package
  child.execSync("yarn package", { cwd: workdir });

  // this should succeed because the failure script should be ignored
  const docs = await Documentation.forPackage(
    path.join(workdir, "dist", "js", `${libraryName}@0.0.0.jsii.tgz`),
    { name: libraryName }
  );
  try {
    const markdown = await docs.toMarkdown({ language: Language.TYPESCRIPT });
    expect(markdown.render()).toMatchSnapshot();
  } finally {
    await docs.cleanup();
  }
});

describe("python", () => {
  test("for package", async () => {
    const docs = await Documentation.forPackage("@aws-cdk/aws-ecr@1.106.0");
    try {
      const json = await docs.toJson({ language: Language.PYTHON });
      const markdown = await docs.toMarkdown({ language: Language.PYTHON });

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
    const markdown = await docs.toMarkdown({ language: Language.PYTHON });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules", async () => {
    const docs = await Documentation.forAssembly(
      "aws-cdk-lib",
      Assemblies.AWSCDK_1_106_0
    );
    try {
      const markdown = await docs.toMarkdown({
        language: Language.PYTHON,
        submodule: "aws_eks",
      });
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });
});

describe("typescript", () => {
  test("for package", async () => {
    const docs = await Documentation.forPackage("@aws-cdk/aws-ecr@1.106.0");
    try {
      const markdown = await docs.toMarkdown({ language: Language.TYPESCRIPT });
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });

  test("snapshot - single module", async () => {
    const docs = await Documentation.forAssembly(
      "@aws-cdk/aws-ecr",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({ language: Language.TYPESCRIPT });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules", async () => {
    const docs = await Documentation.forAssembly(
      "aws-cdk-lib",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.TYPESCRIPT,
      submodule: "aws_eks",
    });
    expect(markdown.render()).toMatchSnapshot();
  });
});

describe("java", () => {
  test("for package", async () => {
    const docs = await Documentation.forPackage("@aws-cdk/aws-ecr@1.106.0");
    try {
      const markdown = await docs.toMarkdown({ language: Language.JAVA });
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
    const markdown = await docs.toMarkdown({ language: Language.JAVA });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules", async () => {
    const docs = await Documentation.forAssembly(
      "aws-cdk-lib",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.JAVA,
      submodule: "aws_eks",
    });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules 2", async () => {
    const docs = await Documentation.forAssembly(
      "monocdk",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.JAVA,
      submodule: "aws_eks",
    });
    expect(markdown.render()).toMatchSnapshot();
  });
});

describe("csharp", () => {
  test("for package", async () => {
    const docs = await Documentation.forPackage("@aws-cdk/aws-ecr@1.106.0");
    try {
      const markdown = await docs.toMarkdown({ language: Language.CSHARP });
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
    const markdown = await docs.toMarkdown({ language: Language.CSHARP });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules", async () => {
    const docs = await Documentation.forAssembly(
      "aws-cdk-lib",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.CSHARP,
      submodule: "aws_eks",
    });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules 2", async () => {
    const docs = await Documentation.forAssembly(
      "monocdk",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.CSHARP,
      submodule: "aws_eks",
    });
    expect(markdown.render()).toMatchSnapshot();
  });
});

describe("go", () => {
  test("for package", async () => {
    const docs = await Documentation.forPackage("constructs@10.0.78");
    try {
      const markdown = await docs.toMarkdown({ language: Language.GO });
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });

  test("snapshot - root module", async () => {
    const docs = await Documentation.forAssembly(
      "constructs",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({ language: Language.GO });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules", async () => {
    const docs = await Documentation.forAssembly(
      "aws-cdk-lib",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.GO,
      submodule: "aws_eks",
    });
    expect(markdown.render()).toMatchSnapshot();
  });

  test("snapshot - submodules 2", async () => {
    const docs = await Documentation.forAssembly(
      "monocdk",
      Assemblies.AWSCDK_1_106_0
    );
    const markdown = await docs.toMarkdown({
      language: Language.GO,
      submodule: "aws_eks",
    });
    expect(markdown.render()).toMatchSnapshot();
  });
});

test("throws uninstallable error on dependency conflict", async () => {
  // this package decalres a fixed peerDependency on constructs, which conflicts with its other dependencies
  return expect(
    Documentation.forPackage("cdk8s-mongo-sts@0.0.5")
  ).rejects.toThrowError(UnInstallablePackageError);
});

test("throws uninstallable error on missing spec in dependencies", async () => {
  // this package has a corrupt package.json that doesn't contain a spec for some dependencies
  return expect(
    Documentation.forPackage(
      "cdk-codepipeline-bitbucket-build-result-reporter@0.0.7"
    )
  ).rejects.toThrowError(UnInstallablePackageError);
});

test("throws corrupt assembly", async () => {
  const docs = await Documentation.forPackage("@epilot/cdk-constructs@1.0.7");
  // this package accepts an unexported HttpApiProps in a constructor
  await expect(
    docs.toMarkdown({ language: Language.TYPESCRIPT })
  ).rejects.toThrowError(CorruptedAssemblyError);
  await expect(
    docs.toJson({ language: Language.TYPESCRIPT })
  ).rejects.toThrowError(CorruptedAssemblyError);
});

test("throws corrupt assembly 2", async () => {
  const docs = await Documentation.forPackage("@pahud/cdktf-aws-ecs@v0.1.35");
  // this package had a peerDependency which underwent a breaking change in a minor version (cdktf.ComplexObject interface was removed)
  await expect(
    docs.toMarkdown({ language: Language.TYPESCRIPT })
  ).rejects.toThrowError(CorruptedAssemblyError);
  await expect(
    docs.toJson({ language: Language.TYPESCRIPT })
  ).rejects.toThrowError(CorruptedAssemblyError);
});

test("throws unsupported language with invalid config", async () => {
  // package doesn't support Go and should throw with corresponding error
  const docs = await Documentation.forPackage("@aws-cdk/pipelines@v1.144.0");
  await expect(docs.toMarkdown({ language: Language.GO })).rejects.toThrowError(
    LanguageNotSupportedError
  );
  await expect(docs.toJson({ language: Language.GO })).rejects.toThrowError(
    LanguageNotSupportedError
  );
});

//TODO WING HACK
test.skip("throws unsupported language when tablet was generated before rosetta supported go", async () => {
  const docs = await Documentation.forPackage("aws-cdk-lib@2.16.0");
  await expect(docs.toMarkdown({ language: Language.GO })).rejects.toThrowError(
    LanguageNotSupportedError
  );
  await expect(docs.toJson({ language: Language.GO })).rejects.toThrowError(
    LanguageNotSupportedError
  );
});

test("performance on large modules", async () => {
  const docs = await Documentation.forPackage("@cdktf/provider-aws@4.0.1");
  // the assertion here is simply finishing the rendering in time.
  await docs.toMarkdown({ language: Language.PYTHON, submodule: "wafv2" });
});

test("does not reach headerSize limit for modules with method param examples", async () => {
  // this module includes @example information for a method parameter
  // at @aws-cdk/aws-apigateway.ProxyResource.addMethod.parameter.requestModels
  const docs = await Documentation.forPackage("@aws-cdk/aws-apigateway@1.47.0");
  // the assertion here is simply that the rendering succeeds
  await docs.toMarkdown({ language: Language.PYTHON });
});
