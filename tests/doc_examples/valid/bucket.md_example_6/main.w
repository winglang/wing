// This file was auto generated from an example found in: bucket.md_example_6
// Example metadata: {"valid":true}
bring cloud;

let bucket = new cloud.Bucket(
  cors: false, // disable any default CORS rules
);

bucket.addCorsRule({
  allowedOrigins: ["https://example.com"],
});
