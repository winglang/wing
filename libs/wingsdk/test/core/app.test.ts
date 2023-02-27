import { Construct } from "constructs";
import { App } from "../../src/core/app";

describe("new()", () => {
  test("allows derived classes to override", () => {
    const app = new MyApp();
    const foo = app.new("foo", undefined, app, "foo");
    expect(foo).toBeInstanceOf(Foo);
  });

  test("will fallback to ctor if defined", () => {
    const app = new MyApp();
    const bar = app.new("damndamndamn", Bar, app, "bar");
    expect(bar).toBeInstanceOf(Bar);
  });

  test("will throw an error if ctor is undefined", () => {
    const app = new MyApp();
    expect(() => app.new("damndamndamn", undefined, app, "bar")).toThrow(
      /Unable to create an instance of abstract type \"damndamndamn\" for this target/
    );
  });
});
class MyApp extends App {
  public outdir: string = "outdir";

  constructor() {
    super(undefined as any, "MyApp");
  }

  public synth(): string {
    throw new Error("Method not implemented.");
  }

  public new(
    fqn: string,
    ctor: any,
    scope: Construct,
    id: string,
    ...args: any[]
  ) {
    if (fqn == "foo") {
      return new Foo(scope, id);
    }

    return super.new(fqn, ctor, scope, id, ...args);
  }
}

class Foo extends Construct {}
class Bar extends Construct {}
