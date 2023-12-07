import type { App, AppProps } from "./app";
import { Node, TestRunner } from "../std";

export function synthRoots(app: App, props: AppProps) {
  if (app.isTestEnvironment) {
    app._testRunner = new TestRunner(app, "cloud.TestRunner");
  }

  if (props.rootConstruct) {
    const Root = props.rootConstruct;

    // mark the root type so that we can find it later through
    // Node.of(root).root
    Node._markRoot(Root);

    if (app.isTestEnvironment) {
      new Root(app, "env0");
      const tests = app._testRunner!.findTests();
      for (let i = 1; i < tests.length; i++) {
        new Root(app, "env" + i);
      }
    } else {
      new Root(app, "Default");
    }
  }
}
