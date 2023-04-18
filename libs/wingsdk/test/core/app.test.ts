import { Construct } from "constructs";
import { test, expect, describe } from "vitest";
import { App } from "../../src/core/app";
import { App as AwsCdkApp } from "../../src/target-awscdk/app";
import { App as SimApp } from "../../src/target-sim/app";
import { App as TfAwsApp } from "../../src/target-tf-aws/app";
import { App as TfAzureApp } from "../../src/target-tf-azure/app";
import { App as TfGcpApp } from "../../src/target-tf-gcp/app";

const FOO_FQN = "@lib/foo.Foo";
const BAR_FQN = "@lib/foo.Bar";
const ANOTHER_FQN = "@lib/another.Another";

test("new() allows derived classes to inject a different implementation", () => {
  const app = new MyApp();
  const foo = app.new(FOO_FQN, Foo, app, "foo", 99);
  expect(foo).toBeInstanceOf(MyFoo);
  expect(foo.hi()).toEqual("hi 99");
});

test("newAbstract() allows derived classes to inject a different implementation", () => {
  const app = new MyApp();
  const foo = app.newAbstract(BAR_FQN, app, "my-bar");
  expect(foo).toBeInstanceOf(Bar);
});

test("new() defaults to just creating an instance", () => {
  const app = new MyApp();
  const bar = app.new(ANOTHER_FQN, Bar, app, "bar");
  expect(bar).toBeInstanceOf(Bar);
});

test("newAbstract() throws if there is no implementation", () => {
  const app = new MyApp();
  expect(() => app.newAbstract(ANOTHER_FQN, app, "bar")).toThrow(
    /Unable to create an instance of abstract type \"@lib\/another.Another\" for this target/
  );
});

describe("appForTarget", () => {
  const map = {
    sim: SimApp,
    "tf-aws": TfAwsApp,
    "tf-azure": TfAzureApp,
    "tf-gcp": TfGcpApp,
    awscdk: AwsCdkApp,
  };

  for (const [target, app] of Object.entries(map)) {
    test(`returns the app for the target "${target}"`, () => {
      const appActual = App.for(target);
      expect(appActual.constructor).equal(app.constructor);
    });
  }
});

class MyApp extends App {
  public outdir: string = "outdir";

  constructor() {
    super(undefined as any, "MyApp");
  }

  public synth(): string {
    throw new Error("Method not implemented.");
  }

  protected tryNew(fqn: string, scope: Construct, id: string, ...args: any[]) {
    switch (fqn) {
      case FOO_FQN:
        return new MyFoo(scope, id, args[0]);
      case BAR_FQN:
        return new Bar(scope, id);
    }

    return undefined;
  }
}

class Foo extends Construct {
  constructor(scope: Construct, id: string, public arg: number) {
    super(scope, id);
  }
}

class MyFoo extends Foo {
  public hi() {
    return `hi ${this.arg}`;
  }
}

abstract class BarBase extends Construct {}

class Bar extends BarBase {}
