// This file was auto generated from an example found in: function.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let big = new cloud.Bucket();

big.addObject("bigdata.json", Json.stringify({
  "my-key": "my-value"
}));

class MyDatabase {
  inflight bigdata: Json;
  inflight new() {
    // download big data once
    this.bigdata = big.getJson("bigdata.json");
  }

  pub inflight query(key: str): Json {
    return this.bigdata.get(key);
  }
}

let db = new MyDatabase();

new cloud.Function(inflight () => {
  log(Json.stringify(db.query("my-key")));
});
