# [cors_api.w](../../../../../examples/tests/valid/cors_api.w) | compile | tf-aws

## inflight.$Closure1-2.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": "hello world","status": 200});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-2.js
```js
module.exports = function({ $apiDefaultCors_url, $http_HttpMethod, $http_Util, $t_Assert }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($apiDefaultCors_url + "/users"),({"method": $http_HttpMethod.GET,"headers": ({"Content-Type": "text/json"})})));
      const headers = response.headers;
      (await $t_Assert.equalNum(response.status,200));
      (await $t_Assert.equalStr((headers)["access-control-allow-origin"],"*"));
      (await $t_Assert.equalStr((headers)["access-control-allow-credentials"],"false"));
      (await $t_Assert.isNil((headers)["access-control-allow-headers"]));
      (await $t_Assert.isNil((headers)["access-control-expose-headers"]));
      (await $t_Assert.isNil((headers)["access-control-allow-methods"]));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-2.js
```js
module.exports = function({ $apiDefaultCors_url, $http_HttpMethod, $http_Util, $t_Assert }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($apiDefaultCors_url + "/users"),({"method": $http_HttpMethod.OPTIONS,"headers": ({"Content-Type": "text/json"})})));
      const headers = response.headers;
      (await $t_Assert.equalNum(response.status,204));
      (await $t_Assert.equalStr((headers)["access-control-allow-origin"],"*"));
      (await $t_Assert.equalStr((headers)["access-control-allow-methods"],"GET,HEAD,PUT,PATCH,POST,DELETE"));
      (await $t_Assert.equalStr((headers)["access-control-allow-headers"],"Content-Type,Authorization"));
      (await $t_Assert.equalStr((headers)["access-control-allow-credentials"],"false"));
      (await $t_Assert.isNil((headers)["access-control-expose-headers"]));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-2.js
```js
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": "hello world","status": 200});
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-2.js
```js
module.exports = function({ $apiCustomCors_url, $http_HttpMethod, $http_Util, $t_Assert }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($apiCustomCors_url + "/users"),({"method": $http_HttpMethod.GET,"headers": ({"Content-Type": "text/json"})})));
      const headers = response.headers;
      (await $t_Assert.equalNum(response.status,200));
      (await $t_Assert.equalStr((headers)["access-control-allow-origin"],"winglang.io"));
      (await $t_Assert.equalStr((headers)["access-control-allow-credentials"],"true"));
      (await $t_Assert.equalStr((headers)["access-control-expose-headers"],"Content-Type"));
      (await $t_Assert.isNil((headers)["access-control-allow-headers"]));
      (await $t_Assert.isNil((headers)["access-control-allow-methods"]));
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-2.js
```js
module.exports = function({ $apiCustomCors_url, $http_HttpMethod, $http_Util, $t_Assert }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($apiCustomCors_url + "/users"),({"method": $http_HttpMethod.OPTIONS,"headers": ({"Content-Type": "text/json"})})));
      const headers = response.headers;
      (await $t_Assert.equalNum(response.status,204));
      (await $t_Assert.equalStr((headers)["access-control-allow-origin"],"winglang.io"));
      (await $t_Assert.equalStr((headers)["access-control-allow-methods"],"GET,POST,OPTIONS"));
      (await $t_Assert.equalStr((headers)["access-control-allow-headers"],"Content-Type,Authorization,X-Custom-Header"));
      (await $t_Assert.equalStr((headers)["access-control-allow-credentials"],"true"));
      (await $t_Assert.equalStr((headers)["access-control-expose-headers"],"Content-Type"));
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7-2.js
```js
module.exports = function({ $apiCustomCors_url, $http_HttpMethod, $http_Util, $t_Assert }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($apiCustomCors_url + "/users"),({"method": $http_HttpMethod.OPTIONS,"headers": ({"Content-Type": "text/json","Access-Control-Request-Method": "PUT","Access-Control-Request-Headers": "Content-Type,Authorization,X-Custom-Foo"})})));
      const headers = response.headers;
      (await $t_Assert.equalNum(response.status,204));
      (await $t_Assert.equalStr((headers)["access-control-allow-origin"],"winglang.io"));
      (await $t_Assert.equalStr((headers)["access-control-allow-methods"],"GET,POST,OPTIONS"));
      (await $t_Assert.equalStr((headers)["access-control-allow-headers"],"Content-Type,Authorization,X-Custom-Header"));
      (await $t_Assert.equalStr((headers)["access-control-allow-credentials"],"true"));
      (await $t_Assert.equalStr((headers)["access-control-expose-headers"],"Content-Type"));
    }
  }
  return $Closure7;
}

```

## inflight.Assert-1.js
```js
module.exports = function({  }) {
  class Assert {
    static async equalStr(a, b) {
      try {
        {((cond) => {if (!cond) throw new Error("assertion failed: a == b")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a,b)))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((msg) => {throw new Error(msg)})(String.raw({ raw: ["expected: ", " got: ", ""] }, b, a))};
      }
    }
    static async isNil(a) {
      try {
        {((cond) => {if (!cond) throw new Error("assertion failed: a == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a,undefined)))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {console.log(e)};
        {((msg) => {throw new Error(msg)})(String.raw({ raw: ["expected '", "' to be nil"] }, a))};
      }
    }
    static async equalNum(a, b) {
      try {
        {((cond) => {if (!cond) throw new Error("assertion failed: a == b")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a,b)))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {console.log(e)};
        {((msg) => {throw new Error(msg)})(String.raw({ raw: ["expected: ", " got: ", ""] }, b, a))};
      }
    }
  }
  return Assert;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "data": {
    "aws_region": {
      "Region": {
        "//": {
          "metadata": {
            "path": "root/Default/Region",
            "uniqueId": "Region"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:GET --users has default cors headers\",\"${aws_lambda_function.testGET--usershasdefaultcorsheaders_Handler_1182379A.arn}\"],[\"root/Default/Default/test:OPTIONS --users has default cors headers\",\"${aws_lambda_function.testOPTIONS--usershasdefaultcorsheaders_Handler_D03A1BFF.arn}\"],[\"root/Default/Default/test:GET --users has cors headers\",\"${aws_lambda_function.testGET--usershascorsheaders_Handler_E0F337CB.arn}\"],[\"root/Default/Default/test:OPTIONS --users has cors headers\",\"${aws_lambda_function.testOPTIONS--usershascorsheaders_Handler_3A565385.arn}\"],[\"root/Default/Default/test:OPTIONS --users responds with proper headers for requested\",\"${aws_lambda_function.testOPTIONS--usersrespondswithproperheadersforrequested_Handler_0A2AB662.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "apiCustomCors_api_deployment_05CB4F30": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/api/deployment",
            "uniqueId": "apiCustomCors_api_deployment_05CB4F30"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.apiCustomCors_api_D8B9CD90.id}",
        "triggers": {
          "redeployment": "c01de636f4118b7353903b8f0e757abf473c0518"
        }
      },
      "cloudApi_api_deployment_545514BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/deployment",
            "uniqueId": "cloudApi_api_deployment_545514BF"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}",
        "triggers": {
          "redeployment": "b86a15a13275d206adddc5360e513fd5d0f527e6"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "apiCustomCors_api_D8B9CD90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/api/api",
            "uniqueId": "apiCustomCors_api_D8B9CD90"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users\":{\"get\":{\"operationId\":\"get-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.apiCustomCors_apiCustomCors-OnRequest-52bc3c17_E34A40CA.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c8efe62e"
      },
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users\":{\"get\":{\"operationId\":\"get-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "apiCustomCors_api_stage_F5D92865": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/api/stage",
            "uniqueId": "apiCustomCors_api_stage_F5D92865"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.apiCustomCors_api_deployment_05CB4F30.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.apiCustomCors_api_D8B9CD90.id}",
        "stage_name": "prod"
      },
      "cloudApi_api_stage_BBB283E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/stage",
            "uniqueId": "cloudApi_api_stage_BBB283E4"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.cloudApi_api_deployment_545514BF.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}",
        "stage_name": "prod"
      }
    },
    "aws_iam_role": {
      "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRole_692EAD85": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/apiCustomCors-OnRequest-52bc3c17/IamRole",
            "uniqueId": "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRole_692EAD85"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testGET--usershascorsheaders_Handler_IamRole_6841C3FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has cors headers/Handler/IamRole",
            "uniqueId": "testGET--usershascorsheaders_Handler_IamRole_6841C3FF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testGET--usershasdefaultcorsheaders_Handler_IamRole_17E5D7FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has default cors headers/Handler/IamRole",
            "uniqueId": "testGET--usershasdefaultcorsheaders_Handler_IamRole_17E5D7FC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testOPTIONS--usershascorsheaders_Handler_IamRole_0EFF66BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has cors headers/Handler/IamRole",
            "uniqueId": "testOPTIONS--usershascorsheaders_Handler_IamRole_0EFF66BD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testOPTIONS--usershasdefaultcorsheaders_Handler_IamRole_E58DF921": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has default cors headers/Handler/IamRole",
            "uniqueId": "testOPTIONS--usershasdefaultcorsheaders_Handler_IamRole_E58DF921"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRole_4AB06A0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users responds with proper headers for requested/Handler/IamRole",
            "uniqueId": "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRole_4AB06A0F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRolePolicy_92D18911": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/apiCustomCors-OnRequest-52bc3c17/IamRolePolicy",
            "uniqueId": "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRolePolicy_92D18911"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRole_692EAD85.name}"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicy_8BF9C89F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicy_8BF9C89F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.name}"
      },
      "testGET--usershascorsheaders_Handler_IamRolePolicy_BEF25776": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has cors headers/Handler/IamRolePolicy",
            "uniqueId": "testGET--usershascorsheaders_Handler_IamRolePolicy_BEF25776"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testGET--usershascorsheaders_Handler_IamRole_6841C3FF.name}"
      },
      "testGET--usershasdefaultcorsheaders_Handler_IamRolePolicy_F382BF6B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has default cors headers/Handler/IamRolePolicy",
            "uniqueId": "testGET--usershasdefaultcorsheaders_Handler_IamRolePolicy_F382BF6B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testGET--usershasdefaultcorsheaders_Handler_IamRole_17E5D7FC.name}"
      },
      "testOPTIONS--usershascorsheaders_Handler_IamRolePolicy_F6912B4F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has cors headers/Handler/IamRolePolicy",
            "uniqueId": "testOPTIONS--usershascorsheaders_Handler_IamRolePolicy_F6912B4F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testOPTIONS--usershascorsheaders_Handler_IamRole_0EFF66BD.name}"
      },
      "testOPTIONS--usershasdefaultcorsheaders_Handler_IamRolePolicy_C496A648": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has default cors headers/Handler/IamRolePolicy",
            "uniqueId": "testOPTIONS--usershasdefaultcorsheaders_Handler_IamRolePolicy_C496A648"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testOPTIONS--usershasdefaultcorsheaders_Handler_IamRole_E58DF921.name}"
      },
      "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRolePolicy_00E727F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users responds with proper headers for requested/Handler/IamRolePolicy",
            "uniqueId": "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRolePolicy_00E727F2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRole_4AB06A0F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRolePolicyAttachment_9133AE8C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/apiCustomCors-OnRequest-52bc3c17/IamRolePolicyAttachment",
            "uniqueId": "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRolePolicyAttachment_9133AE8C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRole_692EAD85.name}"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicyAttachment_5383D6A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicyAttachment_5383D6A2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.name}"
      },
      "testGET--usershascorsheaders_Handler_IamRolePolicyAttachment_54A08CCC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has cors headers/Handler/IamRolePolicyAttachment",
            "uniqueId": "testGET--usershascorsheaders_Handler_IamRolePolicyAttachment_54A08CCC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testGET--usershascorsheaders_Handler_IamRole_6841C3FF.name}"
      },
      "testGET--usershasdefaultcorsheaders_Handler_IamRolePolicyAttachment_50A99B49": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has default cors headers/Handler/IamRolePolicyAttachment",
            "uniqueId": "testGET--usershasdefaultcorsheaders_Handler_IamRolePolicyAttachment_50A99B49"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testGET--usershasdefaultcorsheaders_Handler_IamRole_17E5D7FC.name}"
      },
      "testOPTIONS--usershascorsheaders_Handler_IamRolePolicyAttachment_CA58727C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has cors headers/Handler/IamRolePolicyAttachment",
            "uniqueId": "testOPTIONS--usershascorsheaders_Handler_IamRolePolicyAttachment_CA58727C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testOPTIONS--usershascorsheaders_Handler_IamRole_0EFF66BD.name}"
      },
      "testOPTIONS--usershasdefaultcorsheaders_Handler_IamRolePolicyAttachment_CF666F56": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has default cors headers/Handler/IamRolePolicyAttachment",
            "uniqueId": "testOPTIONS--usershasdefaultcorsheaders_Handler_IamRolePolicyAttachment_CF666F56"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testOPTIONS--usershasdefaultcorsheaders_Handler_IamRole_E58DF921.name}"
      },
      "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRolePolicyAttachment_F702A7D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users responds with proper headers for requested/Handler/IamRolePolicyAttachment",
            "uniqueId": "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRolePolicyAttachment_F702A7D9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRole_4AB06A0F.name}"
      }
    },
    "aws_lambda_function": {
      "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_E34A40CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/apiCustomCors-OnRequest-52bc3c17/Default",
            "uniqueId": "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_E34A40CA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "apiCustomCors-OnRequest-52bc3c17-c85c85c9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "apiCustomCors-OnRequest-52bc3c17-c85c85c9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.apiCustomCors_apiCustomCors-OnRequest-52bc3c17_IamRole_692EAD85.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.apiCustomCors_apiCustomCors-OnRequest-52bc3c17_S3Object_40199F8B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-cdafee6e-c8147384",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-cdafee6e-c8147384",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testGET--usershascorsheaders_Handler_E0F337CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has cors headers/Handler/Default",
            "uniqueId": "testGET--usershascorsheaders_Handler_E0F337CB"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d51aba",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_54": "${jsonencode(aws_api_gateway_stage.apiCustomCors_api_stage_F5D92865.invoke_url)}"
          }
        },
        "function_name": "Handler-c8d51aba",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testGET--usershascorsheaders_Handler_IamRole_6841C3FF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testGET--usershascorsheaders_Handler_S3Object_A63B28D3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testGET--usershasdefaultcorsheaders_Handler_1182379A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has default cors headers/Handler/Default",
            "uniqueId": "testGET--usershasdefaultcorsheaders_Handler_1182379A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80c888e",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_7": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c80c888e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testGET--usershasdefaultcorsheaders_Handler_IamRole_17E5D7FC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testGET--usershasdefaultcorsheaders_Handler_S3Object_ADAE18A8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testOPTIONS--usershascorsheaders_Handler_3A565385": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has cors headers/Handler/Default",
            "uniqueId": "testOPTIONS--usershascorsheaders_Handler_3A565385"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81c750d",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_54": "${jsonencode(aws_api_gateway_stage.apiCustomCors_api_stage_F5D92865.invoke_url)}"
          }
        },
        "function_name": "Handler-c81c750d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testOPTIONS--usershascorsheaders_Handler_IamRole_0EFF66BD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testOPTIONS--usershascorsheaders_Handler_S3Object_7EC6E95C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testOPTIONS--usershasdefaultcorsheaders_Handler_D03A1BFF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has default cors headers/Handler/Default",
            "uniqueId": "testOPTIONS--usershasdefaultcorsheaders_Handler_D03A1BFF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82f7728",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_7": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c82f7728",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testOPTIONS--usershasdefaultcorsheaders_Handler_IamRole_E58DF921.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testOPTIONS--usershasdefaultcorsheaders_Handler_S3Object_2F99FE7D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_0A2AB662": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users responds with proper headers for requested/Handler/Default",
            "uniqueId": "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_0A2AB662"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8aef6d3",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_54": "${jsonencode(aws_api_gateway_stage.apiCustomCors_api_stage_F5D92865.invoke_url)}"
          }
        },
        "function_name": "Handler-c8aef6d3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testOPTIONS--usersrespondswithproperheadersforrequested_Handler_IamRole_4AB06A0F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testOPTIONS--usersrespondswithproperheadersforrequested_Handler_S3Object_0954ACCC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "apiCustomCors_api_permission-GET-41f0e61d_B09839FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/api/permission-GET-41f0e61d",
            "uniqueId": "apiCustomCors_api_permission-GET-41f0e61d_B09839FA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.apiCustomCors_apiCustomCors-OnRequest-52bc3c17_E34A40CA.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.apiCustomCors_api_D8B9CD90.execution_arn}/*/GET/users",
        "statement_id": "AllowExecutionFromAPIGateway-GET-41f0e61d"
      },
      "cloudApi_api_permission-GET-41f0e61d_DD9B4FD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-41f0e61d",
            "uniqueId": "cloudApi_api_permission-GET-41f0e61d_DD9B4FD0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users",
        "statement_id": "AllowExecutionFromAPIGateway-GET-41f0e61d"
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_S3Object_40199F8B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/apiCustomCors/apiCustomCors-OnRequest-52bc3c17/S3Object",
            "uniqueId": "apiCustomCors_apiCustomCors-OnRequest-52bc3c17_S3Object_40199F8B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testGET--usershascorsheaders_Handler_S3Object_A63B28D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has cors headers/Handler/S3Object",
            "uniqueId": "testGET--usershascorsheaders_Handler_S3Object_A63B28D3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testGET--usershasdefaultcorsheaders_Handler_S3Object_ADAE18A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:GET --users has default cors headers/Handler/S3Object",
            "uniqueId": "testGET--usershasdefaultcorsheaders_Handler_S3Object_ADAE18A8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testOPTIONS--usershascorsheaders_Handler_S3Object_7EC6E95C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has cors headers/Handler/S3Object",
            "uniqueId": "testOPTIONS--usershascorsheaders_Handler_S3Object_7EC6E95C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testOPTIONS--usershasdefaultcorsheaders_Handler_S3Object_2F99FE7D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users has default cors headers/Handler/S3Object",
            "uniqueId": "testOPTIONS--usershasdefaultcorsheaders_Handler_S3Object_2F99FE7D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_S3Object_0954ACCC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:OPTIONS --users responds with proper headers for requested/Handler/S3Object",
            "uniqueId": "testOPTIONS--usersrespondswithproperheadersforrequested_Handler_S3Object_0954ACCC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

## preflight.assertions-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Assert extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this._addInflightOps("equalStr", "isNil", "equalNum", "$inflight_init");
    }
    static _toInflightType(context) {
      return $stdlib.core.NodeJsCode.fromInline(`
        require("./inflight.Assert-1.js")({
        })
      `);
    }
    _toInflight() {
      return $stdlib.core.NodeJsCode.fromInline(`
        (await (async () => {
          const AssertClient = ${Assert._toInflightType(this).text};
          const client = new AssertClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `);
    }
  }
  return { Assert };
};

```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const http = $stdlib.http;
const t = require("./preflight.assertions-1.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1-2.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2-2.js")({
            $apiDefaultCors_url: ${context._lift(apiDefaultCors.url)},
            $http_HttpMethod: ${context._lift(http.HttpMethod)},
            $http_Util: ${context._lift(http.Util)},
            $t_Assert: ${context._lift(t.Assert)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(apiDefaultCors.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3-2.js")({
            $apiDefaultCors_url: ${context._lift(apiDefaultCors.url)},
            $http_HttpMethod: ${context._lift(http.HttpMethod)},
            $http_Util: ${context._lift(http.Util)},
            $t_Assert: ${context._lift(t.Assert)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(apiDefaultCors.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4-2.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure5-2.js")({
            $apiCustomCors_url: ${context._lift(apiCustomCors.url)},
            $http_HttpMethod: ${context._lift(http.HttpMethod)},
            $http_Util: ${context._lift(http.Util)},
            $t_Assert: ${context._lift(t.Assert)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this).text};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(apiCustomCors.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure6-2.js")({
            $apiCustomCors_url: ${context._lift(apiCustomCors.url)},
            $http_HttpMethod: ${context._lift(http.HttpMethod)},
            $http_Util: ${context._lift(http.Util)},
            $t_Assert: ${context._lift(t.Assert)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this).text};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure6._registerBindObject(apiCustomCors.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure7-2.js")({
            $apiCustomCors_url: ${context._lift(apiCustomCors.url)},
            $http_HttpMethod: ${context._lift(http.HttpMethod)},
            $http_Util: ${context._lift(http.Util)},
            $t_Assert: ${context._lift(t.Assert)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this).text};
            const client = new $Closure7Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure7._registerBindObject(apiCustomCors.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const apiDefaultCors = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api",{ cors: ({}) });
    const getHandler = new $Closure1(this,"$Closure1");
    (apiDefaultCors.get("/users",getHandler));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:GET /users has default cors headers",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:OPTIONS /users has default cors headers",new $Closure3(this,"$Closure3"));
    const apiCustomCors = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"apiCustomCors",{ cors: ({"origins": ["winglang.io"],"methods": [cloud.HttpMethod.GET, cloud.HttpMethod.POST, cloud.HttpMethod.OPTIONS],"headers": ["Content-Type", "Authorization", "X-Custom-Header"],"allowCredentials": true,"exposedHeaders": ["Content-Type"]}) });
    const getCustomHandler = new $Closure4(this,"$Closure4");
    (apiCustomCors.get("/users",getCustomHandler));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:GET /users has cors headers",new $Closure5(this,"$Closure5"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:OPTIONS /users has cors headers",new $Closure6(this,"$Closure6"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:OPTIONS /users responds with proper headers for requested",new $Closure7(this,"$Closure7"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "cors_api", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

