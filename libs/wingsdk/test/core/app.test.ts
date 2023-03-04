import { Construct } from "constructs";
import { test, expect } from "vitest";
import { App } from "../../src/core/app";

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
