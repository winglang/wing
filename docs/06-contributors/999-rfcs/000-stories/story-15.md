# User Story 15 - Task List with Api Gateway and Redis

> **Status**: Draft, Expected released on 2023/03/16


The following code is an initial implementation of TaskList with api gateway and a redis db 

## New language and SDK features it introduces

- [x] bring untyped
  - [x] bring external npm package (axios)
  - [x] bring an internal nodejs stdlib (RegEx)
  - [x] How does untyped works with numeric operations?
  - [x] Do we cast untyped? 
- [x] enum & duration that can be included inside json
- [x] It leverages setting explicit permissions (using the `this.inflight` API, described [here](https://github.com/winglang/wing/pull/1610))
- [x] Using interface 
- [x] Using await when calling an untyped function that returns a promise
- [x] use redis instead of bucket
- [ ] bring cdktf
- [ ] code that updates estimation and duration from REST put command
- [ ] console requirements

## Discussion topics
- [ ] How is the redis package distributed (currently inside wing, we don't have npm yet)

## Developer Experience

This section focuses on the develoepr experience 

### Redis on localhost 

There is a range of posibilities here:

One option is to have a a complete battery included solution that handle installing and running redis instance w/wo docker
Another option approach is taking the do-it-yourself approach that require the developer to setup the instance listening on a configured port.

### Api Gateway in Console
We want to allow develope to interact with the API internally inside the console and/or externally with curl, postman, etc...

### Redis in console
When @yoav-steinberg was asked about which Redis GUI is the most common one, he answered: 
> I think 99% of users just use command line.

Considering that is the case, it would be nice to allow developers to interact with REDIS inside the console, if possible and feasible in a timely manner 
A good example on how this may look like is Redis embedded prompt inside their docs (see the [examples section](https://redis.io/commands/set/#examples))

![image](https://user-images.githubusercontent.com/1727147/222132089-c679b5dd-04e1-42c1-b9d0-83aa4a0cf47b.png)


## Code 
```ts (wing)
bring cloud;
bring redis;

// TODO discuss how we bring untyped something like RegEx from JavaScript 
// PLACEHOLER for bringing something from Javascript stdlib
bring untyped js ;

// prerequisite: npm install axios
// PALCEHOLDER for bringing some external module
bring untyped "axios" as axios; 

enum Status {
  Uncompleted,
  Completed
}

interface ITaskList {
  inflight get(id: str): Json;
  inflight add(title: str): str;
  inflight remove(id: str): void; 
  inflight find(r: str): Array<str>;
  inflight set_status(id: str, status: Status): str;
  inflight set_estimation(id: str, estimation: duration): str;
}

resource TaskList implementes ITaskList {
  _redis: redis.Redis;
  init() {
    this._redis = new redis.Redis();
    this.inflights.add("get", ref: "this._redis", op: "GET" );
    this.inflights.add("_add", ref: "this._redis", op: ["SET", "SADD"]);
    // notice I am setting explicit permissions on this
    this.inflights.add("add", ref: "this", op: "_add");
    // is this the right synatx for multiple ops? 
    this.inflights.add("set_status", ref: "this", op: ["_add", "get"]); 
    this.inflights.add("set_estimation", ref: "this", op: ["_add", "get"]); 

    // TODO add more permissions for remove, find
  }

  inflight get(id: str): Json {
     return Json.parse(this._redis.GET(id));
  }
  
  inflight _add(id: str, j: Json): str {
    this._redis.SET(id , Json.format(j));
    this._redis.SADD("todo", id);
    return id;
  } 
  
  inflight add(title: str): str {
    // PLACEHOLDER - how does untyped works with numeric operations
    let id = "${js.Math.floor(js.Math.random() * 100000000000)}";
    let j = Json { 
      title: title, 
      status: Status.Uncompleted
    };
    print("adding task ${id} with data: ${j}"); 
    return this_add(id, js);
  }

  inflight remove(id: str) {
    print("removing task ${id}");
    this._redis.DEL(id);
  }

  // PLACEHOLDER - having an untyped type
  inflight find(term: str): Array<str> { 
    let r = new js.RegExp(term);
    let result = MutArray<str>[]; 
    let ids = this._redis.SMEMBERS("todo");
    for id in ids {
      let j = Json.parse(this._redis.GET(id));
      // Notice that there is autocasting from untyped to bool here 
      if r.test(j.title) {
        result.push(id);
      }
    }
    return result.copy();
  }

  inflight set_status(id: str, status: Status): str {
    let j = Json.clone_mut(this.get(id));
    j.status = status;
    this._add(id, Json.clone(j));
    return id;
  }

  inflight set_estimation(id: str, estimation: duration): str {
    let j = Json.clone_mut(this.get(id));
    j.effort_estimation = estimation;
    this._add(id, j);
    return id;
  }
}

resource TaskListApi {
  api: cloud.Api;
  task_list: ITaskList;
  init(task_list: ITaskList) {
    this.task_list = task_list;
    this.api = new cloud.Api();
    
    // TODO add this.put
    
    this.api.post("/tasks", inflight (req: cloud. Api.ApiRequest): cloud.ApiResponse => {
      let var title = str.from_json(req.body.title);
      // Easter Egg - if you add a todo with the single word "random" as the title, 
      //              the system will fetch a random task from the internet
      if title == "random" {
        // PLACEHOLDER - can I cast an untyped ?
        let random_task = axios.get('https://www.boredapi.com/api/activity');
        title = str.from_json(random_task.data.activity); 
      } 
      let id = this.task_list.add(title);
      return cloud.ApiResponse { status:201, body: Json.format(id) };
    });

    this.api.get("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        let title = this.task_list.get(id);
        return cloud.ApiResponse {status:200, body: Json.format(title)};
      } catch {
        return cloud.ApiResponse { status: 400 };
      }
    });
    
    this.api.delete("/tasks/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        this.task_list.delete(id);
        return cloud.ApiResponse(status:204);
      } catch {
        return cloud.ApiResponse(status:400);
      }
    });

    this.api.get("/tasks", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let search = str.from_json(req.query.search ?? Json ".*"); 
      let results = this.task_list.find(search);
      return cloud.ApiResponse(status:200, body: Json.format(results));
    });
  }
}

let task_list = new TaskList();
let t = new TaskListApi(task_list);

```
