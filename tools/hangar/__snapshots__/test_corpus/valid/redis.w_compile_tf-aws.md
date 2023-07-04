# [redis.w](../../../../../examples/tests/valid/redis.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ r, r2 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const connection = (await r.rawClient());
      (await connection.set("wing","does redis"));
      const value = (await connection.get("wing"));
      {((cond) => {if (!cond) throw new Error("assertion failed: value == \"does redis\"")})((value === "does redis"))};
      (await r2.set("wing","does redis again"));
      const value2 = (await r2.get("wing"));
      {((cond) => {if (!cond) throw new Error("assertion failed: value2 == \"does redis again\"")})((value2 === "does redis again"))};
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.testtest_Handler_295107CC.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_eip": {
      "EIP": {
        "//": {
          "metadata": {
            "path": "root/Default/EIP",
            "uniqueId": "EIP"
          }
        }
      }
    },
    "aws_elasticache_cluster": {
      "r2_RedisCluster_C6087F40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/r2/RedisCluster",
            "uniqueId": "r2_RedisCluster_C6087F40"
          }
        },
        "availability_zone": "${aws_subnet.PrivateSubnet.availability_zone}",
        "cluster_id": "r2-c882797c",
        "engine": "redis",
        "engine_version": "6.2",
        "node_type": "cache.t4g.small",
        "num_cache_nodes": 1,
        "parameter_group_name": "default.redis6.x",
        "security_group_ids": [
          "${aws_security_group.r2_securityGroup_35A75C2E.id}"
        ],
        "subnet_group_name": "${aws_elasticache_subnet_group.r2_RedisSubnetGroup_C415566B.name}"
      },
      "redisRedis_RedisCluster_17F572CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/redis.Redis/RedisCluster",
            "uniqueId": "redisRedis_RedisCluster_17F572CD"
          }
        },
        "availability_zone": "${aws_subnet.PrivateSubnet.availability_zone}",
        "cluster_id": "redis-redis-c811048b",
        "engine": "redis",
        "engine_version": "6.2",
        "node_type": "cache.t4g.small",
        "num_cache_nodes": 1,
        "parameter_group_name": "default.redis6.x",
        "security_group_ids": [
          "${aws_security_group.redisRedis_securityGroup_235C75C0.id}"
        ],
        "subnet_group_name": "${aws_elasticache_subnet_group.redisRedis_RedisSubnetGroup_F1A1B37D.name}"
      }
    },
    "aws_elasticache_subnet_group": {
      "r2_RedisSubnetGroup_C415566B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/r2/RedisSubnetGroup",
            "uniqueId": "r2_RedisSubnetGroup_C415566B"
          }
        },
        "name": "r2-c882797c-subnetGroup",
        "subnet_ids": [
          "${aws_subnet.PrivateSubnet.id}"
        ]
      },
      "redisRedis_RedisSubnetGroup_F1A1B37D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/redis.Redis/RedisSubnetGroup",
            "uniqueId": "redisRedis_RedisSubnetGroup_F1A1B37D"
          }
        },
        "name": "redis-redis-c811048b-subnetGroup",
        "subnet_ids": [
          "${aws_subnet.PrivateSubnet.id}"
        ]
      }
    },
    "aws_iam_role": {
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
      "testtest_Handler_IamRolePolicy_AF0279BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "testtest_Handler_IamRolePolicy_AF0279BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"elasticache:Describe*\"],\"Resource\":[\"${aws_elasticache_cluster.redisRedis_RedisCluster_17F572CD.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"elasticache:Describe*\"],\"Resource\":[\"${aws_elasticache_cluster.r2_RedisCluster_C6087F40.arn}\"],\"Effect\":\"Allow\"},{\"Effect\":\"Allow\",\"Action\":[\"ec2:CreateNetworkInterface\",\"ec2:DescribeNetworkInterfaces\",\"ec2:DeleteNetworkInterface\",\"ec2:DescribeSubnets\",\"ec2:DescribeSecurityGroups\"],\"Resource\":\"*\"},{\"Effect\":\"Allow\",\"Action\":[\"ec2:CreateNetworkInterface\",\"ec2:DescribeNetworkInterfaces\",\"ec2:DeleteNetworkInterface\",\"ec2:DescribeSubnets\",\"ec2:DescribeSecurityGroups\"],\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
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
    "aws_internet_gateway": {
      "InternetGateway": {
        "//": {
          "metadata": {
            "path": "root/Default/InternetGateway",
            "uniqueId": "InternetGateway"
          }
        },
        "tags": {
          "Name": "Default-c82bf964-internet-gateway"
        },
        "vpc_id": "${aws_vpc.VPC.id}"
      }
    },
    "aws_lambda_function": {
      "testtest_Handler_295107CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "testtest_Handler_295107CC"
          }
        },
        "environment": {
          "variables": {
            "REDIS_CLUSTER_ID_30c8c4ae": "${aws_elasticache_cluster.r2_RedisCluster_C6087F40.cluster_id}",
            "REDIS_CLUSTER_ID_5c75c5cf": "${aws_elasticache_cluster.redisRedis_RedisCluster_17F572CD.cluster_id}",
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1",
            "WING_TARGET": "tf-aws"
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
          "security_group_ids": [
            "${aws_security_group.redisRedis_securityGroup_235C75C0.id}",
            "${aws_security_group.r2_securityGroup_35A75C2E.id}"
          ],
          "subnet_ids": [
            "${aws_subnet.PrivateSubnet.id}",
            "${aws_subnet.PrivateSubnet.id}"
          ]
        }
      }
    },
    "aws_nat_gateway": {
      "NATGateway": {
        "//": {
          "metadata": {
            "path": "root/Default/NATGateway",
            "uniqueId": "NATGateway"
          }
        },
        "allocation_id": "${aws_eip.EIP.id}",
        "subnet_id": "${aws_subnet.PublicSubnet.id}",
        "tags": {
          "Name": "Default-c82bf964-nat-gateway"
        }
      }
    },
    "aws_route_table": {
      "PrivateRouteTable": {
        "//": {
          "metadata": {
            "path": "root/Default/PrivateRouteTable",
            "uniqueId": "PrivateRouteTable"
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
            "nat_gateway_id": "${aws_nat_gateway.NATGateway.id}",
            "network_interface_id": null,
            "transit_gateway_id": null,
            "vpc_endpoint_id": null,
            "vpc_peering_connection_id": null
          }
        ],
        "tags": {
          "Name": "Default-c82bf964-private-route-table-1"
        },
        "vpc_id": "${aws_vpc.VPC.id}"
      },
      "PublicRouteTable": {
        "//": {
          "metadata": {
            "path": "root/Default/PublicRouteTable",
            "uniqueId": "PublicRouteTable"
          }
        },
        "route": [
          {
            "carrier_gateway_id": null,
            "cidr_block": "0.0.0.0/0",
            "core_network_arn": null,
            "destination_prefix_list_id": null,
            "egress_only_gateway_id": null,
            "gateway_id": "${aws_internet_gateway.InternetGateway.id}",
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
          "Name": "Default-c82bf964-public-route-table-1"
        },
        "vpc_id": "${aws_vpc.VPC.id}"
      }
    },
    "aws_route_table_association": {
      "PrivateRouteTableAssociation": {
        "//": {
          "metadata": {
            "path": "root/Default/PrivateRouteTableAssociation",
            "uniqueId": "PrivateRouteTableAssociation"
          }
        },
        "route_table_id": "${aws_route_table.PrivateRouteTable.id}",
        "subnet_id": "${aws_subnet.PrivateSubnet.id}"
      },
      "PublicRouteTableAssociation": {
        "//": {
          "metadata": {
            "path": "root/Default/PublicRouteTableAssociation",
            "uniqueId": "PublicRouteTableAssociation"
          }
        },
        "route_table_id": "${aws_route_table.PublicRouteTable.id}",
        "subnet_id": "${aws_subnet.PublicSubnet.id}"
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
    },
    "aws_security_group": {
      "r2_securityGroup_35A75C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/r2/securityGroup",
            "uniqueId": "r2_securityGroup_35A75C2E"
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
              "${aws_subnet.PrivateSubnet.cidr_block}"
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
        "name": "30c8c4ae-securityGroup",
        "vpc_id": "${aws_vpc.VPC.id}"
      },
      "redisRedis_securityGroup_235C75C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/redis.Redis/securityGroup",
            "uniqueId": "redisRedis_securityGroup_235C75C0"
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
              "${aws_subnet.PrivateSubnet.cidr_block}"
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
        "name": "5c75c5cf-securityGroup",
        "vpc_id": "${aws_vpc.VPC.id}"
      }
    },
    "aws_subnet": {
      "PrivateSubnet": {
        "//": {
          "metadata": {
            "path": "root/Default/PrivateSubnet",
            "uniqueId": "PrivateSubnet"
          }
        },
        "cidr_block": "10.0.4.0/22",
        "tags": {
          "Name": "Default-c82bf964-private-subnet-1"
        },
        "vpc_id": "${aws_vpc.VPC.id}"
      },
      "PublicSubnet": {
        "//": {
          "metadata": {
            "path": "root/Default/PublicSubnet",
            "uniqueId": "PublicSubnet"
          }
        },
        "cidr_block": "10.0.0.0/24",
        "tags": {
          "Name": "Default-c82bf964-public-subnet-1"
        },
        "vpc_id": "${aws_vpc.VPC.id}"
      }
    },
    "aws_vpc": {
      "VPC": {
        "//": {
          "metadata": {
            "path": "root/Default/VPC",
            "uniqueId": "VPC"
          }
        },
        "cidr_block": "10.0.0.0/16",
        "enable_dns_hostnames": true,
        "enable_dns_support": true,
        "tags": {
          "Name": "Default-c82bf964-vpc"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const redis = require('@winglang/sdk').redis;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const r_client = context._lift(r);
        const r2_client = context._lift(r2);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            r: ${r_client},
            r2: ${r2_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(r, host, []);
          $Closure1._registerBindObject(r2, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(r, host, ["rawClient"]);
          $Closure1._registerBindObject(r2, host, ["get", "set"]);
        }
        super._registerBind(host, ops);
      }
    }
    const r = this.node.root.newAbstract("@winglang/sdk.redis.Redis",this,"redis.Redis");
    const r2 = this.node.root.newAbstract("@winglang/sdk.redis.Redis",this,"r2");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "redis", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

