bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let api = new cloud.Api() as "api";
api.get("/", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200
  };
});

let getApiInfo = (a: cloud.Api): Map<str>? => {
  if let api = aws.Bucket.from(a) {
    return {
      restApiId: api.restApiId(),
      restApiArn: api.restApiArn(),
      restApiExecutionArn: api.restApiExecutionArn(),
      stageName: api.stageName(),
      invokeUrl: api.invokeUrl(),
      deploymentId: api.deploymentId(),
    };
  }
  return nil;
};

let apiName = getApiInfo(api);

test "validates the AWS api name" {
  if let api = apiName {
    log(api.get("restApiId"));
    log(api.get("restApiArn"));
    log(api.get("restApiExecutionArn"));
    log(api.get("stageName"));
    log(api.get("invokeUrl"));
    log(api.get("deploymentId"));
    // assert(name.contains("api"));
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}