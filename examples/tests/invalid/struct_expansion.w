bring cloud;

let bucket1 = new cloud.Bucket(bublic: false, public: true);
                             //^^^^^^ "bublic" is not a field of "BucketProps"


let bucket2 = new cloud.Bucket(2, public: true);
                             //^^^^^^^^^^^^^^^ Expected between 0 and 1 arguments but got 2 when instantiating "Bucket"

let handler = inflight (event: str): str => {
  bucket1.put(file: "file.txt", "data");
            //^^^^^^^^^^^^^^^^ Named arguments must be after positional arguments
};

let x = cloud.ApiResponse {
  body: "Hello, world!",
};
// ^^^ "status" is not initialized

let y = cloud.ApiResponse {
  status: 200,
  not_a_field: 500,
// ^^^^^^^^^^^ "not_a_field" is not a field of "ApiResponse"
};

new cloud.Function(
  handler, 
  cloud.FunctionProps {
    env: Map<str> {},
    timeout: 1m,
    memory: 256
  }
);
