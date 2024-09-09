import * as reflect from "jsii-reflect";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { Language } from "../../../src/docgen/transpile/transpile";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { InstanceMethod } from "../../../src/docgen/view/instance-method";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findInstanceMethod = (): reflect.Method => {
  for (const klass of assembly.system.classes) {
    for (const method of klass.ownMethods) {
      if (!method.static) {
        return method;
      }
    }
  }
  throw new Error("Assembly does not contain an instance method");
};

test.each(Language.values().map((l) => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const method = new InstanceMethod(transpile, findInstanceMethod()).toJson();
  expect(method).toMatchSnapshot();
  expect(markdown.visitInstanceMethod(method).render()).toMatchSnapshot();
});
