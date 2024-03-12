import {
  SIMULATOR_TOKEN_REGEX,
  SIMULATOR_TOKEN_REGEX_FULL,
} from "../target-sim/tokens";

type Token = {
  path: string;
  attr?: string;
  prop?: string;
};

export function parseToken(s: string): Token {
  const ref = s.slice(2, -1);
  const parts = ref.split("#");
  if (parts.length !== 3) {
    throw new Error(`Invalid token reference: ${s}`);
  }

  const [_, path, rest] = parts;

  if (rest.startsWith("attrs.")) {
    const attrName = rest.slice(6);
    return { path, attr: attrName };
  } else if (rest.startsWith("props.")) {
    const propPath = rest.slice(6);
    return { path, prop: propPath };
  } else {
    throw new Error(`Invalid token reference: ${s}`);
  }
}

type TokenResolver = (token: Token) => string;

/**
 * Return an object with all tokens in it resolved to their appropriate values.
 *
 * A token can be a string like "${app/my_bucket#attrs.handle}". This token would be resolved to
 * the "handle" attribute of the resource at path "app/my_bucket". If that attribute does not
 * exist at the time of resolution (for example, if my_bucket is not being simulated yet), an
 * error will be thrown.
 *
 * Tokens can also be nested, like "${app/my_bucket#attrs.handle}/foo/bar".
 *
 * @param obj The object to resolve tokens in.
 * @returns The resolved token or throws an error if the token cannot be resolved.
 */
export function resolveTokens(obj: any, resolver: TokenResolver): any {
  if (obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    // there are two cases - a token can be the entire string, or it can be part of the string.
    // first, check if the entire string is a token
    if (SIMULATOR_TOKEN_REGEX_FULL.test(obj)) {
      return resolver(parseToken(obj));
    }

    // otherwise, check if the string contains tokens inside it. if so, we need to resolve them
    // and then check if the result is a string
    const globalRegex = new RegExp(SIMULATOR_TOKEN_REGEX.source, "g");
    const matches = obj.matchAll(globalRegex);
    const replacements = [];
    for (const match of matches) {
      const value = resolveTokens(match[0], resolver);

      if (typeof value !== "string") {
        throw new Error(
          `Expected token "${
            match[0]
          }" to resolve to a string, but it resolved to ${typeof value}.`
        );
      }

      replacements.push({ match, value });
    }

    // replace all the tokens in reverse order, and return the result
    // if a token returns another token (god forbid), do not resolve it again
    let result = obj;
    for (const { match, value } of replacements.reverse()) {
      if (match.index === undefined) {
        throw new Error(`unexpected error: match.index is undefined`);
      }
      result =
        result.slice(0, match.index) +
        value +
        result.slice(match.index + match[0].length);
    }

    return result;
  }

  if (Array.isArray(obj)) {
    const result = [];
    for (const x of obj) {
      const value = resolveTokens(x, resolver);
      result.push(value);
    }

    return result;
  }

  if (typeof obj === "object") {
    const ret: any = {};
    for (const [key, v] of Object.entries(obj)) {
      ret[key] = resolveTokens(v, resolver);
    }
    return ret;
  }

  return obj;
}
