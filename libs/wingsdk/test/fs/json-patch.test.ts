import { patchObject } from "../../src/fs/json-patch";

const testcase = (
  description: string,
  { input, args, expected }: { input: any; args: [string, any]; expected: any }
) => {
  test(description, () => {
    expect(patchObject(input, args[0], args[1])).toStrictEqual(expected);
  });
};

testcase("simple string", {
  input: {},
  args: ["hello", "world"],
  expected: { hello: "world" },
});

testcase("simple number", {
  input: {},
  args: ["hello", 123],
  expected: { hello: 123 },
});

testcase("object includes existing keys", {
  input: {
    foo: 123,
    bar: 122,
  },
  args: ["baz", "hello"],
  expected: {
    foo: 123,
    bar: 122,
    baz: "hello",
  },
});

testcase("nested from empty", {
  input: {},
  args: ["hello.world", 42],
  expected: {
    hello: {
      world: 42,
    },
  },
});

testcase("nested from non-empty", {
  input: {
    hello: { world: { bang: 123 } },
  },
  args: ["hello.world.zoo", { boom: 123 }],
  expected: {
    hello: {
      world: {
        bang: 123,
        zoo: { boom: 123 },
      },
    },
  },
});

testcase("override existing", {
  input: {
    hello: 123,
  },
  args: ["hello", "shom"],
  expected: {
    hello: "shom",
  },
});

testcase("override primitive with nesting", {
  input: {
    hello: 123,
  },
  args: ["hello.world.poom", "shom"],
  expected: {
    hello: {
      world: {
        poom: "shom",
      },
    },
  },
});

testcase("override primitive without nesting", {
  input: {
    hello: 123,
  },
  args: ["hello", "shom"],
  expected: {
    hello: "shom",
  },
});

testcase("override primitive without one level of nesting", {
  input: {
    hello: true,
  },
  args: ["hello.jig", "shom"],
  expected: {
    hello: { jig: "shom" },
  },
});

testcase("override array", {
  input: {
    hello: [1, 2, 3],
  },
  args: ["hello.jig", "shom"],
  expected: {
    hello: { jig: "shom" },
  },
});

testcase("override undefined", {
  input: {
    hello: undefined,
  },
  args: ["hello.jig", "shom"],
  expected: {
    hello: { jig: "shom" },
  },
});

testcase("override null", {
  input: {
    hello: null,
  },
  args: ["hello.jig.12", "shom"],
  expected: {
    hello: { jig: { 12: "shom" } },
  },
});
