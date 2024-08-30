// taken from node 18 https://github.com/nodejs/node/blob/v18.x/lib/internal/util/comparisons.js

import {
  isAnyArrayBuffer,
  isArrayBufferView,
  isDate,
  isMap,
  isRegExp,
  isSet,
  isNativeError,
  isBoxedPrimitive,
  isNumberObject,
  isStringObject,
  isBooleanObject,
  isSymbolObject,
  isFloat32Array,
  isFloat64Array,
} from "util/types";

const kNoIterator = 0;
const kIsArray = 1;
const kIsSet = 2;
const kIsMap = 3;

export function deepStrictEqual(val1: any, val2: any, memos?: any) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return Object.is(val1, val2);
  }

  // Check more closely if val1 and val2 are equal.
  if (typeof val1 !== "object") {
    return typeof val1 === "number" && Number.isNaN(val1) && Number.isNaN(val2);
  }
  if (typeof val2 !== "object" || val1 === null || val2 === null) {
    return false;
  }
  if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
    return false;
  }

  const val1Tag = val1.toString();
  const val2Tag = val2.toString();

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (!Array.isArray(val2) || val1.length !== val2.length) {
      return false;
    }
    const keys1 = getOwnNonIndexProperties(val1); // 179
    const keys2 = getOwnNonIndexProperties(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, memos, kIsArray, keys1);
  } else if (val1Tag === "[object Object]") {
    return keyCheck(val1, val2, memos, kNoIterator);
  } else if (isDate(val1)) {
    if (!isDate(val2) || val1.getTime() !== val2.getTime()) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (
      (!isNativeError(val2) && !(val2 instanceof Error)) ||
      val1.message !== val2.message ||
      val1.name !== val2.name
    ) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    }

    if (
      !areSimilarTypedArrays(val1, val2) &&
      !isFloat32Array(val1) &&
      !isFloat64Array(val1)
    ) {
      return false;
    }
    // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.
    const keys1 = getOwnNonIndexProperties(val1);
    const keys2 = getOwnNonIndexProperties(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, memos, kNoIterator, keys1);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!isAnyArrayBuffer(val2) || !areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1)) {
    if (!isEqualBoxedPrimitive(val1, val2)) {
      return false;
    }
  } else if (
    Array.isArray(val2) ||
    isArrayBufferView(val2) ||
    isSet(val2) ||
    isMap(val2) ||
    isDate(val2) ||
    isRegExp(val2) ||
    isAnyArrayBuffer(val2) ||
    isBoxedPrimitive(val2) ||
    isNativeError(val2) ||
    val2 instanceof Error
  ) {
    return false;
  }
  return keyCheck(val1, val2, memos, kNoIterator);
}

function keyCheck(
  val1: any,
  val2: any,
  memos: any,
  iterationType: number,
  aKeys?: Array<any>
) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 4) {
    aKeys = Object.keys(val1);
    const bKeys = Object.keys(val2);

    // The pair must have the same number of owned properties.
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  }

  // Cheap key test
  let i = 0;
  for (; i < aKeys!.length; i++) {
    if (!val2.propertyIsEnumerable(aKeys![i])) {
      return false;
    }
  }

  if (arguments.length === 4) {
    const symbolKeysA = Object.getOwnPropertySymbols(val1);
    if (symbolKeysA.length !== 0) {
      let count = 0;
      for (i = 0; i < symbolKeysA.length; i++) {
        const key = symbolKeysA[i];
        if (val1.propertyIsEnumerable(key)) {
          if (!val2.propertyIsEnumerable(val2, key)) {
            return false;
          }
          aKeys!.push(aKeys, key);
          count++;
        } else if (val2.propertyIsEnumerable(val2, key)) {
          return false;
        }
      }
      const symbolKeysB = Object.getOwnPropertySymbols(val2);
      if (
        symbolKeysA.length !== symbolKeysB.length &&
        getEnumerables(val2, symbolKeysB).length !== count
      ) {
        return false;
      }
    } else {
      const symbolKeysB = Object.getOwnPropertySymbols(val2);
      if (
        symbolKeysB.length !== 0 &&
        getEnumerables(val2, symbolKeysB).length !== 0
      ) {
        return false;
      }
    }
  }

  if (
    aKeys!.length === 0 &&
    (iterationType === kNoIterator ||
      (iterationType === kIsArray && val1.length === 0) ||
      val1.size === 0)
  ) {
    return true;
  }

  // Use memos to handle cycles.
  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0,
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    const val2MemoA = memos.val1.get(val1);
    if (val2MemoA !== undefined) {
      const val2MemoB = memos.val2.get(val2);
      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }
    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);

  const areEq = objEquiv(val1, val2, aKeys, memos, iterationType);

  memos.val1.delete(val1);
  memos.val2.delete(val2);

  return areEq;
}

function objEquiv(
  a: any,
  b: any,
  keys: any,
  memos: any,
  iterationType: Number
) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  let i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (a.hasOwnProperty(i)) {
        if (!b.hasOwnProperty(i) || !deepStrictEqual(a[i], b[i], memos)) {
          return false;
        }
      } else if (b.hasOwnProperty(i)) {
        return false;
      } else {
        // Array is sparse.
        const keysA = Object.keys(a);
        for (; i < keysA.length; i++) {
          const key = keysA[i];
          if (
            !b.hasOwnProperty(key) ||
            !deepStrictEqual(a[key], b[key], memos)
          ) {
            return false;
          }
        }
        if (keysA.length !== Object.keys(b).length) {
          return false;
        }
        return true;
      }
    }
  }

  // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:
  for (i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!deepStrictEqual(a[key], b[key], memos)) {
      return false;
    }
  }
  return true;
}

function setEquiv(a: any, b: any, memo: any) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  let set = null;
  for (const val of a) {
    // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.
    if (typeof val === "object" && val !== null) {
      if (set === null) {
        set = new Set();
      }
      // If the specified value doesn't exist in the second set it's a non-null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something that's deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.
      set.add(val);
    } else if (!b.has(val)) {
      return false;
    }
  }

  if (set !== null) {
    for (const val of b) {
      // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.
      if (typeof val === "object" && val !== null) {
        if (!setHasEqualElement(set, val, memo)) return false;
      }
    }
    return set.size === 0;
  }

  return true;
}

function setHasEqualElement(set: any, val1: any, memo: any) {
  // Go looking.
  for (const val2 of set) {
    if (deepStrictEqual(val1, val2, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a: any, b: any, memo: any) {
  let set = null;

  for (const { 0: key, 1: item1 } of a) {
    if (typeof key === "object" && key !== null) {
      if (set === null) {
        set = new Set();
      }
      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      const item2 = b.get(key);
      if (
        (item2 === undefined && !b.has(key)) ||
        !deepStrictEqual(item1, item2, memo)
      ) {
        return false;
      }
    }
  }

  if (set !== null) {
    for (const { 0: key, 1: item } of b) {
      if (typeof key === "object" && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, memo)) return false;
      }
    }
    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(
  set: Set<any>,
  map: Map<any, any>,
  key1: any,
  item1: any,
  memo: any
) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  for (const key2 of set) {
    if (
      deepStrictEqual(key1, key2, memo) &&
      deepStrictEqual(item1, map.get(key2), memo)
    ) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function isEqualBoxedPrimitive(val1: any, val2: any) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && Object.is(val1.valueOf(), val2.valueOf());
  }
  if (isStringObject(val1)) {
    return isStringObject(val2) && val1.valueOf() === val2.valueOf();
  }
  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && val1.valueOf() === val2.valueOf();
  }
  if (isSymbolObject(val1)) {
    return isSymbolObject(val2) && val1.valueOf() === val2.valueOf();
  }
  throw new Error(`Unknown boxed type ${val1}`);
}

function areEqualArrayBuffers(buf1: ArrayBufferLike, buf2: ArrayBufferLike) {
  return (
    buf1.byteLength === buf2.byteLength &&
    Buffer.compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0
  );
}

function areSimilarTypedArrays(a: ArrayBufferView, b: ArrayBufferView) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  return (
    Buffer.compare(
      new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
      new Uint8Array(b.buffer, b.byteOffset, b.byteLength)
    ) === 0
  );
}

function isNonIndex(key: any) {
  if (key.length === 0 || key.length > 10) return true;
  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  }
  // The maximum size for an array is 2 ** 32 -1.
  return key.length === 10 && key >= Math.pow(2, 32);
}
const getOwnNonIndexProperties = (val1: any) => {
  if (!val1?.getOwnPropertySymbols) {
    return [];
  }
  return (
    Object.keys(val1)
      .filter(isNonIndex)
      .concat(
        val1
          ?.getOwnPropertySymbols(val1)
          .filter(Object.prototype.propertyIsEnumerable.bind(val1))
      ) ?? []
  );
};

function getEnumerables(val: Object, keys: Array<any>) {
  return keys.filter((k) => val.propertyIsEnumerable(k));
}

function areSimilarRegExps(a: RegExp, b: RegExp) {
  return (
    a.source === b.source && a.flags === b.flags && a.lastIndex === b.lastIndex
  );
}
