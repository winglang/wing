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
      throw("Unsupported target: ${target} (expected 'awscdk')");
    }

    this.table = new awscdk.aws_dynamodb.Table(
      tableName: this.node.addr,
      billingMode: awscdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: awscdk.aws_dynamodb.Attribute {
        name: "Flavor",
        type: awscdk.aws_dynamodb.AttributeType.STRING,
      },
    );
    this.tableName = this.table.tableName;
  }

  _bind(host: std.IInflightHost, ops: Array<str>) {
    if let host = aws.Function.from(host) {
      if ops.contains("putItem") {
        host.addPolicyStatements([aws.PolicyStatement {
          actions: ["dynamodb:PutItem"],
          resources: [this.table.tableArn],
          effect: aws.Effect.ALLOW,
        }]);
      }
    }
  }

  extern "./dynamo.js" inflight _putItem(tableName: str, item: Json): void;

  inflight putItem(item: Map<Attribute>) {
    let json = this._itemToJson(item);
    this._putItem(this.tableName, json);
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

test "put an item in the table" {
  table.putItem({
    "Flavor" => Attribute {
      type: AttributeType.String,
      value: "Chocolate",
    },
  });
}