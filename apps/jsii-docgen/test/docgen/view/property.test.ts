import * as reflect from "jsii-reflect";
import { Language } from "../../../src";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { Property } from "../../../src/docgen/view/property";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findProperty = (): reflect.Property => {
  for (const iface of assembly.system.interfaces) {
    if (iface.allProperties.length > 0) {
      return iface.allProperties[0];
    }
  }
  throw new Error("Assembly does not contain a property");
};

test.each(Language.values().map(l => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const prop = new Property(transpile, findProperty()).toJson();
  expect(prop).toMatchSnapshot();
  expect(markdown.visitProperty(prop).render()).toMatchSnapshot();
});
