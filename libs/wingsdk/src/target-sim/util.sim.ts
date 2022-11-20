export class RandomArrayIterator<T = any> implements Iterable<T> {
  private length: number;
  constructor(private readonly values: T[]) {
    this.length = this.values.length;
  }

  next() {
    if (this.length === 0) {
      return { done: true, value: undefined } as { done: true; value: T };
    }

    const i = Math.floor(Math.random() * this.length);
    const j = --this.length;
    const value = this.values[i];

    this.values[i] = this.values[j];
    this.values[j] = value;

    return { done: false, value } as { done: false; value: T };
  }

  [Symbol.iterator]() {
    return this;
  }
}
