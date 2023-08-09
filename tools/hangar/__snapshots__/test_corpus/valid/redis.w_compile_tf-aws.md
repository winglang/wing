# [redis.w](../../../../../examples/tests/valid/redis.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $r, $r2 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const connection = (await $r.rawClient());
      (await connection.set("wing","does redis"));
      const value = (await connection.get("wing"));
      {((cond) => {if (!cond) throw new Error("assertion failed: value == \"does redis\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(value,"does redis")))};
      (await $r2.set("wing","does redis again"));
      const value2 = (await $r2.get("wing"));
      {((cond) => {if (!cond) throw new Error("assertion failed: value2 == \"does redis again\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(value2,"does redis again")))};
    }
  }
  return $Closure1;
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:test\",\"${aws_lambda_function.undefined_testtest_Handler_A295E574.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_eip": {
      "undefined_EIP_63F57CE4": {
        "//": {
          "metadata": {
            "path": "root/undefined/EIP",
            "uniqueId": "undefined_EIP_63F57CE4"
          }
        }
      }
    },
    "aws_elasticache_cluster": {
      "undefined_exRedis_RedisCluster_F4B611A7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/ex.Redis/RedisCluster",
            "uniqueId": "undefined_exRedis_RedisCluster_F4B611A7"
          }
        },
        "availability_zone": "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.availability_zone}",
        "cluster_id": "ex-redis-c8b6c73d",
        "engine": "redis",
        "engine_version": "6.2",
        "node_type": "cache.t4g.small",
        "num_cache_nodes": 1,
        "parameter_group_name": "default.redis6.x",
        "security_group_ids": [
          "${aws_security_group.undefined_exRedis_securityGroup_1DAA1459.id}"
        ],
        "subnet_group_name": "${aws_elasticache_subnet_group.undefined_exRedis_RedisSubnetGroup_E1EED761.name}"
      },
      "undefined_r2_RedisCluster_5DDB4143": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/r2/RedisCluster",
            "uniqueId": "undefined_r2_RedisCluster_5DDB4143"
          }
        },
        "availability_zone": "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.availability_zone}",
        "cluster_id": "r2-c833fc67",
        "engine": "redis",
        "engine_version": "6.2",
        "node_type": "cache.t4g.small",
        "num_cache_nodes": 1,
        "parameter_group_name": "default.redis6.x",
        "security_group_ids": [
          "${aws_security_group.undefined_r2_securityGroup_9358FECC.id}"
        ],
        "subnet_group_name": "${aws_elasticache_subnet_group.undefined_r2_RedisSubnetGroup_409DA1CD.name}"
      }
    },
    "aws_elasticache_subnet_group": {
      "undefined_exRedis_RedisSubnetGroup_E1EED761": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/ex.Redis/RedisSubnetGroup",
            "uniqueId": "undefined_exRedis_RedisSubnetGroup_E1EED761"
          }
        },
        "name": "ex-redis-c8b6c73d-subnetGroup",
        "subnet_ids": [
          "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.id}"
        ]
      },
      "undefined_r2_RedisSubnetGroup_409DA1CD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/r2/RedisSubnetGroup",
            "uniqueId": "undefined_r2_RedisSubnetGroup_409DA1CD"
          }
        },
        "name": "r2-c833fc67-subnetGroup",
        "subnet_ids": [
          "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.id}"
        ]
      }
    },
    "aws_iam_role": {
      "undefined_testtest_Handler_IamRole_50D3D3C7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRole",
            "uniqueId": "undefined_testtest_Handler_IamRole_50D3D3C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"elasticache:Describe*\"],\"Resource\":[\"${aws_elasticache_cluster.undefined_exRedis_RedisCluster_F4B611A7.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"elasticache:Describe*\"],\"Resource\":[\"${aws_elasticache_cluster.undefined_r2_RedisCluster_5DDB4143.arn}\"],\"Effect\":\"Allow\"},{\"Effect\":\"Allow\",\"Action\":[\"ec2:CreateNetworkInterface\",\"ec2:DescribeNetworkInterfaces\",\"ec2:DeleteNetworkInterface\",\"ec2:DescribeSubnets\",\"ec2:DescribeSecurityGroups\"],\"Resource\":\"*\"},{\"Effect\":\"Allow\",\"Action\":[\"ec2:CreateNetworkInterface\",\"ec2:DescribeNetworkInterfaces\",\"ec2:DeleteNetworkInterface\",\"ec2:DescribeSubnets\",\"ec2:DescribeSecurityGroups\"],\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_internet_gateway": {
      "undefined_InternetGateway_486F7691": {
        "//": {
          "metadata": {
            "path": "root/undefined/InternetGateway",
            "uniqueId": "undefined_InternetGateway_486F7691"
          }
        },
        "tags": {
          "Name": "undefined-c8067231-internet-gateway"
        },
        "vpc_id": "${aws_vpc.undefined_VPC_3BBFAF3D.id}"
      }
    },
    "aws_lambda_function": {
      "undefined_testtest_Handler_A295E574": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/Default",
            "uniqueId": "undefined_testtest_Handler_A295E574"
          }
        },
        "environment": {
          "variables": {
            "REDIS_CLUSTER_ID_2f97823b": "${aws_elasticache_cluster.undefined_r2_RedisCluster_5DDB4143.cluster_id}",
            "REDIS_CLUSTER_ID_9dd7dfb0": "${aws_elasticache_cluster.undefined_exRedis_RedisCluster_F4B611A7.cluster_id}",
            "WING_FUNCTION_NAME": "Handler-c831cefb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c831cefb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testtest_Handler_S3Object_96D88A6C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [
            "${aws_security_group.undefined_exRedis_securityGroup_1DAA1459.id}",
            "${aws_security_group.undefined_r2_securityGroup_9358FECC.id}"
          ],
          "subnet_ids": [
            "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.id}",
            "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.id}"
          ]
        }
      }
    },
    "aws_nat_gateway": {
      "undefined_NATGateway_4F499822": {
        "//": {
          "metadata": {
            "path": "root/undefined/NATGateway",
            "uniqueId": "undefined_NATGateway_4F499822"
          }
        },
        "allocation_id": "${aws_eip.undefined_EIP_63F57CE4.id}",
        "subnet_id": "${aws_subnet.undefined_PublicSubnet_547050B0.id}",
        "tags": {
          "Name": "undefined-c8067231-nat-gateway"
        }
      }
    },
    "aws_route_table": {
      "undefined_PrivateRouteTable_A5F52F74": {
        "//": {
          "metadata": {
            "path": "root/undefined/PrivateRouteTable",
            "uniqueId": "undefined_PrivateRouteTable_A5F52F74"
          }
        },
        "route": [
          {
            "carrier_gateway_id": null,
            "cidr_block": "0.0.0.0/0",
            "core_network_arn": null,
            "destination_prefix_list_id": null,
            "egress_only_gateway_id": null,
            "gateway_id": null,
            "instance_id": null,
            "ipv6_cidr_block": null,
            "local_gateway_id": null,
            "nat_gateway_id": "${aws_nat_gateway.undefined_NATGateway_4F499822.id}",
            "network_interface_id": null,
            "transit_gateway_id": null,
            "vpc_endpoint_id": null,
            "vpc_peering_connection_id": null
          }
        ],
        "tags": {
          "Name": "undefined-c8067231-private-route-table-1"
        },
        "vpc_id": "${aws_vpc.undefined_VPC_3BBFAF3D.id}"
      },
      "undefined_PublicRouteTable_F954C914": {
        "//": {
          "metadata": {
            "path": "root/undefined/PublicRouteTable",
            "uniqueId": "undefined_PublicRouteTable_F954C914"
          }
        },
        "route": [
          {
            "carrier_gateway_id": null,
            "cidr_block": "0.0.0.0/0",
            "core_network_arn": null,
            "destination_prefix_list_id": null,
            "egress_only_gateway_id": null,
            "gateway_id": "${aws_internet_gateway.undefined_InternetGateway_486F7691.id}",
            "instance_id": null,
            "ipv6_cidr_block": null,
            "local_gateway_id": null,
            "nat_gateway_id": null,
            "network_interface_id": null,
            "transit_gateway_id": null,
            "vpc_endpoint_id": null,
            "vpc_peering_connection_id": null
          }
        ],
        "tags": {
          "Name": "undefined-c8067231-public-route-table-1"
        },
        "vpc_id": "${aws_vpc.undefined_VPC_3BBFAF3D.id}"
      }
    },
    "aws_route_table_association": {
      "undefined_PrivateRouteTableAssociation_627A06ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/PrivateRouteTableAssociation",
            "uniqueId": "undefined_PrivateRouteTableAssociation_627A06ED"
          }
        },
        "route_table_id": "${aws_route_table.undefined_PrivateRouteTable_A5F52F74.id}",
        "subnet_id": "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.id}"
      },
      "undefined_PublicRouteTableAssociation_7C4E7302": {
        "//": {
          "metadata": {
            "path": "root/undefined/PublicRouteTableAssociation",
            "uniqueId": "undefined_PublicRouteTableAssociation_7C4E7302"
          }
        },
        "route_table_id": "${aws_route_table.undefined_PublicRouteTable_F954C914.id}",
        "subnet_id": "${aws_subnet.undefined_PublicSubnet_547050B0.id}"
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testtest_Handler_S3Object_96D88A6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/S3Object",
            "uniqueId": "undefined_testtest_Handler_S3Object_96D88A6C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_security_group": {
      "undefined_exRedis_securityGroup_1DAA1459": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/ex.Redis/securityGroup",
            "uniqueId": "undefined_exRedis_securityGroup_1DAA1459"
          }
        },
        "egress": [
          {
            "cidr_blocks": [
              "0.0.0.0/0"
            ],
            "description": null,
            "from_port": 0,
            "ipv6_cidr_blocks": null,
            "prefix_list_ids": null,
            "protocol": "-1",
            "security_groups": null,
            "self": null,
            "to_port": 0
          }
        ],
        "ingress": [
          {
            "cidr_blocks": [
              "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.cidr_block}"
            ],
            "description": null,
            "from_port": 6379,
            "ipv6_cidr_blocks": null,
            "prefix_list_ids": null,
            "protocol": "tcp",
            "security_groups": null,
            "self": true,
            "to_port": 6379
          }
        ],
        "name": "9dd7dfb0-securityGroup",
        "vpc_id": "${aws_vpc.undefined_VPC_3BBFAF3D.id}"
      },
      "undefined_r2_securityGroup_9358FECC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/r2/securityGroup",
            "uniqueId": "undefined_r2_securityGroup_9358FECC"
          }
        },
        "egress": [
          {
            "cidr_blocks": [
              "0.0.0.0/0"
            ],
            "description": null,
            "from_port": 0,
            "ipv6_cidr_blocks": null,
            "prefix_list_ids": null,
            "protocol": "-1",
            "security_groups": null,
            "self": null,
            "to_port": 0
          }
        ],
        "ingress": [
          {
            "cidr_blocks": [
              "${aws_subnet.undefined_PrivateSubnet_DF8CA6BA.cidr_block}"
            ],
            "description": null,
            "from_port": 6379,
            "ipv6_cidr_blocks": null,
            "prefix_list_ids": null,
            "protocol": "tcp",
            "security_groups": null,
            "self": true,
            "to_port": 6379
          }
        ],
        "name": "2f97823b-securityGroup",
        "vpc_id": "${aws_vpc.undefined_VPC_3BBFAF3D.id}"
      }
    },
    "aws_subnet": {
      "undefined_PrivateSubnet_DF8CA6BA": {
        "//": {
          "metadata": {
            "path": "root/undefined/PrivateSubnet",
            "uniqueId": "undefined_PrivateSubnet_DF8CA6BA"
          }
        },
        "cidr_block": "10.0.4.0/22",
        "tags": {
          "Name": "undefined-c8067231-private-subnet-1"
        },
        "vpc_id": "${aws_vpc.undefined_VPC_3BBFAF3D.id}"
      },
      "undefined_PublicSubnet_547050B0": {
        "//": {
          "metadata": {
            "path": "root/undefined/PublicSubnet",
            "uniqueId": "undefined_PublicSubnet_547050B0"
          }
        },
        "cidr_block": "10.0.0.0/24",
        "tags": {
          "Name": "undefined-c8067231-public-subnet-1"
        },
        "vpc_id": "${aws_vpc.undefined_VPC_3BBFAF3D.id}"
      }
    },
    "aws_vpc": {
      "undefined_VPC_3BBFAF3D": {
        "//": {
          "metadata": {
            "path": "root/undefined/VPC",
            "uniqueId": "undefined_VPC_3BBFAF3D"
          }
        },
        "cidr_block": "10.0.0.0/16",
        "enable_dns_hostnames": true,
        "enable_dns_support": true,
        "tags": {
          "Name": "undefined-c8067231-vpc"
        }
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
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
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
          require("./inflight.$Closure1.js")({
            $r: ${context._lift(r)},
            $r2: ${context._lift(r2)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(r, host, ["rawClient"]);
          $Closure1._registerBindObject(r2, host, ["get", "set"]);
        }
        super._registerBind(host, ops);
      }
    }
    const r = this.node.root.newAbstract("@winglang/sdk.ex.Redis",this,"ex.Redis");
    const r2 = this.node.root.newAbstract("@winglang/sdk.ex.Redis",this,"r2");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "redis", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

