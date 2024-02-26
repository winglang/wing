import { std } from "@winglang/sdk";
import { test, expect, expectTypeOf, vi } from "vitest";
import { lift } from "../src";
import { INFLIGHT_SYMBOL } from "@winglang/sdk/lib/core/types";

interface FakeBucketClient {
  field: string;
  hi(): Promise<void>;
}
class FakeBucket implements std.ILiftable {
  _toInflight(): string {
    return "{ field: 'hi', hi: () => Promise.resolve()}";
  }
  [INFLIGHT_SYMBOL]?: FakeBucketClient;
}

test("can lift bucket", async () => {
  const bucket = new FakeBucket();
  const inflightSpy = vi.spyOn(bucket, "_toInflight");

  let x = lift({ bucket }).inflight(async ({ bucket }) => {
    expectTypeOf(bucket.hi).toEqualTypeOf<() => Promise<void>>();
    expectTypeOf(bucket.field).toEqualTypeOf<string>();
    expectTypeOf(bucket).toEqualTypeOf<FakeBucketClient>();
  });

  x._toInflight();

  expect(inflightSpy).toHaveBeenCalled();
});

test("can lift bucket with grant", async () => {
  const bucket = new FakeBucket();
  const inflightSpy = vi.spyOn(bucket, "_toInflight");

  let x = lift({ bucket })
    .grant({ bucket: [] })
    .inflight(async ({ bucket }) => {
      expectTypeOf(bucket).not.toEqualTypeOf<FakeBucketClient>();
      expectTypeOf(bucket.field).toEqualTypeOf<string>();
      expectTypeOf(bucket).not.toHaveProperty("hi");
    });

  x._toInflight();

  expect(inflightSpy).toHaveBeenCalled();
});
