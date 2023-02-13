import { Component } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class TsxRunner extends Component {
  constructor(project: TypeScriptProject) {
    super(project);

    project.addPackageIgnore("/.projenrc.ts");

    project.deps.removeDependency("ts-node");
    project.addDevDeps("tsx");
    project.defaultTask?.reset();
    project.defaultTask?.exec("tsx .projenrc.ts");
  }
}
