export function patchObject(obj: any, path: string, value: any) {
  const components = path.split(".");
  let curr = obj;

  while (components.length > 1) {
    const next = components.shift()!;
    curr = curr[next] = isObject(curr[next]) ? curr[next] : {};
  }

  curr[components[0]] = value;
  return obj;
}

const isObject = (x: any) => {
  if (x === undefined) {
    return false;
  }

  if (x === null) {
    return false;
  }

  if (typeof x !== "object") {
    return false;
  }

  if (Array.isArray(x)) {
    return false;
  }

  return true;
};
