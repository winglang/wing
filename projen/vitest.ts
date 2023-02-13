import { Component, SampleDir } from "projen";
import { NodeProject } from "projen/lib/javascript";

export class Vitest extends Component {
  constructor(project: NodeProject) {
    super(project);

    project.addDevDeps("vitest", "c8", "@vitest/coverage-c8");

    project.addGitIgnore("/coverage/");
    project.npmignore?.addPatterns("/coverage/");
    project.gitattributes.addAttributes("*.snap", "linguist-generated");

    project.testTask.exec("vitest --run --coverage");
    project.addTask("test:watch", {
      exec: "vitest",
    });

    project.removeTask("test:update");
    project.addTask("test:update", { exec: "vitest --run --update" });

    new SampleDir(project, "test", {
      files: {
        "hello.test.ts": [
          "import { test } from 'vitest';",
          "",
          "test.todo('hello');",
          "",
        ].join("\n"),
      },
    });
  }
}
