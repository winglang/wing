# [api.w](../../../../examples/tests/valid/api.w) | compile | tf-aws

## clients/Foo.inflight.js
```js
class  Foo {
  constructor({ api, stateful }) {
    this.api = api;
    this.stateful = stateful;
  }
  async handle(message)  {
    {
      const url = this.api.url;
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'url.startsWith("http://")'`)})(url.startsWith("http://"))};
    }
  }
}
exports.Foo = Foo;
exports.setupGlobals = function(globals) {
};

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
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
      "root_Region_A2D17352": {
        "//": {
          "metadata": {
            "path": "root/Default/Region",
            "uniqueId": "root_Region_A2D17352"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test\",\"${aws_lambda_function.root_test_AAE85061.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "root_cloudApi_api_deployment_E29F699A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/deployment",
            "uniqueId": "root_cloudApi_api_deployment_E29F699A"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.id}",
        "triggers": {
          "redeployment": "06d5d79d88a464ffe5666fff8744c6bcc926732c"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "root_cloudApi_api_8C9FE51E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "root_cloudApi_api_8C9FE51E"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "root_cloudApi_api_stage_57D6284A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/stage",
            "uniqueId": "root_cloudApi_api_stage_57D6284A"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.root_cloudApi_api_deployment_E29F699A.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.id}",
        "stage_name": "prod"
      }
    },
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_test_IamRole_6CDC2D16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRole",
            "uniqueId": "root_test_IamRole_6CDC2D16"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicy_0281983F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicy_0281983F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29.name}"
      },
      "root_test_IamRolePolicy_474A6820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicy",
            "uniqueId": "root_test_IamRolePolicy_474A6820"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicyAttachment_3D2A6333": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicyAttachment_3D2A6333"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29.name}"
      },
      "root_test_IamRolePolicyAttachment_1102A28A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicyAttachment",
            "uniqueId": "root_test_IamRolePolicyAttachment_1102A28A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-e46e5cb7-c8fd44c0"
          }
        },
        "function_name": "cloud-Api-OnRequest-e46e5cb7-c8fd44c0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequeste46e5cb7_S3Object_69EE2256.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_test_AAE85061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/Default",
            "uniqueId": "root_test_AAE85061"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url}",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_test_S3Object_A16CD789.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudApi_api_permissionGETceca4943_C84933C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-ceca4943",
            "uniqueId": "root_cloudApi_api_permissionGETceca4943_C84933C8"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/hello/world",
        "statement_id": "AllowExecutionFromAPIGateway-GET-ceca4943"
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_cloudApi_cloudApiOnRequeste46e5cb7_S3Object_69EE2256": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_S3Object_69EE2256"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_test_S3Object_A16CD789": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/S3Object",
            "uniqueId": "root_test_S3Object_A16CD789"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, api) {
        super(scope, id);
        this._addInflightOps("handle");
        this.api = api;
      }
      _toInflight() {
        const api_client = this._lift(this.api);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const mod = require("${self_client_path}")
            const client = new mod.Foo({
              api: ${api_client},
              stateful: ${stateful_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.api, host, []);
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("handle")) {
          this._registerBindObject(this.api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        counter: {
          obj: counter,
          ops: ["dec","inc","peek","reset"]
        },
      }
    })
    ;
    (api.get("/hello/world",handler));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new Foo(this,"Foo",api));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "api", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

## proc1/index.js
```js
async handle(request) {
  const { counter } = this;
  const count = (await counter.inc());
  const bodyResponse = Object.freeze({"count":count});
  const resp = {
  "body": bodyResponse,
  "status": 200,}
  ;
  return resp;
}

```

