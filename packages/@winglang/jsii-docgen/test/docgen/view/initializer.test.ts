import * as reflect from "jsii-reflect";
import { Language } from "../../../src";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { Initializer } from "../../../src/docgen/view/initializer";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findInitializer = (): reflect.Initializer => {
  for (const klass of assembly.system.classes) {
    if (klass.initializer) {
      return klass.initializer;
    }
  }
  throw new Error("Assembly does not contain an initializer");
};

test.each(Language.values().map((l) => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const init = new Initializer(transpile, findInitializer()).toJson();
  expect(init).toMatchSnapshot();
  expect(markdown.visitInitializer(init).render()).toMatchSnapshot();
});
