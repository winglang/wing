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
- `get` vs `on_get` - Should the `cloud.api` API have the `on_` prefix to match `cloud.bucket` API and also to allow calling
the api get/post/delete/put commands (`api.get(url)` vs `api.on_get(path, inflight ())`
- [x] Routing params - I have used express's synatx for dynamic parts of the path for the api gateway `get("/task/:id"`, 
but then I noticed that [aws](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-step-by-step.html) 
uses the `{id}` syntax. What should be the the right syntax?
  - We will go with the [openapi spec](https://swagger.io/docs/specification/paths-and-operations/) that uses the `/tasks/{id}` syntax 
- Bring internal nodejs types - how do we bring something that we can't require, like `RegEx`
- From anything to Json - can I cast something from bring untyped to Json? 
- Calling await 

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
        return cloud.ApiResponse(status:400);
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
