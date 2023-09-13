# [capture_tokens.w](../../../../../examples/tests/valid/capture_tokens.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
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

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $MyResource, $api_url, $url }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(url)")})((await $MyResource.isValidUrl($url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(api.url)")})((await $MyResource.isValidUrl($api_url)))};
    }
  }
  return $Closure2;
}

```

## inflight.MyResource-1.js
```js
module.exports = function({  }) {
  class MyResource {
    constructor({ $this_api_url, $this_url }) {
      this.$this_api_url = $this_api_url;
      this.$this_url = $this_url;
    }
    static async isValidUrl(url) {
      return (require("<ABSOLUTE_PATH>/url_utils.js")["isValidUrl"])(url)
    }
    async foo() {
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(this.url)")})((await MyResource.isValidUrl(this.$this_url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(this.api.url)")})((await MyResource.isValidUrl(this.$this_api_url)))};
    }
  }
  return MyResource;
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
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_apigatewayv2_api": {
      "MyResource_cloudApi_api_4CB9B8E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/api",
            "uniqueId": "MyResource_cloudApi_api_4CB9B8E3"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/$default\":{\"x-amazon-apigateway-any-method\":{\"isDefaultRoute\":true,\"x-amazon-apigateway-integration\":{\"payloadFormatVersion\":\"1.0\",\"type\":\"http_proxy\",\"httpMethod\":\"ANY\",\"uri\":\"https://example.com/\"}}}}}",
        "name": "api-c8ef4b64",
        "protocol_type": "HTTP"
      },
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/$default\":{\"x-amazon-apigateway-any-method\":{\"isDefaultRoute\":true,\"x-amazon-apigateway-integration\":{\"payloadFormatVersion\":\"1.0\",\"type\":\"http_proxy\",\"httpMethod\":\"ANY\",\"uri\":\"https://example.com/\"}}}}}",
        "name": "api-c895068c",
        "protocol_type": "HTTP"
      }
    },
    "aws_apigatewayv2_stage": {
      "MyResource_cloudApi_api_stage_A26656F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/stage",
            "uniqueId": "MyResource_cloudApi_api_stage_A26656F9"
          }
        },
        "api_id": "${aws_apigatewayv2_api.MyResource_cloudApi_api_4CB9B8E3.id}",
        "auto_deploy": true,
        "name": "$default"
      },
      "cloudApi_api_stage_BBB283E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/stage",
            "uniqueId": "cloudApi_api_stage_BBB283E4"
          }
        },
        "api_id": "${aws_apigatewayv2_api.cloudApi_api_2B334D75.id}",
        "auto_deploy": true,
        "name": "$default"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        this.url = this.api.url;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.MyResource-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this)};
            const client = new MyResourceClient({
              $this_api_url: ${this._lift(this.api.url)},
              $this_url: ${this._lift(this.url)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["isValidUrl", "foo", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.api.url, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        if (ops.includes("foo")) {
          MyResource._registerBindObject(MyResource, host, ["isValidUrl"]);
          MyResource._registerBindObject(this.api.url, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $r: ${context._lift(r)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(r, host, ["foo"]);
        }
        super._registerBind(host, ops);
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
            $MyResource: ${context._lift(MyResource)},
            $api_url: ${context._lift(api.url)},
            $url: ${context._lift(url)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(MyResource, host, ["isValidUrl"]);
          $Closure2._registerBindObject(api.url, host, []);
          $Closure2._registerBindObject(url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const r = new MyResource(this,"MyResource");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class",new $Closure1(this,"$Closure1"));
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const url = api.url;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight globals",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "capture_tokens", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

