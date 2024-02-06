# [capture_tokens.test.w](../../../../../examples/tests/valid/capture_tokens.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $r }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $r.foo());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $MyResource, $api_url, $url }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert((await $MyResource.isValidUrl($url)), "MyResource.isValidUrl(url)");
      $helpers.assert((await $MyResource.isValidUrl($api_url)), "MyResource.isValidUrl(api.url)");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.MyResource-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class MyResource {
    constructor({ $this_api_url, $this_url }) {
      this.$this_api_url = $this_api_url;
      this.$this_url = $this_url;
    }
    static async isValidUrl(url) {
      return (require("../../../url_utils.js")["isValidUrl"])(url)
    }
    async foo() {
      $helpers.assert((await MyResource.isValidUrl(this.$this_url)), "MyResource.isValidUrl(this.url)");
      $helpers.assert((await MyResource.isValidUrl(this.$this_api_url)), "MyResource.isValidUrl(this.api.url)");
    }
  }
  return MyResource;
}
//# sourceMappingURL=inflight.MyResource-1.js.map
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
          "Default": {
            "MyResource": {
              "cloud.Api": {
                "Endpoint": {
                  "Url": "MyResource_cloudApi_Endpoint_Url_02924D7C"
                }
              }
            },
            "cloud.Api": {
              "Endpoint": {
                "Url": "cloudApi_Endpoint_Url_CD8AC9A6"
              }
            }
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
    "MyResource_cloudApi_Endpoint_Url_02924D7C": {
      "value": "https://${aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.MyResource_cloudApi_api_stage_A26656F9.stage_name}"
    },
    "cloudApi_Endpoint_Url_CD8AC9A6": {
      "value": "https://${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.stage_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "MyResource_cloudApi_api_deployment_6DBAED7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/deployment",
            "uniqueId": "MyResource_cloudApi_api_deployment_6DBAED7F"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.body)}"
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
          "redeployment": "${sha256(aws_api_gateway_rest_api.cloudApi_api_2B334D75.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "MyResource_cloudApi_api_4CB9B8E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/api",
            "uniqueId": "MyResource_cloudApi_api_4CB9B8E3"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8ef4b64"
      },
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "MyResource_cloudApi_api_stage_A26656F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/stage",
            "uniqueId": "MyResource_cloudApi_api_stage_A26656F9"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.MyResource_cloudApi_api_deployment_6DBAED7F.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.id}",
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
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class MyResource extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
        this.url = this.api.url;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyResource-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType()};
            const client = new MyResourceClient({
              $this_api_url: ${$stdlib.core.liftObject(this.api.url)},
              $this_url: ${$stdlib.core.liftObject(this.url)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "foo": [
            [MyResource, ["isValidUrl"]],
            [this.api.url, []],
            [this.url, []],
          ],
          "$inflight_init": [
            [this.api.url, []],
            [this.url, []],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "isValidUrl": [
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $r: ${$stdlib.core.liftObject(r)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [r, ["foo"]],
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
            $MyResource: ${$stdlib.core.liftObject(MyResource)},
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $url: ${$stdlib.core.liftObject(url)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [MyResource, ["isValidUrl"]],
            [api.url, []],
            [url, []],
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const r = new MyResource(this, "MyResource");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class", new $Closure1(this, "$Closure1"));
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
    const url = api.url;
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight globals", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_tokens.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

