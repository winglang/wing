# [api_path_vars.w](../../../../../examples/tests/valid/api_path_vars.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([({"user": (req.vars)["name"]})]),"headers": ({"content-type": "application/json"}),"status": 200});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([({"user": (req.vars)["name"],"age": (req.vars)["age"]})]),"headers": ({"content-type": "application/json"}),"status": 200});
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "tsuf";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/users/", ""] }, $api_url, username)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((JSON.parse((res.body ?? ""))))["user"],username)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "akhil";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/", ""] }, $api_url, username)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((JSON.parse((res.body ?? ""))))["user"],username)))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "akhil";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/users/permission/", ""] }, $api_url, username)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((JSON.parse((res.body ?? ""))))["user"],username)))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "akhil";
      const age = "23";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/", "/", ""] }, $api_url, username, age)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((JSON.parse((res.body ?? ""))))["user"],username)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"age\") == age")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((JSON.parse((res.body ?? ""))))["age"],age)))};
    }
  }
  return $Closure6;
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.testtest_Handler_295107CC.arn}\"],[\"root/Default/Default/test:test2\",\"${aws_lambda_function.testtest2_Handler_EB79E487.arn}\"],[\"root/Default/Default/test:test3\",\"${aws_lambda_function.testtest3_Handler_A2A8E3A1.arn}\"],[\"root/Default/Default/test:test4\",\"${aws_lambda_function.testtest4_Handler_4B54514B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
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
          "redeployment": "${sha256(aws_api_gateway_rest_api.cloudApi_api_2B334D75.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users/{name}\":{\"get\":{\"operationId\":\"get-users/{name}\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{name}\":{\"get\":{\"operationId\":\"get-{name}\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/users/permission/{name}\":{\"get\":{\"operationId\":\"get-users/permission/{name}\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{name}/{age}\":{\"get\":{\"operationId\":\"get-{name}/{age}\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"age\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-86898773_701F5CA7.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"consumes\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404}\"},\"responses\":{\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode: 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
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
      "cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F"
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
      "testtest2_Handler_IamRole_9304BBE5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test2/Handler/IamRole",
            "uniqueId": "testtest2_Handler_IamRole_9304BBE5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testtest3_Handler_IamRole_6E5F9CB2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test3/Handler/IamRole",
            "uniqueId": "testtest3_Handler_IamRole_6E5F9CB2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testtest4_Handler_IamRole_F3E77BF2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test4/Handler/IamRole",
            "uniqueId": "testtest4_Handler_IamRole_F3E77BF2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testtest_Handler_IamRole_15693C93": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "testtest_Handler_IamRole_15693C93"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicy_DAC639E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicy_DAC639E5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F.name}"
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
      "testtest2_Handler_IamRolePolicy_77807769": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test2/Handler/IamRolePolicy",
            "uniqueId": "testtest2_Handler_IamRolePolicy_77807769"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testtest2_Handler_IamRole_9304BBE5.name}"
      },
      "testtest3_Handler_IamRolePolicy_CD8584B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test3/Handler/IamRolePolicy",
            "uniqueId": "testtest3_Handler_IamRolePolicy_CD8584B9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testtest3_Handler_IamRole_6E5F9CB2.name}"
      },
      "testtest4_Handler_IamRolePolicy_92DB0F08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test4/Handler/IamRolePolicy",
            "uniqueId": "testtest4_Handler_IamRolePolicy_92DB0F08"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testtest4_Handler_IamRole_F3E77BF2.name}"
      },
      "testtest_Handler_IamRolePolicy_AF0279BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "testtest_Handler_IamRolePolicy_AF0279BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicyAttachment_6E485A17": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicyAttachment_6E485A17"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F.name}"
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
      "testtest2_Handler_IamRolePolicyAttachment_57665B6F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test2/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtest2_Handler_IamRolePolicyAttachment_57665B6F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtest2_Handler_IamRole_9304BBE5.name}"
      },
      "testtest3_Handler_IamRolePolicyAttachment_EA1CC147": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test3/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtest3_Handler_IamRolePolicyAttachment_EA1CC147"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtest3_Handler_IamRole_6E5F9CB2.name}"
      },
      "testtest4_Handler_IamRolePolicyAttachment_AC735E44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test4/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtest4_Handler_IamRolePolicyAttachment_AC735E44"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtest4_Handler_IamRole_F3E77BF2.name}"
      },
      "testtest_Handler_IamRolePolicyAttachment_ADF4752D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtest_Handler_IamRolePolicyAttachment_ADF4752D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_cloudApi-OnRequest-86898773_701F5CA7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_701F5CA7"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-86898773-c8ed6547",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-86898773-c8ed6547",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-86898773_S3Object_12D28469.key}",
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
        "architectures": [
          "arm64"
        ],
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
      "testtest2_Handler_EB79E487": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test2/Handler/Default",
            "uniqueId": "testtest2_Handler_EB79E487"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c89fe587",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_8": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c89fe587",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtest2_Handler_IamRole_9304BBE5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtest2_Handler_S3Object_21FCD712.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testtest3_Handler_A2A8E3A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test3/Handler/Default",
            "uniqueId": "testtest3_Handler_A2A8E3A1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8445457",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_8": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c8445457",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtest3_Handler_IamRole_6E5F9CB2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtest3_Handler_S3Object_417A3842.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testtest4_Handler_4B54514B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test4/Handler/Default",
            "uniqueId": "testtest4_Handler_4B54514B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82aef8d",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_8": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c82aef8d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtest4_Handler_IamRole_F3E77BF2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtest4_Handler_S3Object_7A3CDC0E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testtest_Handler_295107CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "testtest_Handler_295107CC"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_8": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c8f4f2a1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtest_Handler_S3Object_9F4E28A7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-2e836e2d_1D868589": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-2e836e2d",
            "uniqueId": "cloudApi_api_permission-GET-2e836e2d_1D868589"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users/permission/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-2e836e2d"
      },
      "cloudApi_api_permission-GET-9f89597e_FFBE5338": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-9f89597e",
            "uniqueId": "cloudApi_api_permission-GET-9f89597e_FFBE5338"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-9f89597e"
      },
      "cloudApi_api_permission-GET-da43a2f2_1CE7916D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-da43a2f2",
            "uniqueId": "cloudApi_api_permission-GET-da43a2f2_1CE7916D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-da43a2f2"
      },
      "cloudApi_api_permission-GET-e6c024e8_94CCF201": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e6c024e8",
            "uniqueId": "cloudApi_api_permission-GET-e6c024e8_94CCF201"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-86898773_701F5CA7.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/{name}/{age}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e6c024e8"
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
      "cloudApi_cloudApi-OnRequest-86898773_S3Object_12D28469": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_S3Object_12D28469"
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
      "testtest2_Handler_S3Object_21FCD712": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test2/Handler/S3Object",
            "uniqueId": "testtest2_Handler_S3Object_21FCD712"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testtest3_Handler_S3Object_417A3842": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test3/Handler/S3Object",
            "uniqueId": "testtest3_Handler_S3Object_417A3842"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testtest4_Handler_S3Object_7A3CDC0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test4/Handler/S3Object",
            "uniqueId": "testtest4_Handler_S3Object_7A3CDC0E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testtest_Handler_S3Object_9F4E28A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "testtest_Handler_S3Object_9F4E28A7"
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

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $std_Json: ${context._lift(std.Json)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $std_Json: ${context._lift(std.Json)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift(http.Util)},
            $std_Json: ${context._lift(std.Json)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift(http.Util)},
            $std_Json: ${context._lift(std.Json)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift(http.Util)},
            $std_Json: ${context._lift(std.Json)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift(http.Util)},
            $std_Json: ${context._lift(std.Json)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this)};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure6._registerBindObject(api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const handler = new $Closure1(this,"$Closure1");
    const handler_two = new $Closure2(this,"$Closure2");
    (api.get("/users/{name}",handler));
    (api.get("/{name}",handler));
    (api.get("/users/permission/{name}",handler));
    (api.get("/{name}/{age}",handler_two));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test2",new $Closure4(this,"$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test3",new $Closure5(this,"$Closure5"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test4",new $Closure6(this,"$Closure6"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "api_path_vars", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

