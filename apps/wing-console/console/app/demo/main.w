bring cloud;
bring dynamodb;
bring ui;


let table = new dynamodb.Table(
    hashKey: "key",
    attributes: [
        { name: "key", type: "S" },
    ],
);

// @see https://github.com/winglang/wing/issues/4237 it crashes the Console preview env.
// let secret = new cloud.Secret(name: "my-secret");

class TableStorage {
  table: dynamodb.Table;
  topic: cloud.Topic;

  new() {
      this.table = new dynamodb.Table(
          hashKey: "key",
          attributes: [
              { name: "key", type: "S" },
          ],
      ) as "dynamodb.Table";
      

      this.topic = new cloud.Topic();
      
      new ui.Table("Table", {
        getPrimaryKey: inflight () => {
          return "key";
        },
        put: inflight (item: str) => {
            this.table.put(Item: Json.parse(item));
        },
        update: inflight (key: str, item: str) => {
          this.table.update({
            Key: key,
            UpdateExpression: "set contents = :contents",
            ExpressionAttributeValues: {
              ":contents": item,
            },
          });
        },
        delete: inflight (key: str) => {
          this.table.delete({
            Key: key,
          });
        },
        get: inflight (key: str) => {
          let item = this.table.get({
            Key: key,
          });
          
          return item.Item ?? {};
        },
        scan: inflight () => {
          let output = this.table.scan();
          return output.Items;
        },
      }
    );
  }
  
  pub inflight putObject(key: str, contents: str) {
      this.table.put(
          Item: {
              key,
              contents,
          },
      );
      this.topic.publish(key);
  }

  pub inflight getObject(key: str): str {
      let item = this.table.get(
          Key: {
              key,
          },
      ).Item!;
      return item.get("contents").asStr();
  }

  pub onObjectCreated(callback: inflight (str): void) {
      this.topic.onMessage(inflight (key) => {
          callback(key);
      });
  }
}

let tableStorage = new TableStorage() as "TableStorage";
