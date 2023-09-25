bring cloud;

let make_name = (): str => {
  return "bucket" + "-name";
};

let bucket1 = new cloud.Bucket() as "${make_name()}";
let bucket2 = new cloud.Bucket() as "${make_name()}";