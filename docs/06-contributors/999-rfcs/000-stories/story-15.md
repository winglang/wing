# User Story 15 - Task List with Api Gateway and Redis

> **Status**: Draft, Expected released on 2023/03/16


The following code is an inital implementation of TaskList with api gateway and a redis db 

## New landuage and SDK features it introduces

- [x] bring untyped
  - [x] bring external npm package (axios)
  - [x] bring an internal nodejs stdlib (RegEx)
- [x] Enum & Duration that can be included inside json
- [x] It leverages setting explicit permissions (using the `this.inflight` API, described [here](https://github.com/winglang/wing/pull/1610))
- [x] Using interface 
- [x] uuid as standard type (missing spec)
- [ ] bring cdktf
- [ ] use redis instead of bucket
- [ ] code that updates estimation and duration from REST post command

## Discussion topics
- `get` vs `on_get` - Should the `cloud.api` API have the `on_` prefix to match `cloud.bucket` API and also to allow calling
the api get/post/delete/put commands (`api.get(url)` vs `api.on_get(path, inflight ())`
- Routing params - I have used express's synatx for dynamic parts of the path for the api gateway `get("/task/:id"`, 
but then I noticed that [aws](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-step-by-step.html) 
uses the `{id}` syntax. What should be the the right syntax?
- Bring internal nodejs types - how do we bring somethink that we can't require, like `RegEx`

## Code 
```ts (wing)

bring cloud;

// TODO discuss how we bring untyped something like RegEx from JavaScript 
bring untyped RegExp from_js("RegExp"); 

// npm install axios
bring untyped axios require_from_js("axios"); 

enum Status {
  Uncompleted,
  Completed
}

interface ITaskListModel {
  inflight get(id: str): Json;
  inflight add(title: str): str;
  inflight remove(id: str); 
  inflight find(r: RegExp): Array<str> ;
  inflight set_status(id: str, status: Status): str;
  inflight set_estimation(id: str, estimation: duration): str;
}

resource TaskListModel implementes ITaskListModel {
  _bucket: cloud.Bucket;
  init() {
    this._bucket = new cloud.Bucket();
    this.inflights.add("get", ref: "this._bucket", op: "get");
    this.inflights.add("_add", ref: "this._bucket", op: "put");
    // notice I am calling on this
    this.inflights.add("add", ref: "this", op: "_add");
    // is this the right synatx for multiple ops? 
    this.inflights.add("set_status", ref: "this", op: ["_add", "get"]); 
    this.inflights.add("set_estimation", ref: "this", op: ["_add", "get"]); 

    // TODO add more permissions for remove, find
  }

  inflight get(id: str): Json {
     return this._bucket.get_json(id);
  }
  
  inflight _add(id: str, j: Json): str {
    this._bucket.put_json(id, j);
    return id;
  } 
  
  inflight add(title: str): str {
    let id = uuid.v4(); 
    let j = Json { 
      title: title, 
      status: Status.Uncompleted
    };
    print("adding task ${id} with data: ${j}"); 
    return this_add(id, js);
  }

  inflight remove(id: str) {
    print("removing task ${id}");
    this._bucket.delete(id);
    return id;
  }

  inflight find(r: RegExp): Array<str> { 
    //TODO add implementation
  }

  inflight set_status(id: str, status: Status): str {
    let j = Json.clone_mut(this.get(id));
    j.status = status;
    this._add(id, j);
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
  model: TaskListModel;
  init(model: ITaskListModel) {
    this.model = model;
    this.api = new cloud.Api();
    
    // TODO add this.put
    
    this.api.post("/tasks", inflight (req: cloud. Api.ApiRequest): cloud.ApiResponse => {
      let var title = str.from_json(req.body.title);
      if title == random {
        // can I cast an untyped ?
        let random_task: Json = await axios.get('https://www.boredapi.com/api/activity');
        title = str.from_json(random_task.data.activity); 
      } 
      let id = this.model.add(title);
      return new cloud.ApiResponse(status:201, body: Json.format(id));
    });

    this.api.get("/tasks/:id", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        let title = this.model.get(id);
        return new cloud.ApiResponse(status:200, body: Json.format(title));
      } catch {
        return new cloud.ApiResponse(status:400);
      }
    });
    
    this.api.delete("/tasks/:id", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        this.model.delete(id);
        return new cloud.ApiResponse(status:204);
      } catch {
        return new cloud.ApiResponse(status:400);
      }
    });

    this.api.get("/tasks", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let search = new Regex(str.from_json(req.query.search ?? Json ".*")); 
      let results = this.model.find(search);
      return new cloud.ApiResponse(status:200, body: Json.format(results));
    });
  }
}

let model = new TaskListModel();
let t = new TaskListApi(model);

```
