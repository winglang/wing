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
  completed: bool = false // do we have defaults? 
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
     /* META comment on this._bucket.list() API
      *   assuming we want to return content and not response and then get files from response.body
      *   But, I am pretty sure this will not hold water, cause there will be situations where we get and empty list 
      *   and we want to know why the list is empty:
      *   - There is no bucket
      *   - There is no permissions to read the bucket (the SDK need to include API for no permisssions scenarios  )
      *   - There are no files
      **/
    let files =  await this._bucket.list()  //  :Files[] ?
    let mutArray = new MutArray<TaskItem>()
    for f in files {
      // Maybe this should be called file_name? (name vs full_path vs base_name)
      let id = f.name 
      // does this return byteAttay?, or simply for now  just an interface with to_string(<encoding>)
      let data = await this._bucket.get(id) 
      let s = data.to_string('utf-8');
      let j = util.json.parse(s); //optimistic 
      mutArray.push(TaskItem {id: id, title:j.title, completed: j.completed })
    }
    return mutArray.to_array()
  }
  
  async public ~add(task: Task): TaskItem {
    let id = util.uuid(); // :str
    await this.save();
    return {TaskItem { id:id, task }}
  }
  async private save(id: str, task: Task){
    let j = task.to_string() // equivilant to JSON.stringify(j) on Task
    await this._bucket.put(id, s) 
  }
  async public ~update(id: str, task: Task): boolean {
    /* META comment on this._bucket.get(id)
     *  assuming we get a null if the file doesn't exists, but I think it is not good enough because there are differnt
     *  type of resposnse for a file to not exists:
     *    404 - we know it does not exists
     *    403 - we don't know if it does not exists because we don't have permissions to know :) 
     **/
    if !(await this._bucket.get(id)) 
      return false;
    await this.save()
    return true;
  }
  
  async public ~delete(id: str): boolean {
    let response =  await this._bucket.delete(id)
    return response.status == 200 
  }
}


resource TaskApi{ 
  init(tasks: Tasks){
    this._api = new cloud.ApiGateway();
  
    /* META comment on api.on_get("/tasks", (req: cloud.ApiRequest) : cloud.ApiResponse  
     *  we can also create use the (req,res):void tuple convention, instead of the (req):res one 
     *  I used the (req):res here and on the other I used the (req, res), we need to decide
     *  
     **/
    //TODO decide which API should we have
    api.on_get("/tasks", (req: cloud.ApiRequest) : cloud.ApiResponse ~> { 
      let ar = new MutArray<TaskItem>()
      for t in await tasks.list(){
        ar.push(t)
      }
      let taskList = arr.to_array(); // generics in action MutArray<T>.to_array(): T[]
      
      return cloud.ApiResponse(
        /* Meta comment on taskList.stringify() (vs taskList.to_string())
         * Initially I used to_string here, but I feel that it is not the appropriate function to use, 
         * in Java it is considered a bad practive to rely on toString api 
         * for something that is not debugging, because it can be overriden for debugging purposes 
         **/ 
        response : taskList.stringify()),
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
      let struct = req.body
      let task = Task { title: struct.title,  completed: struct.completed } 
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
