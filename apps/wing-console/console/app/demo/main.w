bring cloud;
bring ex;
// @see https://github.com/winglang/wing/issues/4237 it crashes the Console preview env.
//let secret = new cloud.Secret(name: "my-secret");

// let bucket = new cloud.Bucket();
// let queue = new cloud.Queue();
// let api = new cloud.Api();
// let counter = new cloud.Counter(initial: 0);


// api.get("/test-get", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
//   bucket.put("hello.txt", "Hello, GET!");
//   return cloud.ApiResponse {
//     status: 200,
//     body: Json.stringify(req.query)
//   };
// });
// api.post("/test-post", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
//   counter.inc();
//   return cloud.ApiResponse {
//     status: 200,
//     body: "Hello, POST!"
//   };
// });

// let handler = inflight (message: str): str => {
//   bucket.put("hello.txt", "Hello, {message}!");
//   log("Hello, {message}!");
//   return message;
// };

// queue.setConsumer(handler);

// new cloud.Function(inflight (message: str?): str? => {
//   counter.inc();
//   log("Counter is now {counter.inc(0)}");
//   return message;
// }) as "IncrementCounter";

// let topic = new cloud.Topic() as "Topic";
// topic.onMessage(inflight (message: str): str => {
//   log("Topic subscriber #1: {message}");
//   return message;
// });

// // let r = new ex.Redis();
// // new cloud.Function(inflight (message :str) :str => {
// //   log("{r.url()}");
// //   r.set("wing", message);
// //   let value = r.get("wing");
// //   log("{value}");
// //   return r.url();
// // }) as "Redis interaction";

// let table = new ex.Table(
//   name: "simple-table",
//   primaryKey: "id",
//   columns: {
//     "id" => ex.ColumnType.STRING,
//     "name" => ex.ColumnType.STRING,
//     "date" => ex.ColumnType.DATE,
//     "active" => ex.ColumnType.BOOLEAN,
//   },
// );

// let rateSchedule = new cloud.Schedule(cloud.ScheduleProps{
//   rate: 5m
// }) as "Rate Schedule";

// rateSchedule.onTick(inflight () => {
//   log("Rate schedule ticked!");
// });

// new cloud.Service(
//   inflight () => {
//     log("start!");
//     return inflight () => {
//       log("stop!");
//     };
//   },
// );

// let cronSchedule = new cloud.Schedule(cloud.ScheduleProps{
//   cron: "* * * * *"
// }) as "Cron Schedule";

// // cronSchedule.onTick(inflight () => {
// //   log("Cron schedule ticked!");
// // });

// test "Increment counter" {
//   let previous = counter.inc();
//   log("Assertion should fail: {previous} === {counter.peek()}");
//   assert(previous == 1);
// }

// test "Push message to the queue" {
//  queue.push("hey");
// }

// test "Print"{
//   log("Hello World!");
//   assert(true);
// }

// test "without assertions nor prints" {
// }

// test "Add fixtures" {
//   let arr = [1, 2, 3, 4, 5];

//   log("Adding {arr.length} files in the bucket..");
//   for item in arr {
//     bucket.put("fixture_{item}.txt", "Content for the fixture_{item}!");
//   }

//   log("Publishing to the topic..");
//   topic.publish("Hello, topic!");

//   log("Setting up counter..");
//   counter.set(0);
//   counter.inc(100);
// }

bring ui;

class WidgetService {
  data: cloud.Bucket;
  counter: cloud.Counter;

  new() {
    this.data = new cloud.Bucket();
    this.counter = new cloud.Counter();
    
    // // a field displays a labeled value, with optional refreshing
    // new ui.Field(
    //   "Total widgets",
    //   inflight () => { return this.countWidgets(); },
    //   refreshRate: 5s,
    // );

    // // a button lets you invoke any inflight function
    // new ui.Button("Add widget", inflight () => { this.addWidget(); });
  }

  pub inflight addWidget() {
    let id = this.counter.inc();
    this.data.put("widget-{id}", "my data");
  }

  pub inflight countWidgets(): str {
    return "{this.data.list().length}";
  }
}

let widget = new WidgetService();

new cloud.Function(inflight () => {
  widget.addWidget();
}) as "AddWidget";

// class ApiUsersService {
//   api: cloud.Api; 
//   db: cloud.Bucket;
  
//   new() {
//     this.api = new cloud.Api();
//     this.db = new cloud.Bucket();
    
//     this.api.post("/users", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {  
//       let input = Json.tryParse(request.body ?? "") ?? "";
//       let name = input.tryGet("name")?.tryAsStr() ?? "";
//       if name == "" {
//         return cloud.ApiResponse {
//           status: 400,
//           body: "Body parameter 'name' is required"
//         };
//       }
//       this.db.put("user-{name}", Json.stringify(input));
//       return cloud.ApiResponse {
//         status: 200,
//         body: Json.stringify(input)
//       };
//     });
//     this.api.get("/users", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
//       let name = request.query.tryGet("name") ?? "";
      
//       if name != "" {
//         try {
//           return cloud.ApiResponse {
//             status: 200,
//             body: this.db.get("user-{name}")
//           };
//         } catch {
//           return cloud.ApiResponse {
//             status: 404,
//             body: "User not found"
//           };
//         }
//       }
      
//       return cloud.ApiResponse {
//         status: 200,
//         body: Json.stringify(this.db.list())
//       };
//     });

//     new ui.HttpClient(
//       "Test HttpClient UI component",
//       inflight () => {
//         return this.api.url;
//       },
//       inflight () => {
//         return Json.stringify({
//           "paths": {
//             "/users": {
//               "post": {
//                 "summary": "Create a new user",
//                 "parameters": [
//                   {
//                     "in": "header",
//                     "name": "cookie",
//                   },
//                 ],
//                 "requestBody": {
//                   "required": true,
//                   "content": {
//                     "application/json": {
//                       "schema": {
//                         "type": "object",
//                         "required": [
//                           "name",
//                         ],
//                         "properties": {
//                           "name": {
//                             "type": "string",
//                             "description": "The name of the user"
//                           },
//                           "email": {
//                             "type": "string",
//                             "description": "The email of the user",
//                           }
//                         }
//                       }
//                     }
//                   }
//                 },
//               },
//               "get": {
//                 "summary": "List all widgets",
//                 "parameters": [
//                   {
//                     "in": "query",
//                     "name": "name",
//                     "schema": {
//                       "type": "string"
//                     },
//                     "description": "The name of the user"
//                   }
//                 ],
//               }
//             },
//           }
//         });
//       }
//    );
//   }
// }

// new ApiUsersService();
