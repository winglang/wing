import * as reflect from "jsii-reflect";
import { Language } from "../../../src";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { StaticFunction } from "../../../src/docgen/view/static-function";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findStaticFunction = (): reflect.Method => {
  for (const klass of assembly.system.classes) {
    for (const method of klass.ownMethods) {
      if (method.static) {
        return method;
      }
    }
  }
  throw new Error("Assembly does not contain a static function");
};

test.each(Language.values().map(l => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const func = new StaticFunction(transpile, findStaticFunction()).toJson();
  expect(func).toMatchSnapshot();
  expect(markdown.visitStaticFunction(func).render()).toMatchSnapshot();
});
