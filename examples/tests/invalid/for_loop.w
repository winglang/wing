bring cloud;

let bucket = new cloud.Bucket();

for test in bucket {
        //  ^^^^^^ Unable to iterate over \\"Bucket\\"
  log(test);
}
