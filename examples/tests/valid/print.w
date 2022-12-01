bring cloud;

let bucket1 = new cloud.Bucket();

print("Hello world!");

new cloud.Function((event: str): str ~> {
  print(event);
});
