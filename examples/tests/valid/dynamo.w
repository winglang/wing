/*\
skip: true
\*/
// this example only works on AWS (intentionally)

bring "@cdktf/provider-aws" as tfaws;
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
  table: tfaws.dynamodbTable.DynamodbTable;
  tableName: str;
  init() {
    let target = util.env("WING_TARGET");
    if target != "tf-aws" {
      throw "Unsupported target: ${target} (expected 'tf-aws')";
    }

    this.table = new tfaws.dynamodbTable.DynamodbTable(
      name: this.node.addr,
      billingMode: "PAY_PER_REQUEST",
      hashKey: "Flavor",
      attribute: [
        {
          name: "Flavor",
          type: "S",
        },
      ],
    );
    this.tableName = this.table.name;
  }

  bind(host: std.IInflightHost, ops: Array<str>) {
    if let host = aws.Function.from(host) {
      if ops.contains("putItem") {
        host.addPolicyStatements([aws.PolicyStatement {
          actions: ["dynamodb:PutItem"],
          resources: [this.table.arn],
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
