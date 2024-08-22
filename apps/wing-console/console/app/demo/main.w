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

