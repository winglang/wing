import * as reflect from "jsii-reflect";
import { Language } from "../../../src";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { Class } from "../../../src/docgen/view/class";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findClass = (): reflect.ClassType => {
  if (assembly.classes[0]) {
    return assembly.classes[0];
  }
  throw new Error("Assembly does not contain a class");
};

test.each(Language.values().map((l) => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const klass = new Class(transpile, findClass()).toJson();
  expect(klass).toMatchSnapshot();
  expect(markdown.visitClass(klass).render()).toMatchSnapshot();
});
