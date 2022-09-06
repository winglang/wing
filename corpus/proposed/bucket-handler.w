use cloud;

let bucket = cloud::Bucket();
let bucket2 = cloud::Bucket() as "OtherBucket";

proc handler() {
  bucket->upload("file.txt", value->toString());
  bucket2->upload("dummy.txt", "go wing");
  console.log(value->toString());
}

cloud::Function(handler);
