import { MockStorage } from "mock-gcs";
import { Storage } from "@google-cloud/storage";
import { BucketClient } from "../../src/target-tf-gcp/bucket.inflight";
import { vi, test, beforeEach, expect } from "vitest";
// import type { CreateWriteStreamOptions, GetSignedUrlConfig } from '@google-cloud/storage';
// import streamBuffers from 'stream-buffers';

// export class MockStorage {
//   public buckets: object;

//   public constructor() {
//     this.buckets = {};
//   }

//   public bucket(name: string): MockBucket {
//     if (this.buckets[name] === undefined) {
//       this.buckets[name] = new MockBucket(name);
//     }
//     return this.buckets[name];
//   }
// }

// export class MockBucket {
//   public name: string;

//   public files: object;

//   public constructor(name: string) {
//     this.name = name;
//     this.files = {};
//   }

//   public upload(name: string, options: any): MockFile[] {
//     return [this.file(name)];
//   }

//   public file(name: string): MockFile {
//     if (this.files[name] === undefined) {
//       this.files[name] = new MockFile(name);
//     }
//     return this.files[name];
//   }
// }

// interface Metadata {
//   metadata?: object;
// }

// export class MockFile {
//   public name: string;

//   public path?: string;

//   public contents: Buffer;

//   public metadata: {
//     metadata?: object;
//   };

//   public constructor(name: string, path?: string) {
//     this.name = name;
//     this.path = path;
//     this.contents = Buffer.alloc(0);
//     this.metadata = {};
//   }

//   public get(): [MockFile, any] {
//     return [this, this.metadata];
//   }

//   public async delete(): Promise<void> {
//     return Promise.resolve();
//   }

//   public exists(): [boolean, any] {
//     return [true, this.metadata];
//   }

//   public setMetadata(metadata: Metadata): void {
//     const customMetadata = { ...this.metadata.metadata, ...metadata.metadata };
//     this.metadata = { ...this.metadata, ...metadata, metadata: customMetadata };
//   }

//   public async getSignedUrl(options?: GetSignedUrlConfig): Promise<string> {
//     return Promise.resolve('https://example.com');
//   }

//   public createReadStream(): any {
//     const readable = new streamBuffers.ReadableStreamBuffer();
//     readable.put(this.contents);
//     readable.stop();
//     return readable;
//   }

//   public createWriteStream(options?: CreateWriteStreamOptions): any {
//     const writable = new streamBuffers.WritableStreamBuffer();
//     writable.on('finish', () => {
//       const contents = writable.getContents();
//       if (contents instanceof Buffer) {
//         this.contents = contents;
//       } else {
//         throw new Error('Invalid contents type');
//       }
//     });
//     return writable;
//   }
// }

vi.mock("@google-cloud/storage", () => ({
  Storage: MockStorage,
}));

type TestPath = "happy" | "sad" | "happyJson" | "sadJson";
let TEST_PATH: TestPath;

beforeEach(() => {
  vi.clearAllMocks;
  TEST_PATH = "happy";
});

// test("check if file exists", async () => {
//   const storage = new MockStorage();
//   const bucket = storage.bucket("test-bucket");

//   bucket.put("test-file-1", "test-content-1");
//   bucket.put("test-file-2", "test-content-2");

//   const client = new BucketClient("test-bucket", false, storage as any);
//   const exists = await client.get("test-file-2");
//   // const data = storage.bucket("test-bucket").file("test-file-1").contents.toString();
//   expect(exists).toBe("test-content-1");
// });

test("get object from bucket", async () => {

  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  // const bucket = storage.bucket(BUCKET_NAME);

  storage.bucket(BUCKET_NAME).put(KEY, VALUE);
  // bucket.put("test-file-2", "test-content-2");

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const exists = await client.get(KEY);

  expect(exists).toBe(VALUE);
});

test("put object to bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();

  // putting the object to the bucket before creating the client
  storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.put(KEY, VALUE);

  // expect equal to error
  expect(res).toBe(undefined);
});

