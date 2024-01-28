import { test, expect, expectTypeOf, vi } from "vitest";
import { lift, std } from "../src";
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

  let x = lift({ bucket }).inflight(async function () {
    expectTypeOf(this.bucket.hi).toEqualTypeOf<() => Promise<void>>();
    expectTypeOf(this.bucket.field).toEqualTypeOf<string>();
    expectTypeOf(this.bucket).toEqualTypeOf<FakeBucketClient>();
  });

  x._toInflight();

  expect(inflightSpy).toHaveBeenCalled();
});

test("can lift bucket with grant", async () => {
  const bucket = new FakeBucket();
  const inflightSpy = vi.spyOn(bucket, "_toInflight");

  let x = lift({ bucket })
    .grant({ bucket: [] })
    .inflight(async function () {
      expectTypeOf(this.bucket).not.toEqualTypeOf<FakeBucketClient>();
      expectTypeOf(this.bucket.field).toEqualTypeOf<string>();
      expectTypeOf(this.bucket).not.toHaveProperty("hi");
    });

  x._toInflight();

  expect(inflightSpy).toHaveBeenCalled();
});
