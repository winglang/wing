import * as reflect from "jsii-reflect";
import { Language } from "../../../src";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { TypeScriptTranspile } from "../../../src/docgen/transpile/typescript";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { Parameter } from "../../../src/docgen/view/parameter";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findParameter = (): reflect.Parameter => {
  for (const klass of assembly.system.classes) {
    for (const method of klass.ownMethods) {
      if (method.parameters.length > 0) {
        return method.parameters[0];
      }
    }
  }
  throw new Error("Assembly does not contain a parameter");
};

test.each(Language.values().map(l => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const param = new Parameter(transpile, findParameter()).toJson();
  expect(param).toMatchSnapshot();
  expect(markdown.visitParameter(param).render()).toMatchSnapshot();
});

test('newlines in "defaults" are removed', () => {
  const transpile = new TypeScriptTranspile();
  const reflectParameter = findParameter();
  reflectParameter.spec.docs = { default: "default option\nwith a newline" };
  const docgenParameter = new Parameter(transpile, reflectParameter).toJson();
  const renderer = new MarkdownRenderer({
    language: Language.TYPESCRIPT,
    ...metadata,
  });
  const markdown = renderer.visitParameter(docgenParameter).render();
  expect(markdown).toMatchSnapshot();
  expect(markdown).toContain("default option with a newline");
});

test('newlines in any other than "defaults" are not removed', () => {
  const transpile = new TypeScriptTranspile();
  const reflectParameter = findParameter();
  reflectParameter.spec.docs = { remarks: "remarks\nwith a newline" };
  const docgenParameter = new Parameter(transpile, reflectParameter).toJson();
  const renderer = new MarkdownRenderer({
    language: Language.TYPESCRIPT,
    ...metadata,
  });
  const markdown = renderer.visitParameter(docgenParameter).render();
  expect(markdown).toContain("remarks\nwith a newline");
});
