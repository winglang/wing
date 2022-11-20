# Sprint 8


It is an early morning in the heart of Tel Aviv, a CEO wakes up and heads out to waycup, his favorite coffee shop. 
He starts his day going over his emails, slack messages, his CLI based TODO app, updates from github, etc… 
But this story is not about that CEO, nor it is about that day. 
This story is about that TODO app, and the team that created it using a completely new language in just 2 weeks.

You mission, if you choose to accept it, is to implement this the following single tennant TODO app for sim and for aws:

```js

bring cloud;


struct Task {
  title: str;
  completed: bool?;
}

struct TaskItem extends Task {
  id: str;
}


// could have been a wonderful CRUD<Task> if we had generics
resource Tasks {
  _model: cloud.KeyValueStore.Model // we only care about the actual model here

  init(){ 
    let data = new cloud.KeyValueStore();
    this._model = data.model("task")
  }

  async public ~list(): TaskItem[] {
    return await this._model.list()
  }
  
  async public ~add(task: Task): TaskItem {
    let doc = await this._model(task.to_json())
    return TaskItem { id:doc.id, task } // using struct expansion
  }
  
  async public ~update(id: str, task: Task): boolean {
    return await this._model.find_and_update(id, task.to_json())
  }
  
  async public ~delete(id: str): boolean {
    return await this._model.delete(id)
  }
}


resource TaskApi{ 
  init(tasks: Tasks){
    this._api = new cloud.Api();
  
    // we can also create use the (req,res):void tuple convention, 
    // I used the (req):res here and on the other I used the (req, res), we need to decide
    
    api.on_get("/tasks", (req: cloud.ApiRequest) : cloud.ApiResponse ~> { 
      let ar = new MutArray<Struct>()
      for t in await tasks.list(){
        ar.push(t.to_json())
      }
      
      return cloud.ApiResponse(
        response : ar.to_json(), // Yikes is this possible? maybe we need a JSON equivilant or should I have used something else then MutArray? 
        status: 200
       )
    })

    api.on_post("/task", (req: cloud.ApiRequest, res: cloud.ApiResponse) ~> { 
      // in express you need to use json body parser middleware, and here?  
      let task = Task { title: req.body.title,  completed: req.body.completed } 
      res.response = (await tasks.add()).to_json()
    }

    api.on_delete("/task/:id", (req: cloud.ApiRequest, res: cloud.ApiResponse) ~> { 
      if await tasks.delete(req.parame.id) 
        res.status = 200;
      else
        res.status = 404;
    }

    api.on_put("/task/:id", (req: cloud.ApiRequest, res: cloud.ApiResponse) ~> { 
      // in express you need to use json body parser middleware, and here?  
      let task = Task { title: req.body.title,  completed: req.body.completed } 
      if await tasks.update(req.parame.id, task)
        res.status = 200;
      else
        res.status = 404;
    })

  }
}


resource TODOApp{
  init(){
    new TaskApi(new Tasks())
  }
}


new TODOApp()


```
