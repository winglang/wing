export class ClassWithInnerType {}

export namespace ClassWithInnerType {
  /** This type cannot be referenced in wing (yet) */
  export interface InnerStruct {
    readonly field: string;
  }
}

export class JsiiClass {
  /** @internal */
  _field: number;

  constructor(value: number) {
    this._field = value;
  }

  public field(): number {
    return this._field;
  }

  public publicMethod(arg: string) {
    return `Got ${arg}`;
  }

  public applyClosure(num: number, closure: IFakeClosure): number {
    return closure(num);
  }

  protected protectedMethod(arg: string) {
    return `Got ${arg}`;
  }

  public static staticMethod(arg: string) {
    return `Got ${arg}`;
  }

  public methodWithStructParam(s: ClassWithInnerType.InnerStruct): string {
    return s.field;
  }
}

export class JsiiClassWithPrivateConstructor {
  private constructor() {}

  public static makeInstance(): JsiiClassWithPrivateConstructor {
    return new JsiiClassWithPrivateConstructor();
  }
}

/**
 * @callable
 */
export interface IFakeClosure {
  /** @internal */
  (x: number): number;

  fn(x: number): number;
}

export interface SomeStruct {
  readonly field: string;
}

export interface ISomeInterface {
  method(): void;
}
