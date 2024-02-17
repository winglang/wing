# [redis.test.w](../../../../../examples/tests/valid/redis.test.w) | compile | tf-aws

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
    async handle(message) {
      (await $r.set("hello", message));
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
module.exports = function({ $queue, $r, $r2, $util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $r2.set("wing", "does redis again"));
      const value2 = (await $r2.get("wing"));
      $helpers.assert($helpers.eq(value2, "does redis again"), "value2 == \"does redis again\"");
      (await $queue.push("world!"));
      (await $util_Util.waitUntil((async () => {
        return $helpers.neq((await $r.get("hello")), undefined);
      })));
      $helpers.assert($helpers.eq("world!", String.raw({ raw: ["", ""] }, (await $r.get("hello")))), "\"world!\" == \"{r.get(\"hello\")}\"");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
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
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "cloudQueue-SetConsumer0_CloudwatchLogGroup_FCFCF419": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "cloudQueue-SetConsumer0_CloudwatchLogGroup_FCFCF419"
          }
        },
        "name": "/aws/lambda/cloud-Queue-SetConsumer0-c8b576c9",
        "retention_in_days": 30
      }
    },
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
      "exRedis_RedisCluster_3C9A5882": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Redis/RedisCluster",
            "uniqueId": "exRedis_RedisCluster_3C9A5882"
          }
        },
        "availability_zone": "${aws_subnet.PrivateSubnet.availability_zone}",
        "cluster_id": "ex-redis-c8a27ec9",
        "engine": "redis",
        "engine_version": "6.2",
        "node_type": "cache.t4g.small",
        "num_cache_nodes": 1,
        "parameter_group_name": "default.redis6.x",
        "security_group_ids": [
          "${aws_security_group.exRedis_KEN15securityGroup_3840F345.id}"
        ],
        "subnet_group_name": "${aws_elasticache_subnet_group.exRedis_RedisSubnetGroup_EE9BBE48.name}"
      },
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
          "${aws_security_group.r2_KEN24securityGroup_AFC21ADF.id}"
        ],
        "subnet_group_name": "${aws_elasticache_subnet_group.r2_RedisSubnetGroup_C415566B.name}"
      }
    },
    "aws_elasticache_subnet_group": {
      "exRedis_RedisSubnetGroup_EE9BBE48": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Redis/RedisSubnetGroup",
            "uniqueId": "exRedis_RedisSubnetGroup_EE9BBE48"
          }
        },
        "name": "ex-redis-c8a27ec9-subnetGroup",
        "subnet_ids": [
          "${aws_subnet.PrivateSubnet.id}"
        ]
      },
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
      }
    },
    "aws_iam_role": {
      "cloudQueue-SetConsumer0_IamRole_968DB138": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRole",
            "uniqueId": "cloudQueue-SetConsumer0_IamRole_968DB138"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudQueue-SetConsumer0_IamRolePolicy_3E29E517": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRolePolicy",
            "uniqueId": "cloudQueue-SetConsumer0_IamRolePolicy_3E29E517"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"elasticache:Describe*\"],\"Resource\":[\"${aws_elasticache_cluster.exRedis_RedisCluster_3C9A5882.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"ec2:CreateNetworkInterface\",\"ec2:DescribeNetworkInterfaces\",\"ec2:DeleteNetworkInterface\",\"ec2:DescribeSubnets\",\"ec2:DescribeSecurityGroups\"],\"Resource\":[\"*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudQueue-SetConsumer0_IamRolePolicyAttachment_B207137A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "cloudQueue-SetConsumer0_IamRolePolicyAttachment_B207137A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.name}"
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
    "aws_lambda_event_source_mapping": {
      "cloudQueue_EventSourceMapping_41814136": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "cloudQueue_EventSourceMapping_41814136"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.cloudQueue.arn}",
        "function_name": "${aws_lambda_function.cloudQueue-SetConsumer0.function_name}"
      }
    },
    "aws_lambda_function": {
      "cloudQueue-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/Default",
            "uniqueId": "cloudQueue-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "REDIS_CLUSTER_ID_89baf91f": "${aws_elasticache_cluster.exRedis_RedisCluster_3C9A5882.cluster_id}",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer0-c8b576c9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer0-c8b576c9",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue-SetConsumer0_S3Object_52D070FF.key}",
        "timeout": "${aws_sqs_queue.cloudQueue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [
            "${aws_security_group.exRedis_KEN15securityGroup_3840F345.id}"
          ],
          "subnet_ids": [
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
      "cloudQueue-SetConsumer0_S3Object_52D070FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/S3Object",
            "uniqueId": "cloudQueue-SetConsumer0_S3Object_52D070FF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_security_group": {
      "exRedis_KEN15securityGroup_3840F345": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Redis/KEN.15]}securityGroup",
            "uniqueId": "exRedis_KEN15securityGroup_3840F345"
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
        "name": "89baf91f-securityGroup",
        "vpc_id": "${aws_vpc.VPC.id}"
      },
      "r2_KEN24securityGroup_AFC21ADF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/r2/KEN.24]}securityGroup",
            "uniqueId": "r2_KEN24securityGroup_AFC21ADF"
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
      }
    },
    "aws_sqs_queue": {
      "cloudQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "cloudQueue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "cloud-Queue-c86e03d8",
        "visibility_timeout_seconds": 30
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
        "availability_zone": "${data.aws_region.Region.name}a",
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
        "availability_zone": "${data.aws_region.Region.name}a",
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
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const ex = $stdlib.ex;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
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
            [r, ["set"]],
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
            $queue: ${$stdlib.core.liftObject(queue)},
            $r: ${$stdlib.core.liftObject(r)},
            $r2: ${$stdlib.core.liftObject(r2)},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
            [$stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"), ["waitUntil"]],
            [queue, ["push"]],
            [r, ["get"]],
            [r2, ["get", "set"]],
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const r = this.node.root.new("@winglang/sdk.ex.Redis", ex.Redis, this, "ex.Redis");
    const r2 = this.node.root.new("@winglang/sdk.ex.Redis", ex.Redis, this, "r2");
    const queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "cloud.Queue");
    (queue.setConsumer(new $Closure1(this, "$Closure1"), { timeout: (std.Duration.fromSeconds(3)) }));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:testing Redis", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "redis.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

