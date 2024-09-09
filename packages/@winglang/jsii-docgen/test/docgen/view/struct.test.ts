import * as reflect from "jsii-reflect";
import { Language } from "../../../src";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { Struct } from "../../../src/docgen/view/struct";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findStruct = (): reflect.InterfaceType => {
  for (const iface of assembly.interfaces) {
    if (iface.datatype) {
      return iface;
    }
  }
  throw new Error("Assembly does not contain a struct");
};

test.each(Language.values().map((l) => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const struct = new Struct(transpile, findStruct()).toJson();
  expect(struct).toMatchSnapshot();
  expect(markdown.visitStruct(struct).render()).toMatchSnapshot();
});
