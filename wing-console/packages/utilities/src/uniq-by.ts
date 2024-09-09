/**
 * Creates a duplicate-free version of an array, in which only the first occurrence of each element is kept.
 * The iteratee is invoked for each element in the array to generate the criterion by which uniqueness is computed.
 *
 * @param array - The array to inspect.
 * @param iteratee - The iteratee invoked per element.
 * @returns Returns the new duplicate-free array.
 */
export function uniqBy<T, U>(array: T[], iteratee: (item: T) => U): T[] {
  const seen = new Set<U>();
  return array.filter((item) => {
    const key = iteratee(item);
    if (seen.has(key)) {
      return false;
    } else {
      seen.add(key);
      return true;
    }
  });
}
