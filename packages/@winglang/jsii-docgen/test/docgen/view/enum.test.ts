import * as reflect from "jsii-reflect";
import { MarkdownRenderer } from "../../../src/docgen/render/markdown-render";
import { Language } from "../../../src/docgen/transpile/transpile";
import { LANGUAGE_SPECIFIC } from "../../../src/docgen/view/documentation";
import { Enum } from "../../../src/docgen/view/enum";
import { Assemblies } from "../assemblies";

const assembly: reflect.Assembly = Assemblies.instance.withoutSubmodules;

const metadata = {
  packageName: assembly.name,
  packageVersion: assembly.version,
};

const findEnum = (): reflect.EnumType => {
  if (assembly.enums[0]) {
    return assembly.enums[0];
  }
  throw new Error("Assembly does not contain an emum");
};

test.each(Language.values().map((l) => l.name))("%s snapshot", (language) => {
  const { transpile } = LANGUAGE_SPECIFIC[language.toString()];
  const markdown = new MarkdownRenderer({ language, ...metadata });
  const enu = new Enum(transpile, findEnum()).toJson();
  expect(enu).toMatchSnapshot();
  expect(markdown.visitEnum(enu).render()).toMatchSnapshot();
});
