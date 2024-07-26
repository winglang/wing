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
      );
      

      this.topic = new cloud.Topic();
      
      new ui.Table("Table", {
        put: inflight (item: str) => {
            this.table.put(Item: Json.parse(item));
        },
        update: inflight (key: str, item: str) => {
          
        },
        delete: inflight (key: str) => {
          this.table.delete({
            Key: key,
          });
        },
        get: inflight (key: str) => {
          return this.table.get({
          Key: key,
          });
        },
        list: inflight () => {
          return this.table.scan();
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

let tableStorage = new TableStorage();
