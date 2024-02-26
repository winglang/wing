import * as reflect from "jsii-reflect";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { Language } from "../../../src/docgen/transpile/transpile";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { Interface } from "../../../src/docgen/view/interface";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findInterface = (): reflect.InterfaceType => {
  for (const iface of assembly.interfaces) {
    if (!iface.datatype) {
      return iface;
    }
  }
  throw new Error("Assembly does not contain an interface");
};

test.each(Language.values().map(l => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const iface = new Interface(transpile, findInterface()).toJson();
  expect(iface).toMatchSnapshot();
  expect(markdown.visitInterface(iface).render()).toMatchSnapshot();
});
