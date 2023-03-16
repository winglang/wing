# User Story 16 - Task List with Api Gateway, Redis and Struct

> **Status**: Draft, Expected released on 2023/03/30


## Main diffrences from story 15 and issues noticed
- Introduced Task struct
  - The `ITaskList` API to include the `Task` struct
  - Task -> Json enconding/decoding actually includes duration and Enum encoding/decoding 
  - struct should support string interpolation 
  - Missing Struct <-> String API - I've repeated this pattern alot `Task.from_json(Json.parse(...))`
  - Using the spread api for defining new Task based on an old one
 and `Json.to_str(Task.to_json(...))`
  - I had an Array<Task> that I wanted to turn into a Json, should this be a single API call of Array ? 
- `inflight init` to remove the lazy calcuation of Redis Connection
- Modified find to accept a predicate Task -> bool instead of a term
  - Missing phase independantfunctions - it was awkward to define that predicate as `inflight`
- Added Duration.from_days 


### Api Gateway in Console

We want to allow develope to interact with the API internally inside the console and/or externally with curl, postman, etc...
Wing Console will query the Api Gateway resource for all available endpoints

### Redis in console

When @yoav-steinberg was asked about which Redis GUI is the most common one, he answered: 
> I think 99% of users just use command line.

Considering that is the case, it would be nice to allow developers to interact with REDIS inside the console, if possible and feasible in a timely manner 
A good example on how this may look like is Redis embedded prompt inside their docs (see the [examples section](https://redis.io/commands/set/#examples))

![image](https://user-images.githubusercontent.com/1727147/222132089-c679b5dd-04e1-42c1-b9d0-83aa4a0cf47b.png)


## Code 
#### `tasklist.w`
```ts (wing)
bring cloud;
bring redis;

interface IMyRegExp {
  inflight test(s: str): bool;
}

enum Status {
  Uncompleted,
  Completed
}

struct Task {
  title: str;
  estimation: duration?;
  status: Status;
}

interface    {
  inflight get(id: str): Task;
  inflight add(task: Task): str;
  inflight update(id: str, task: Task): str;
  inflight remove(id: str): void; 
  inflight find(predicate: inflight (Task): bool): Array<Task>;
}

resource TaskList impl ITaskList {
  _redis: redis.Redis;
  // we are missing inflight init, so I need to create a lazy get_redis_client method  
  // that creates the _redis_client when it is first called
  inflight _redis_connection: redis.IRedisClient?; 
  
  extern "./tasklist_helper.js" static inflight uuid(): str; 
  
  init() {
    this._redis = new redis.Redis();
  }

  inflight init() {
    this._redis_connection = this._redis.ioredis();
  }

  inflight get(id: str): Task {
     return Task.from_json(Json.parse(this._redis_connection.get(id)));
  }
  
  inflight update(id: str, t: Task): str {
    let s = Json.to_str(Task.to_json(t));
    this._redis_connection.set(id, s);
    this._redis_connection.sadd("todo", id);
    return id;
  } 
  
  inflight add(task: Task): str {
    let id = TaskList.uuid();
    print("adding task ${id} with data: ${task}"); 
    return this.update(id, task);
  }

  inflight remove(id: str) {
    print("removing task ${id}");
    this._redis_connection.del(id);
  }

  inflight find(predicate: inflight (Task): bool ): Array<Task> { 
    let result = MutArray<Task>[]; 
    let ids = this._redis_connection.smembers("todo");
    for id in ids {
      let task = Task.from_json(Json.parse(this.get_redis_client.get(id)));
      if predicate(task)  {
        result.push(task);
      }
    }
    return result.copy();
  }

}

resource TaskListApi {
  api: cloud.Api;
  task_list: ITaskList;
        
  extern "./tasklist_helper.js" static inflight create_regex: (s: str): IMyRegExp  
  extern "./tasklist_helper.js" static inflight get_data: (url: str): Json;
        
  init(task_list: ITaskList) {
    this.task_list = task_list;
    this.api = new cloud.Api();
    
    this.api.post("/tasks", inflight (req: cloud. Api.ApiRequest): cloud.ApiResponse => {
      let var title = str.from_json(req.body.title);
      // Easter Egg - if you add a todo with the single word "random" as the title, 
      //              the system will fetch a random task from the internet
      if title == "random" {
        let data: Json = TaskListApi.get_data('https://www.boredapi.com/api/activity');
        title = str.from_json(data.activity); 
      } 
      let id = this.task_list.add(Task {
        title: title,
        completed: Status.Uncompleted
      });
      return cloud.ApiResponse { status:201, body: Json.to_str(id) };
    });
    
    this.api.put("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.params.id);
      let var task = this.task_list.get(id); 
      if req.body.estimation_in_days? { 
        task = Task { estimation: Duration.from_days(req.body.estimation_in_days), ...task };
      }
      if req.body.completed? {
        if bool.from_json(req.body.completed) {
            task = Task { status: Status.Completed, ...task };
          } else {
            task = Task { status: Status.Uncompleted, ...task };
        }
      }
      try {
        this.task_list.update(id, task);
        return cloud.ApiResponse { status:200, body: Json.to_str(Task.to_json(task)) };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });

    this.api.get("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        let title = this.task_list.get(id);
        return cloud.ApiResponse { status:200, body: Json.to_str(Task.to_json(title)) };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });
    
    this.api.delete("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        this.task_list.delete(id);
        return cloud.ApiResponse { status: 204 };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });

    this.api.get("/tasks", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let search = TaskListApi.create_regex(str.from_json(req.query.search ?? Json ".*")); 
      let tasks = this.task_list.find(inflight (task: Task) => {
        return search.test(task.title);
      });
      // is there an short way to do this? 
      let result = MutJson [];
      for t in tasks {
        result.push(Task.to_json(t));
      }
      return cloud.ApiResponse { status: 200, body: result.copy() };
    });
  }
}

let task_list = new TaskList();
let t = new TaskListApi(task_list);
```
#### `tasklist_helper.js`

```js
const axios = require('axios');

exports.get_data = async function(url) {
  const response = await axios.get(url);
  return response.data; // returns a JSON
};

exports.create_regex = function (s) {
  return new RegExp(s);
};

exports.uuid = function () {
  return "" + Math.floor(Math.random() * 100000000000);
};
```
