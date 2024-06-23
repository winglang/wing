import { Construct } from "constructs";
import { test, expect, describe } from "vitest";
import { App } from "../../src/core/app";
import { App as SimApp } from "../../src/target-sim/app";
import { App as TfAwsApp } from "../../src/target-tf-aws/app";
import { App as TfAzureApp } from "../../src/target-tf-azure/app";
import { App as TfGcpApp } from "../../src/target-tf-gcp/app";

const FOO_FQN = "@winglang/sdk.foo.Foo";
const BAR_FQN = "@winglang/sdk.foo.Bar";
const ANOTHER_FQN = "@winglang/sdk.another.Another";

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
    /Resource \"@winglang\/sdk\.another.Another\" is not yet implemented for "awscdk" target\. Please refer to the roadmap https:\/\/github\.com\/orgs\/winglang\/projects\/3\/views\/1\?filterQuery=another\.Another/
  );
});

class MyApp extends App {
  public outdir: string = "outdir";
  public isTestEnvironment: boolean = true;
  public readonly _target = "awscdk";

  constructor() {
    super(undefined as any, "MyApp", { entrypointDir: __dirname });
  }

  public synth(): string {
    throw new Error("Method not implemented.");
  }

  protected typeForFqn(fqn: string) {
    switch (fqn) {
      case FOO_FQN:
        return MyFoo;
      case BAR_FQN:
        return Bar;
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
