bring cloud;

let bucket = new cloud.Bucket();

new cloud.Function(inflight () => {
    bucket.put("hello", "world");
    bucket.public_url("hello");
//         ^^^^^^^^^^ Error: Cannot provide public url for a non-public bucket

}) as "test";