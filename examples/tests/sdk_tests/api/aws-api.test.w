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
      restApiArn: api.restApiArn,
      restApiId: api.restApiId,
      restApiName: api.restApiName,
      stageName: api.stageName,
      invokeUrl: api.invokeUrl,
      deploymentId: api.deploymentId,
    };
  }
  return nil;
};

let apiName = getApiInfo(api);

test "validates the AWS Api" {
  if let api = apiName {    
    assert(api.get("restApiArn").contains("arn:aws:execute-api:"));
    assert(api.get("restApiArn").contains(api.get("restApiId")));

    assert(api.get("invokeUrl").contains("https://"));
    assert(api.get("invokeUrl").contains(api.get("restApiId")));
    assert(api.get("invokeUrl").contains(api.get("stageName")));
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}