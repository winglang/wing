Initial feedback for TaskListApi Resource that usese cloud.Api 

```ts (wing)

bring cloud;
resource TaskListModel {

  init() {

  }
  inflight get(id: str): str {

  }

  inflight add(title: str): str {

  }

  inflight remove(id: str) {

  }

  inflight find(r: str): Set<str> { 

  }
}

resource TaskListApi {
  api: cloud.Api;
  model: TaskListModel;
  init() {
    this.model = new TaskListModel();
    this.api = new cloud.Api();
    
    this.api.post("/tasks", (req: cloud.Api.ApiRequest): cloud.Api.ApiResponse => {
      let title = Str.from_json(req.body.title);
      let id = this.model.add(title);
      return new cloud.Api.ApiResponse(status:202, body: Json.format(id));
    });

    this.api.get("/tasks/:id", (req: cloud.Api.ApiRequest): cloud.Api.ApiResponse => {
      let id = Str.from_json(req.params.id);
      try {
        let title = this.model.get(id);
        return new cloud.Api.ApiResponse(status:202, body: Json.format(title));
      } catch {
        return new cloud.Api.ApiResponse(status:404);
      }
    });
    
    this.api.delete("/tasks/:id", (req: cloud.Api.ApiRequest): cloud.Api.ApiResponse => {
      let id = Str.from_json(req.params.id);
      try {
        this.model.delete(id);
        return new cloud.Api.ApiResponse(status:204);
      } catch {
        return new cloud.Api.ApiResponse(status:404);
      }
    });

    this.api.get("/tasks", (req: cloud.Api.ApiRequest): cloud.Api.ApiResponse => {
      let search = Str.try_from_json(req.query.search) ?? ".*"; // Do we want a regex primitive? Regex.from_str(".*")
      let results = this.model.find(search);
      return new cloud.Api.ApiResponse(status:202, body: Json.format(results));
    });
  }
}

let t = new TaskListApi();
```
