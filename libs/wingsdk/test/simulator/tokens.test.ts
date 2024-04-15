import { test, describe, expect } from "vitest";
import { parseToken, resolveTokens } from "../../src/simulator/tokens";

describe("parseToken", () => {
  test("parses path", () => {
    expect(parseToken("${wsim#foo#attrs.bar}")?.path).toBe("foo");
    expect(parseToken("${wsim#foo/jang/bang#props.bar}")?.path).toBe(
      "foo/jang/bang"
    );
  });

  test("parses attribute", () => {
    const result = parseToken("${wsim#foo/lang#attrs.bar}");
    expect(result?.path).toBe("foo/lang");
    expect(result?.attr).toBe("bar");
    expect(result?.prop).toBeUndefined();
  });

  test("parses property", () => {
    const result = parseToken("${wsim#foo#props.bar}");
    expect(result?.path).toBe("foo");
    expect(result?.prop).toBe("bar");
    expect(result?.attr).toBeUndefined();
  });

  test("invalid tokens", () => {
    expect(() => parseToken("${foo#baz}")).toThrow(/Invalid token reference/);
    expect(() => parseToken("${wsim#foo#baz}")).toThrow(
      /Invalid token reference/
    );
  });
});

describe("tryResolveTokens", () => {
  test("undefined", () => {
    expect(resolveTokens(undefined, () => "foo")).toBeUndefined();
  });

  test("terminal token", () => {
    expect(
      resolveTokens("${wsim#foo/bar#attrs.bar}", (token) => {
        expect(token.path).toBe("foo/bar");
        expect(token.attr).toBe("bar");
        expect(token.prop).toBeUndefined();
        return "resolved_token";
      })
    ).toBe("resolved_token");

    expect(
      resolveTokens("${wsim#foo/bar#props.bar}", (token) => {
        expect(token.path).toBe("foo/bar");
        expect(token.prop).toBe("bar");
        expect(token.attr).toBeUndefined();
        return "resolved_token_2";
      })
    ).toBe("resolved_token_2");
  });

  test("nested token inside a string", () => {
    expect(
      resolveTokens(
        "hello, I am a ${wsim#foo/bar#attrs.tttt} inside a ${wsim#bing/bang#props.vvv}",
        (token) => {
          if (token.path === "foo/bar" && token.attr === "tttt") {
            return "cool nested token";
          }

          if (token.path === "bing/bang" && token.prop === "vvv") {
            return "cool string";
          }

          expect.fail(`unexpected token: ${JSON.stringify(token)}`);
        }
      )
    ).toBe("hello, I am a cool nested token inside a cool string");
  });

  test("tokens within an array", () => {
    const result = resolveTokens(
      [
        "bla",
        "${wsim#foo/bar#attrs.tttt}",
        "blabla",
        "nested nested ${wsim#bing/bang#props.vvv} nested",
      ],
      (token) => {
        if (token.path === "foo/bar" && token.attr === "tttt") {
          return "T1";
        }

        if (token.path === "bing/bang" && token.prop === "vvv") {
          return "T2";
        }

        expect.fail(`unexpected token: ${JSON.stringify(token)}`);
      }
    );

    expect(result).toEqual(["bla", "T1", "blabla", "nested nested T2 nested"]);
  });

  test("tokens within an object", () => {
    const result = resolveTokens(
      {
        key1: "bla",
        key2: "${wsim#foo/bar#attrs.tttt}",
        key3: {
          bang: ["nested nested ${wsim#bing/bang#props.vvv} nested"],
          bing: {
            jone: "${wsim#foo/bar#attrs.tttt}",
          },
        },
      },
      (token) => {
        if (token.path === "foo/bar" && token.attr === "tttt") {
          return "T1";
        }

        if (token.path === "bing/bang" && token.prop === "vvv") {
          return "T2";
        }

        expect.fail(`unexpected token: ${JSON.stringify(token)}`);
      }
    );

    expect(result).toEqual({
      key1: "bla",
      key2: "T1",
      key3: {
        bang: ["nested nested T2 nested"],
        bing: {
          jone: "T1",
        },
      },
    });
  });
});
