bring cloud;

let bucket = new cloud.Bucket();

for test in bucket {
          //^ "cloud.Bucket" is not iterable
  print(test);
}
