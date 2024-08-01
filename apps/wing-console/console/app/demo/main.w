bring cloud;
bring ui;
bring util;
bring sim;

// let errorService = new cloud.Service(inflight () => {}) as "ErrorService";

// let errorResource = new sim.Resource(inflight () => {
//   throw "Oops";
// }) as "ErrorResource" in errorService;

// @see https://github.com/winglang/wing/issues/4237 it crashes the Console preview env.
// let secret = new cloud.Secret(name: "my-secret");

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();
let api = new cloud.Api();
let counter = new cloud.Counter(initial: 0);

class myBucket {
  b: cloud.Bucket;
  new() {
    this.b = new cloud.Bucket();
    new ui.FileBrowser("File Browser",
      {
        put: inflight (fileName: str, fileContent:str) => {
          this.b.put(fileName, fileContent);
        },
        delete: inflight (fileName: str) => {
          this.b.delete(fileName);
        },
        get: inflight (fileName: str) => {
          return this.b.get(fileName);
        },
        list: inflight () => {return this.b.list();},
      }
    );

    new cloud.Service(
      inflight () => {
        this.b.put("hello.txt", "Hello, GET!");
        return inflight () => {
        };
      },
    );
  }
  pub inflight put(key: str, value: str) {
    this.b.put(key, value);
  }
}

let myB = new myBucket() as "MyUIComponentBucket";

let putfucn = new cloud.Function(inflight () => {
    myB.put("test", "Test");
}) as "PutFileInCustomBucket";

api.get("/test-get", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  bucket.put("hello.txt", "Hello, GET!");
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(req.query)
  };
});
api.post("/test-post", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  counter.inc();
  return cloud.ApiResponse {
    status: 200,
    body: "Hello, POST!"
  };
});

let handler = inflight (message): str => {
   counter.inc();
  bucket.put("hello{counter.peek()}.txt", "Hello, {message}!");
  log("Hello, {message}!");
  return message;
};

queue.setConsumer(handler);

new cloud.Function(inflight (message: Json?) => {
  counter.inc();
  log("Counter is now {counter.inc(0)}");
  return message;
}) as "IncrementCounter";

let topic = new cloud.Topic() as "Topic";
topic.onMessage(inflight (message: str): str => {
  log("Topic subscriber #1: {message}");
  return message;
});

let rateSchedule = new cloud.Schedule(cloud.ScheduleProps{
  rate: 5m
}) as "Rate Schedule";
nodeof(rateSchedule).expanded = true;

rateSchedule.onTick(inflight () => {
  log("Rate schedule ticked!");
});

new cloud.Service(
  inflight () => {
    return inflight () => {
      log("stop!");
    };
  },
);

let cronSchedule = new cloud.Schedule(cloud.ScheduleProps{
  cron: "* * * * *"
}) as "Cron Schedule";

// cronSchedule.onTick(inflight () => {
//   log("Cron schedule ticked!");
// });

test "Increment counter" {
  let previous = counter.inc();
  log("Assertion should fail: {previous} === {counter.peek()}");
  assert(previous == 1);
}

test "Push message to the queue" {
 queue.push("hey");
}

test "Print"{
  log("Hello World!");
  assert(true);
}

test "without assertions nor prints" {
}

test "Add fixtures" {
  let arr = [1, 2, 3, 4, 5];

  log("Adding {arr.length} files in the bucket..");
  for item in arr {
    bucket.put("fixture_{item}.txt", "Content for the fixture_{item}!");
  }

  log("Publishing to the topic..");
  topic.publish("Hello, topic!");

  log("Setting up counter..");
  counter.set(0);
  counter.inc(100);
}

class WidgetService {
  data: cloud.Bucket;
  counter: cloud.Counter;
  bucket: myBucket;

  new() {
    this.data = new cloud.Bucket();
    this.counter = new cloud.Counter();
    this.bucket = new myBucket() as "MyInternalBucket";
    
    // a field displays a labeled value, with optional refreshing
    new ui.Field(
      "Total widgets",
      inflight () => { return this.countWidgets(); },
      refreshRate: 5s,
    ) as "TotalWidgets";

    // a link field displays a clickable link
    new ui.Field(
      "Widgets Link",
      inflight () => { return "https://winglang.io"; },
      link: true,
    ) as "WidgetsLink";

    // a button lets you invoke any inflight function
    new ui.Button("Add widget", inflight () => { this.addWidget(); });
  }

  pub inflight addWidget() {
    let id = this.counter.inc();
    this.data.put("widget-{id}", "my data");
  }

  inflight countWidgets(): str {
    return "{this.data.list().length}";
  }
}

let widget = new WidgetService();

new cloud.Function(inflight () => {
  widget.addWidget();
}) as "AddWidget";

class ApiUsersService {
  api: cloud.Api; 
  db: cloud.Bucket;
  
  new() {
    this.api = new cloud.Api();
    this.db = new cloud.Bucket();
    
    this.api.post("/users", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {  
      let input = Json.tryParse(request.body ?? "") ?? "";
      let name = input.tryGet("name")?.tryAsStr() ?? "";
      if name == "" {
        return cloud.ApiResponse {
          status: 400,
          body: "Body parameter 'name' is required"
        };
      }
      this.db.put("user-{name}", Json.stringify(input));
      return cloud.ApiResponse {
        status: 200,
        body: Json.stringify(input)
      };
    });
    this.api.get("/users", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
      let name = request.query.tryGet("name") ?? "";
      
      if name != "" {
        try {
          return cloud.ApiResponse {
            status: 200,
            body: this.db.get("user-{name}")
          };
        } catch {
          return cloud.ApiResponse {
            status: 404,
            body: "User not found"
          };
        }
      }
      
      return cloud.ApiResponse {
        status: 200,
        body: Json.stringify(this.db.list())
      };
    });

    new ui.HttpClient(
      "Test HttpClient UI component",
      inflight () => {
        return this.api.url;
      },
      inflight () => {
        return Json.stringify({
          "paths": {
            "/users": {
              "post": {
                "summary": "Create a new user",
                "parameters": [
                  {
                    "in": "header",
                    "name": "accept",
                  },
                ],
                "requestBody": {
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "required": [
                          "name",
                        ],
                        "properties": {
                          "name": {
                            "type": "string",
                            "description": "The name of the user"
                          },
                          "email": {
                            "type": "string",
                            "description": "The email of the user",
                          }
                        }
                      }
                    }
                  }
                },
              },
              "get": {
                "summary": "List all widgets",
                "parameters": [
                  {
                    "in": "query",
                    "name": "name",
                    "schema": {
                      "type": "string"
                    },
                    "description": "The name of the user"
                  }
                ],
              }
            },
          }
        });
      }
   );
  }
}

new ApiUsersService();

log("hello from inflight");

bring dynamodb;
bring math;

let table = new dynamodb.Table(
  hashKey: "key",
  attributes: [
    { name: "key", type: "S" },
  ],
) as "dynamodb.Table";

let visual = new ui.Table(
  scan: inflight () => {
    let output = table.scan();
    return output.Items;
  },
) as "ui.Table" in table;

new cloud.Function(inflight () => {
  table.put(
    Item: {
      key: "human_{util.nanoid()}",
      age: 20 + math.floor(math.random(30)),
    },
  );
}) as "table-put-item-function";
