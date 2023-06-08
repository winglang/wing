bring cloud;

let b = new cloud.Bucket();
let fileName = "file.json";

let j = Json {
  persons: [
    {
      age: 30,
      name: "hasan",
      fears: [
        "heights",
        "failure"
      ]
    }
  ]
};


let getJson = new cloud.Function(inflight(msg: str) -> str {
  let x = b.getJson(fileName);
  assert(x.get("persons").getAt(0).get("fears").getAt(1) == "failure");
});

test "put" {
  b.putJson(fileName, j);
  getJson.invoke("");
}
