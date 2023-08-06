bring "cdk8s" as cdk8s;

class MyChart extends cdk8s.Chart {
  init() {
    new cdk8s.ApiObject(kind: "Pod", apiVersion: "v1");
  }
}

let c = new MyChart();
let first: Json = c.toJson().at(0);
assert(first.get("apiVersion") == "v1");
assert(first.get("kind") == "Pod");
assert(first.get("metadata").get("name").asStr().length > 0);
