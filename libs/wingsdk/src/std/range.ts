export class Range {
  /**
   * Generate a range of numbers. 
   * 
   * @macro ((start, end, inclusive) => { function* iterator(start, end, inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(start, end, inclusive);})($args$)
   * 
   * @param start lower bound of the range.
   * @param end upper bound of the range.
   * @param inclusive if true, the upper bound value is included.
   * @returns a iterator.
   */
  public static of(start: number, end: number, inclusive: boolean = false): Array<number> {
    start;
    end;
    inclusive;
    throw new Error("Macro");
  }
}