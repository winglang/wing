bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let api = new cloud.Api() as "api";
api.get("/api", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
  };
});

let getApiInfo = (a: cloud.Api): Map<str>? => {
  if let api = aws.Api.from(a) {
    return {
      arn: api.arn(),
      restApiId: api.restApiId(),
      restApiName: api.restApiName(),
      stageName: api.stageName(),
      invokeUrl: api.invokeUrl(),
      deploymentId: api.deploymentId(),
    };
  }
  return nil;
};

let apiInfo = getApiInfo(api);

test "validates the AWS api name" {
  if let api = apiInfo {    
    assert(api.get("arn").contains("arn:aws:execute-api:"));
    assert(api.get("arn").contains(api.get("restApiId")));

    assert(api.get("invokeUrl").contains("https://"));
    assert(api.get("invokeUrl").contains(api.get("restApiId")));
    assert(api.get("invokeUrl").contains(api.get("stageName")));
    // assert(name.contains("api"));
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}