bring cloud;

let b1 = new cloud.Bucket() as "b1";
let b2 = new cloud.Bucket(public: true) as "public";


b1.addObject("a", "1");
b1.addFile("b", "./put.test.w");

new cloud.Function(inflight () => {
  b1.put("b", "2");
  b1.putJson("json", {b: 2});
  b1.put("total", b1.list().join("\n"));
}) as "put, putJson, list 1";

new cloud.Function(inflight () => {
  b1.put("get b", b1.get("b"));
  b1.putJson("get json", b1.getJson("json"));
  b1.put("try get x", b1.tryGet("x") ?? "no x");
  b1.putJson("try get json x", b1.tryGetJson("x") ?? {res: "no x"});
}) as "get, getJson, tryGet, tryGetJson 2";

new cloud.Function(inflight () => {
  b2.put("key", "val");
  // b1.put("signedUrl", b1.signedUrl("b"));
  b1.put("publicUrl", b2.publicUrl("key"));
  b1.put("non exists", "${b1.exists("x")}");
  b1.put("exists", "${b1.exists("b")}");
  
}) as "exists, signedUrl, publicUrl 3";

new cloud.Function(inflight () => {
  b2.put("tryDelete", "${b1.tryDelete("x")}");
  for item in b1.list() {
    b1.delete(item);
  } 
}) as "delete, tryDelete 4";

