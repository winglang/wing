export const CODE = `
bring cloud;
bring util;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

queue.setConsumer(inflight (message: str) => {
  bucket.put("wing.txt", "Hello, \${message}");
});

test "Hello, world" {
  queue.push("world");
  util.wait((): bool => {
    return (bucket.tryGet("wing.txt") ?? "") == "Hello, world";
  });
}
`;