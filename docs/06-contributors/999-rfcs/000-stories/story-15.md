# User Story 15 - Task List with Api Gateway and Redis

> **Status**: Draft, Expected released on 2023/03/16


The following code is an initial implementation of TaskList with api gateway and a redis db 

## New language and SDK features it introduces

- [x] bring untyped
  - [x] bring external npm package (axios)
  - [x] bring an internal nodejs stdlib (RegEx)
  - [x] How does untyped works with numeric operations?
  - [x] Do we cast untyped? 
- [x] ~enum & duration that can be included inside json~ (Json should not include these) 
- [x] It leverages setting explicit permissions (using the `this.inflight` API, described [here](https://github.com/winglang/wing/pull/1610))
- [x] Using interface 
- [x] use redis instead of bucket
- [x] code that updates estimation and duration from REST put command
- [x] console requirements
- [x] Optionality ? and ??
- [x] redis is packaged inside our SDK
- [x] I wanted to use ioredis as an inflight memebr but there are 2 issues:
  - [x] Missing inflight init (used lazy getter style method instead) 
  - [x] ioredis is from type any (redis.IRedisClient) 


## Developer Experience

This section focuses on the develoepr experience 

### Redis on localhost 

There is a range of posibilities here:

One option is to have a a complete battery included solution that handle installing and running redis instance w/wo docker.<br/>
Another option is taking the do-it-yourself approach that require the developer to setup the instance listening on a configured port.

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

interface ITaskList {
  inflight get(id: str): Json;
  inflight add(title: str): str;
  inflight remove(id: str): void; 
  inflight find(r: IMyRegExp): Array<str>;
  inflight set_status(id: str, status: Status): str;
  inflight set_estimation(id: str, estimation: duration): str;
}

resource TaskList impl ITaskList {
  _redis: redis.Redis;
  // we are missing inflight init, so I need to create a lazy get_redis_client method  
  // that creates the _redis_client when it is first called
  inflight var _redis_client: redis.IRedisClient?; 
  
  extern "./tasklist_helper.js" static inflight uuid(): str; 
  
  init() {
    this._redis = new redis.Redis();
  }
  
  inflight get_redis_client(): redis.IRedisClient { 
    if !this.redis_client? {
      this._redis_client = this._redis.ioredis();
    }
    return this._redis_client;
  }
  
  inflight get(id: str): Json {
    return Json.parse(this.get_redis_client().get(id));
  }
  
  inflight _add(id: str, j: Json): str {
    this.get_redis_client().set(id , Json.stringify(j));
    this.get_redis_client().sadd("todo", id);
    return id;
  } 
    
  inflight add(title: str): str {
    let id = TaskList.uuid();
    let j = Json { 
      title: title, 
      status: "uncompleted"
      };
    log("adding task ${id} with data: ${j}"); 
    return this._add(id, j);
  }
      
  inflight remove(id: str) {
    log("removing task ${id}");
    this.get_redis_client().del(id);
  }
      
  inflight find(r: IMyRegExp): Array<str> { 
    let result = MutArray<str>[]; 
    let ids = this.get_redis_client().smembers("todo");
    for id in ids {
      let j = Json.parse(this.get_redis_client().get(id));
      if r.test(j.get("title")) {
        result.push(id);
      }
    }
    return result.copy();
  }
      
  inflight set_status(id: str, status: Status): str {
    let j = Json.clone_mut(this.get(id));
    if status == Status.Completed {
      j.set("status", "completed");
    } else {
      j.set("status", "uncompleted");
    }
    this._add(id, Json.clone(j));
    return id;
  }
        
  inflight set_estimation(id: str, estimation: duration): str {
    let j = Json.clone_mut(this.get(id));
    j.set("estimated_in_seconds", estimation.seconds);
    this._add(id, Json.clone(j));
    return id;
  }
}
      
resource TaskListApi {
  api: cloud.Api;
  task_list: ITaskList;
        
  extern "./tasklist_helper.js" static inflight create_regex(s: str): IMyRegExp;
  extern "./tasklist_helper.js" static inflight get_data(url: str): Json;
        
  init(task_list: ITaskList) {
    this.task_list = task_list;
    this.api = new cloud.Api();
        
    this.api.post("/tasks", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let var title = str.from_json(req.body.get("title"));
      // Easter Egg - if you add a todo with the single word "random" as the title, 
      //              the system will fetch a random task from the internet
      if title == "random" {
        let data: Json = TaskListApi.get_data("https://www.boredapi.com/api/activity");
        title = str.from_json(data.get("activity")); 
      } 
      let id = this.task_list.add(title);
      return cloud.ApiResponse { status:201, body: id };
    });
        
    this.api.put("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.vars.get("id"));
      if req.body.get("estimation_in_days")? { 
        this.task_list.set_estimation(id, num.from_str(req.body.get("estimation_in_days")));
      }
      if req.body.get("completed")? {
        if bool.from_json(req.body.get("completed")) {
          this.task_list.set_status(id, Status.Completed);
        } else {
          this.task_list.set_status(id, Status.Uncompleted);
        }      
      }
      try {
        let title = this.task_list.get(id);
        return cloud.ApiResponse { status:200, body: title };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });

    this.api.get("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.vars.get("id"));
      try {
        let title = this.task_list.get(id);
        return cloud.ApiResponse { status:200, body: title };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });
    
    this.api.delete("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.vars.get("id"));
      try {
        this.task_list.delete(id);
        return cloud.ApiResponse { status: 204 };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });

    this.api.get("/tasks", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let search = str.from_json(req.query.get("search") ?? Json ".*"); 
      let results = this.task_list.find(TaskListApi.create_regex(search));
      return cloud.ApiResponse { status: 200, body: results };
    });
  }
}

let task_list = new TaskList();
let t = new TaskListApi(task_list);
```
#### `tasklist_helper.js`

```js
const axios = require("axios");

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
