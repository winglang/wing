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

  protected protectedMethod(arg: string) {
    return `Got ${arg}`;
  }
}
