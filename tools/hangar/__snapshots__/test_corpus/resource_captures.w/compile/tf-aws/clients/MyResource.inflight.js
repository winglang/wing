class  MyResource {
  constructor({ another, array_of_str, ext_bucket, ext_num, map_of_num, my_bool, my_num, my_queue, my_resource, my_str, set_of_str, unused_resource, stateful }) {
    this.another = another;
    this.array_of_str = array_of_str;
    this.ext_bucket = ext_bucket;
    this.ext_num = ext_num;
    this.map_of_num = map_of_num;
    this.my_bool = my_bool;
    this.my_num = my_num;
    this.my_queue = my_queue;
    this.my_resource = my_resource;
    this.my_str = my_str;
    this.set_of_str = set_of_str;
    this.unused_resource = unused_resource;
    this.stateful = stateful;
  }
  async test_no_capture()  {
    {
      const arr = Object.freeze([1, 2, 3]);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr.length === 3)'`)})((arr.length === 3))};
      {console.log(`array.len=${arr.length}`)};
    }
  }
  async test_capture_collections_of_data()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.array_of_str.length === 2)'`)})((this.array_of_str.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.array_of_str.at(0)) === "s1")'`)})(((await this.array_of_str.at(0)) === "s1"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.array_of_str.at(1)) === "s2")'`)})(((await this.array_of_str.at(1)) === "s2"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.map_of_num)["k1"] === 11)'`)})(((this.map_of_num)["k1"] === 11))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.map_of_num)["k2"] === 22)'`)})(((this.map_of_num)["k2"] === 22))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.set_of_str.has("s1"))'`)})((await this.set_of_str.has("s1")))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.set_of_str.has("s2"))'`)})((await this.set_of_str.has("s2")))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(await this.set_of_str.has("s3")))'`)})((!(await this.set_of_str.has("s3"))))};
    }
  }
  async test_capture_primitives()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.my_str === "my_string")'`)})((this.my_str === "my_string"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.my_num === 42)'`)})((this.my_num === 42))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.my_bool === true)'`)})((this.my_bool === true))};
    }
  }
  async test_capture_resource()  {
    {
      (await this.my_resource.put("f1.txt","f1"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.my_resource.get("f1.txt")) === "f1")'`)})(((await this.my_resource.get("f1.txt")) === "f1"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.my_resource.list()).length === 1)'`)})(((await this.my_resource.list()).length === 1))};
    }
  }
  async test_nested_preflight_field()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.another.my_field === "hello!")'`)})((this.another.my_field === "hello!"))};
      {console.log(`field=${this.another.my_field}`)};
    }
  }
  async test_nested_resource()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.first.my_resource.list()).length === 0)'`)})(((await this.another.first.my_resource.list()).length === 0))};
      (await this.another.first.my_resource.put("hello",this.my_str));
      {console.log(`this.another.first.my_resource:${(await this.another.first.my_resource.get("hello"))}`)};
    }
  }
  async test_expression_recursive()  {
    {
      (await this.my_queue.push(this.my_str));
    }
  }
  async test_external()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.ext_bucket.list()).length === 0)'`)})(((await this.ext_bucket.list()).length === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.ext_num === 12)'`)})((this.ext_num === 12))};
    }
  }
  async test_user_defined_resource()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.meaning_of_life()) === 42)'`)})(((await this.another.meaning_of_life()) === 42))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.another_func()) === "42")'`)})(((await this.another.another_func()) === "42"))};
    }
  }
  async test_inflight_field()  {
    {
      this.inflight_field = 123;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.inflight_field === 123)'`)})((this.inflight_field === 123))};
    }
  }
}
exports.MyResource = MyResource;
