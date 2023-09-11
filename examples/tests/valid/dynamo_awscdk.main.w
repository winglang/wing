/*\
skip: true
\*/
// this example only works on AWS (intentionally)

bring "aws-cdk-lib" as awscdk;
bring aws;
bring cloud;
bring util;

enum AttributeType {
  String,
  Number,
  Binary,
}

struct Attribute {
  type: AttributeType;
  value: Json;
}

class DynamoTable {
  table: awscdk.aws_dynamodb.Table;
  tableName: str;
  init() {
    let target = util.env("WING_TARGET");
    if target != "awscdk" {
      throw "Unsupported target: ${target} (expected 'awscdk')";
    }

    this.table = new awscdk.aws_dynamodb.Table(
      tableName: this.node.addr,
      billingMode: awscdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: awscdk.RemovalPolicy.DESTROY,
      partitionKey: awscdk.aws_dynamodb.Attribute {
        name: "Flavor",
        type: awscdk.aws_dynamodb.AttributeType.STRING,
      },
    );
    this.tableName = this.table.tableName;
  }

  bind(host: std.IInflightHost, ops: Array<str>) {
    if let host = aws.Function.from(host) {
      if ops.contains("putItem") {
        host.addPolicyStatements([aws.PolicyStatement {
          actions: ["dynamodb:PutItem"],
          resources: [this.table.tableArn],
          effect: aws.Effect.ALLOW,
        }]);
      }

      if ops.contains("getItem") {
        host.addPolicyStatements([aws.PolicyStatement {
          actions: ["dynamodb:GetItem"],
          resources: [this.table.tableArn],
          effect: aws.Effect.ALLOW,
        }]);
      }
    }
  }

  extern "./dynamo.js" static inflight _putItem(tableName: str, item: Json): void;
  inflight putItem(item: Map<Attribute>) {
    let json = this._itemToJson(item);
    DynamoTable._putItem(this.tableName, json);
  }

  extern "./dynamo.js" static inflight _getItem(tableName: str, key: Json): Json;
  inflight getItem(key: Map<Attribute>): Json {
    let json = this._itemToJson(key);
    return DynamoTable._getItem(this.tableName, json);
  }

  inflight _itemToJson(item: Map<Attribute>): Json {
    let json = MutJson {};
    for key in item.keys() {
      let attribute = item.get(key);
      let attributeTypeStr = this._attributeTypeToString(attribute.type);

      let innerJson = MutJson {};
      innerJson.set(attributeTypeStr, attribute.value);
      json.set(key, innerJson);
    }
    return json;
  }

  inflight _attributeTypeToString(type: AttributeType): str {
    if type == AttributeType.String {
      return "S";
    } elif type == AttributeType.Number {
      return "N";
    } elif type == AttributeType.Binary {
      return "B";
    }
  }
}

// --- tests ---

let table = new DynamoTable();

test "cdk table" {
  table.putItem({
    "Flavor" => Attribute {
      type: AttributeType.String,
      value: "Chocolate",
    },
    "Quantity" => Attribute {
      type: AttributeType.String,
      value: "20Kg"
    }
  });

  let c = table.getItem({
    "Flavor" => Attribute {
      type: AttributeType.String,
      value: "Chocolate",
    }
  });
  assert(c.get("Item").get("Flavor").get("S").asStr() == "Chocolate");
  assert(c.get("Item").get("Quantity").get("S").asStr() == "20Kg");
}
