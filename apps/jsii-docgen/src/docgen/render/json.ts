/**
 * Type-safe Json renderer.
 */
export class Json<T> {
  constructor(public readonly content: T) {}

  public render(): string {
    return JSON.stringify(this.content, null, 2);
  }
}
