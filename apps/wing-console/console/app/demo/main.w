bring cloud;
bring ex;
bring ui;

// @see https://github.com/winglang/wing/issues/4237 it crashes the Console preview env.
//let secret = new cloud.Secret(name: "my-secret");

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();
let api = new cloud.Api();
let counter = new cloud.Counter(initial: 0);
struct PutData {
  fileName: str;
  fileContent: str;
}
struct GetData {
  fileName: str;
}
struct DeleteData {
  fileName: str;
}

class myBucket {
    b: cloud.Bucket;
    new() {
        log("Bucket created!");
        this.b = new cloud.Bucket();
            // a button lets you invoke any inflight function
        new ui.FileBrowser("File Browser",
            inflight (payload: str) => {
                log("Put {payload}");
                let data: PutData = PutData.fromJson(Json.parse(payload));
                this.b.put(data.fileName, data.fileContent);
            },
             inflight (payload: str) => {
                log("Delete {payload}");
                let data: DeleteData = DeleteData.fromJson(Json.parse(payload));
                this.b.delete(data.fileName);
            },
            inflight (payload: str) => {
                let data: GetData = GetData.fromJson(Json.parse(payload));
                return this.b.get(data.fileName);
                },
             inflight () => {return this.b.list();},
        );

        new cloud.Service(
            inflight () => {
                log("start!");
                this.b.put("hello.txt", "Hello, GET!");
                return inflight () => {
                    log("stop!");
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

let handler = inflight (message: str): str => {
   counter.inc();
  bucket.put("hello{counter.peek()}.txt", "Hello, {message}!");
  log("Hello, {message}!");
  return message;
};

queue.setConsumer(handler);

new cloud.Function(inflight (message: str?): str? => {
  counter.inc();
  log("Counter is now {counter.inc(0)}");
  return message;
}) as "IncrementCounter";

let topic = new cloud.Topic() as "Topic";
topic.onMessage(inflight (message: str): str => {
  log("Topic subscriber #1: {message}");
  return message;
});

// let r = new ex.Redis();
// new cloud.Function(inflight (message :str) :str => {
//   log("{r.url()}");
//   r.set("wing", message);
//   let value = r.get("wing");
//   log("{value}");
//   return r.url();
// }) as "Redis interaction";

let table = new ex.Table(
  name: "simple-table",
  primaryKey: "id",
  columns: {
    "id" => ex.ColumnType.STRING,
    "name" => ex.ColumnType.STRING,
    "date" => ex.ColumnType.DATE,
    "active" => ex.ColumnType.BOOLEAN,
  },
);

let rateSchedule = new cloud.Schedule(cloud.ScheduleProps{
  rate: 5m
}) as "Rate Schedule";

rateSchedule.onTick(inflight () => {
  log("Rate schedule ticked!");
});

new cloud.Service(
  inflight () => {
    log("start!");
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

  new() {
    this.data = new cloud.Bucket();
    this.counter = new cloud.Counter();
    
    // a field displays a labeled value, with optional refreshing
    new ui.Field(
      "Total widgets",
      inflight () => { return this.countWidgets(); },
      refreshRate: 5s,
    );

    // a button lets you invoke any inflight function
    new ui.Button("Add widget", inflight () => { this.addWidget(); });
  }

  inflight addWidget() {
    let id = this.counter.inc();
    this.data.put("widget-{id}", "my data");
  }

  inflight countWidgets(): str {
    return "{this.data.list().length}";
  }
}

new WidgetService();
