bring cloud;

let b = new cloud.Bucket();

new cloud.Function(inflight () => {

  let json_obj1 = Json { test: "test1" };
  let json_obj2 = Json { test: "test2" };

  b.put_json("test1.txt", json_obj1);
  b.put_json("test2.txt", json_obj2);

  let test_json1 = b.get_json("test1.txt");
  let test_json2 = b.get_json("test2.txt");
  
  assert(test_json1.get("test") == json_obj1.get("test"));
  assert(test_json2.get("test") == json_obj2.get("test"));

  let json_obj3 = Json { test: "test3" };
  b.put_json("test3.txt", json_obj3);
  let test_json3 = b.get_json("test3.txt");
  assert(test_json1.get("test3") == json_obj1.get("test3"));
  
}) as "test:put_json";