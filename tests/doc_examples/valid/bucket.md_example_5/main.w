// This file was auto generated from an example found in: bucket.md_example_5
// Example metadata: {"valid":true}
bring cloud;

let uploads = new cloud.Bucket(
  // these are the default values
  public: false,
  cors: true,
  corsOptions: {
    allowedMethods: [http.HttpMethod.GET, http.HttpMethod.POST, http.HttpMethod.PUT, http.HttpMethod.DELETE, http.HttpMethod.HEAD]
    allowedOrigins: ["*"],
    allowedHeaders: ["*"],
    exposeHeaders: [],
    maxAge: 0s
  },
)
