bring cloud;

let b = new cloud.Bucket();
let file_name = "file.json";

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


let get_json = new cloud.Function(inflight(msg: str): str => {
  let x = b.get_json(file_name);
  assert(x.get("persons").get_at(0).get("fears").get_at(1) == "failure");
});

test "put" {
  b.put_json(file_name, j);
  get_json.invoke("");
}
