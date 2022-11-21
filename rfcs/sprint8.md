# Sprint 8


It is an early morning in the heart of Tel Aviv, a CEO wakes up and heads out to waycup, his favorite coffee shop. 
He starts his day going over his emails, slack messages, his CLI based TODO app, updates from github, etc… 
But this story is not about that CEO, nor it is about that day. 
This story is about that TODO app, and the team that created it using a completely new language in just 2 weeks.

You mission, if you choose to accept it, is to implement this the following single tennant TODO app for sim and for aws:

```js

bring cloud;
bring util;


struct Task {
  title: str;
  completed: bool;
}

struct TaskItem extends Task {
  id: str;
}


// could have been a wonderful CRUD<Task> if we had generics
resource Tasks {
  _bucket: cloud.Bucket

  init(){ 
    this._bucket = new cloud.Bucket()
  }

  async public ~list(): TaskItem[] {
    let files =  await this._bucket.list()
    let mutArray = new MutArray<TaskItem>()
    for f in files {
      let id = f.name // Maybe this should be called file_name? (name vs full_path vs base_name)
      let data = await this._bucket.get(id) // does this return byteAttay?, maybe just an interface with toString(<encoding>) for now
      let s = data.to_string('utf-8');
      let j = util.json.parse(s); //optimistic 
      mutArray.push(TaskItem {id: id, title:j.title, completed: j.completed })
    }
    return mutArray.to_array()
  }
  
  async public ~add(task: Task): TaskItem {
    let id = util.uuid() // :str
    await this.update(id, task);
    return {TaskItem { id:id, task }}
  }
  
  async public ~update(id: str, task: Task): boolean {
    if !(await this._bucket.get(id))
      return false;
    let j = task.to_string() // equivilant to JSON.stringify(j) on Task
    await this._bucket.put(id, s) 
    return true;
  }
  
  async public ~delete(id: str): boolean {
    let response =  await this._bucket.delete(id)
    return response.status == 200 
  }
}


resource TaskApi{ 
  init(tasks: Tasks){
    this._api = new cloud.Api();
  
    // we can also create use the (req,res):void tuple convention, 
    // I used the (req):res here and on the other I used the (req, res), we need to decide
    // TODO decide which API should we have
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
