/**
 * Range
 */

export class Range {
  /**
   * Generate a range of numbers.
   *
   * @param start lower bound of the range.
   * @param end upper bound of the range.
   * @param inclusive if true, the upper bound value is included.
   * @returns a iterator.
   */
  public static of(
    start: number,
    end: number,
    inclusive: boolean = false
  ): Array<number> {
    function* iterator(s: number, e: number, i: boolean) {
      let x = s;
      let limit = i ? (e < s ? e - 1 : e + 1) : e;
      while (x < limit) yield x++;
      while (x > limit) yield x--;
    }

    return Array.from(iterator(start, end, inclusive));
  }
}
