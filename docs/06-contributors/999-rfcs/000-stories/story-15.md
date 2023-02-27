User Story 15 - Task List with Api Gateway and Redis
Status: Draft, Expected released on 2023/03/16

The following code is an inital implementation of TaskList with api gateway and a redis db 

## New landuage and SDK features it introduces

- [x] bring untyped
  - [x] bring external npm package (axios)
  - [x] bring an internal nodejs stdlib (RegEx)
- [x] Enum & Duration that can be included inside json
- [x] It leverages setting explicit permissions (using the `this.inflight` API, described [here](https://github.com/winglang/wing/pull/1610))
- [ ] bring cdktf
- [ ] use redis instead of bucket
- [ ] code that updates estimation and duration from REST post command

## Discussion points
- Review the code and 
- Should the `cloud.api` API have the `on_` prefix to match `cloud.bucket` API and also to allow calling
the api get/post/delete/put commands (`api.get(url)` vs `api.on_get(path, 
- I have used express's synatx for dynamic parts of the path for the api gateway `get("/task/:id"`, 
but then I noticed that [aws](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-step-by-step.html) 
uses the `{id}` syntax. What should be the the right syntax?

## Code 
```ts (wing)

bring cloud;

// TODO discuss how we bring untyped something like RegEx from JavaScript 
bring untyped from_js("RegExp"); 

// npm install axios
bring untyped axios from_js("axios"); 

enum Status {
  Uncompleted,
  Completed
}

interface ITaskListModel {
  inflight get(id: str): Json}
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
    this.inflights.add("add", ref: "this._bucket", op: "put");
    // is this the right synatx for multiple ops? 
    this.inflights.add("set_status", ref: "this._bucket", op: ["get", "put"]); 
    // TODO add more permissions
  }

  inflight get(id: str): Json {
     return this._bucket.get_json(id);
  }

  inflight add(title: str): str {
    // uuid should be a standard type
    // TODO discuss interface
    let id = uuid.v4(); 
    let j = Json { 
      title: title, 
      status: Status.Uncompleted
    };
    print("adding task ${id} with data: ${j}"); 
    this._bucket.put_json(id, j);
    return id;
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
    //TODO add implementation
  }

  inflight set_estimation(id: str, estimation: duration): str {
    let j = Json.clone_mut(this.get_task(id));
    j.effort_estimation = effort_estimation;
    this._bucket.put_json(id, j);
    return id;
  }
}

resource TaskListApi {
  api: cloud.Api;
  model: TaskListModel;
  init(model: ITaskListModel) {
    this.model = model;
    this.api = new cloud.Api();
    
    // Should this be on_post, on_get
    this.api.post("/tasks", inflight (req: cloud. Api.ApiRequest): cloud.Api.ApiResponse => {
      let var title = str.from_json(req.body.title);
      if title == random {
        // can I cast an untyped ?
        let random_task: Json = await axios.get('https://www.boredapi.com/api/activity');
        title = str.from_json(random_task.data.activity); 
      } 
      let id = this.model.add(title);
      return new cloud.Api.ApiResponse(status:201, body: Json.format(id));
    });

    this.api.get("/tasks/:id", inflight (req: cloud.Api.ApiRequest): cloud.Api.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        let title = this.model.get(id);
        return new cloud.Api.ApiResponse(status:200, body: Json.format(title));
      } catch {
        return new cloud.Api.ApiResponse(status:400);
      }
    });
    
    this.api.delete("/tasks/:id", inflight (req: cloud.Api.ApiRequest): cloud.Api.ApiResponse => {
      let id = str.from_json(req.params.id);
      try {
        this.model.delete(id);
        return new cloud.Api.ApiResponse(status:204);
      } catch {
        return new cloud.Api.ApiResponse(status:400);
      }
    });

    this.api.get("/tasks", inflight (req: cloud.Api.ApiRequest): cloud.Api.ApiResponse => {
      let search = new Regex(str.from_json(req.query.search ?? Json ".*")); 
      let results = this.model.find(search);
      return new cloud.Api.ApiResponse(status:200, body: Json.format(results));
    });
  }
}

let model = new TaskListModel();
let t = new TaskListApi(model);

// More TODO
// - Add post to update estimation and status
// - Add Redis instead of bucket 
// - bring CDKTF
```
