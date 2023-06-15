bring cloud;
bring redis;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();
let api = new cloud.Api();

api.get("/test-get", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify({
      query: Json (Json req).get("query"),
    })
  };
});
api.post("/test-post", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: "Hello, POST!"
  };
});

let handler = inflight (message: str): str => {
  bucket.put("hello.txt", "Hello, ${message}!");
  log("Hello, ${message}!");
  return message;
};

queue.setConsumer(handler);

let counter = new cloud.Counter(initial: 0);
new cloud.Function(inflight (message: str): str => {
  counter.inc();
  log("Counter is now ${counter.inc(0)}");
  return message;
}) as "IncrementCounter";

let topic = new cloud.Topic() as "Topic";
topic.onMessage(inflight (message: str): str => {
  log("Topic subscriber #1: ${message}");
  return message;
});
topic.onMessage(inflight (message: str): str => {
  log("Topic subscriber #2: ${message}");
  return message;
});

let r = new redis.Redis();
new cloud.Function(inflight (message :str) :str => {
  log("${r.url()}");
  r.set("wing", message);
  let value = r.get("wing");
  log("${value}");
  return r.url();
}) as "Redis interaction";


let table = new cloud.Table(cloud.TableProps{
  name: "simple-table",
  primaryKey: "id",
  columns: {
    id: cloud.ColumnType.STRING,
    name: cloud.ColumnType.STRING,
    date: cloud.ColumnType.DATE,
    active: cloud.ColumnType.BOOLEAN,
  },
});

let rateSchedule = new cloud.Schedule(cloud.ScheduleProps{
  rate: 5m
}) as "Rate Schedule";

rateSchedule.onTick(inflight () => {
  log("Rate schedule ticked!");
});

let cronSchedule = new cloud.Schedule(cloud.ScheduleProps{
  cron: "* * * * ?"
}) as "Cron Schedule";

cronSchedule.onTick(inflight () => {
  log("Cron schedule ticked!");
});

test "Increment counter" {
  let previous = counter.inc();
  log("Assertion should fail: ${previous} === ${counter.peek()}");
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

  log("Adding ${arr.length} files in the bucket..");
  for item in arr {
    bucket.put("fixture_${item}.txt", "Content for the fixture_${item}!");
  }

  log("Publishing to the topic..");
  topic.publish("Hello, topic!");

  log("Setting up counter..");
  counter.set(0);
  counter.inc(100);
}
