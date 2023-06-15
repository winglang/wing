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


let EMPTY_JSON = Json { empty: "https://github.com/winglang/wing/issues/1947" };

interface IMyRegExp {
  inflight test(s: str): bool;
}

enum Status {
  UNCOMPLETED,
  COMPLETED
}

interface ITaskList {
  inflight get(id: str): Json;
  inflight add(title: str): str;
  inflight remove(id: str); 
  inflight find(r: IMyRegExp): Array<str>;
  inflight set_status(id: str, status: Status): str;
}

resource TaskList impl ITaskList {
  _redis: redis.Redis;
  
  extern "./tasklist_helper.js" static inflight uuid(): str; 
  // Workaround for https://github.com/winglang/wing/issues/1669 - changed method to be non-static
  extern "./tasklist_helper.js" inflight get_data(url: str): Json;
  extern "./tasklist_helper.js" inflight create_regex(s: str): IMyRegExp;

  init() {
    this._redis = new redis.Redis();
  }
  
  inflight get(id: str): Json {
    return Json.parse(this._redis.get(id) ?? "");
  }
  
  inflight _add(id: str, j: Json): str {
    this._redis.set(id , Json.stringify(j));
    this._redis.sadd("todo", id);
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
    this._redis.del(id);
  }
      
  inflight find(r: IMyRegExp): Array<str> { 
    let result = MutArray<str>[]; 
    let ids = this._redis.smembers("todo");
    for id in ids {
      let j = Json.parse(this._redis.get(id) ?? "");
      if r.test(str.from_json(j.get("title"))) {
        result.push(id);
      }
    }
    return result.copy();
  }
      
  inflight set_status(id: str, status: Status): str {
    let j = Json.deepCopyMut(this.get(id));
    if status == Status.COMPLETED {
      j.set("status", "completed");
    } else {
      j.set("status", "uncompleted");
    }
    this._add(id, Json.deepCopyMut(j));
    return id;
  }
        
}
      
resource TaskListApi {
  api: cloud.Api;
  task_list: TaskList;
        
  init(task_list: TaskList) {
    this.task_list = task_list;
    this.api = new cloud.Api();
        
    this.api.post("/tasks", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let body = req.body ?? EMPTY_JSON;
      let var title = str.from_json(body.get("title"));
      // Easter Egg - if you add a todo with the single word "random" as the title, 
      //              the system will fetch a random task from the internet
      if title == "random" {
        // Workaround for https://github.com/winglang/wing/issues/1969 - calling task_list directly instead of via `this.`
        let data: Json = task_list.get_data("https://www.boredapi.com/api/activity");
        title = str.from_json(data.get("activity")); 
      } 
      let id = task_list.add(title);
      return cloud.ApiResponse { status:201, body: id };
    });
        
    this.api.put("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let vars = req.vars ?? Map<str>{};
      let body = req.body ?? EMPTY_JSON;
      let id = str.from_json(vars.get("id"));
      if bool.from_json(body.get("completed")) {
        task_list.set_status(id, Status.COMPLETED);
      } else {
        task_list.set_status(id, Status.UNCOMPLETED);
      }
      try {
        let title = task_list.get(id);
        return cloud.ApiResponse { status:200, body: title };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });

    this.api.get("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let vars = req.vars ?? Map<str>{};
      let id = str.from_json(vars.get("id"));
      try {
        let title = task_list.get(id);
        return cloud.ApiResponse { status:200, body: title };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });
    
    this.api.delete("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let vars = req.vars ?? Map<str>{};
      let id = str.from_json(vars.get("id"));
      try {
        task_list.remove(id);
        return cloud.ApiResponse { status: 204 };
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });

    this.api.get("/tasks", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let search = req.query.get("search");
      let results = task_list.find(task_list.create_regex(search));
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
