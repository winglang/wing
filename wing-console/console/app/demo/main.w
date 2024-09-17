bring cloud;
bring ui;
bring util;
bring sim;


let tableBucket = new cloud.Bucket() as "TableBucket";
let visual = new ui.Table(
  scan: inflight () => {
    return [
      { age: { value: "34" }, name: "John" },
      { age: { value: "25" }, name: "Alice" },
      { age: { value: "40" }, name: "Bob" },
    ];
  },
) as "ui.Table" in tableBucket;

test "presigned url" {
  let bucket = new cloud.Bucket() as "Bucket";
  let obj = new cloud.Object() as "Object";
  // let url = obj.getPresignedUrl({ action: "get" });
  // log(url);
  // assert eq(url, "https://minio.example.com/bucket/object?action=get&validUntil=1714857600");
}
