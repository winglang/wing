# TODO Application Compiler epic


It is an early morning in the heart of Tel Aviv, a CEO wakes up and heads out to waycup, his favorite coffee shop. 
He starts his day going over his emails, slack messages, his CLI based TODO app, updates from github, etc... 
But this story is not about that CEO, nor it is about that day. 
This story is about the compiler behind that TODO app, and the team that implemented the compiler features that were used in order to develop that TODO app.

Your mission, if you choose to accept it, is to implement the following code that creates an API-less, bucket backed, single tenant TODO app for sim and aws. The main focus of this code is only compiler capabilities that are required for the TODO app.

```js
bring cloud;

resource TaskList {
  _bucket: cloud.Bucket;
  _counter: cloud.Counter;

  init() {
    this._bucket = new cloud.Bucket();
    this._counter = new cloud.Counter();
  }

  /** 
   * Adds a task to the task list.
   * @returns The ID of the new task.
   */
  ~ add_task(title: str): str {
    let id = "${this._counter.inc()}";
    this._bucket.put(id, title);
    return id;
  }

  /** 
   * Gets a task from the task list.
   * @param id - the id of the task to return
   * @returns the title of the task (optimistic)
   */
  ~ get_task(id: str): str {
    return this._bucket.get(id);
  }

  /** 
   * Removes a task from the list
   * @throws Will throw an error if taks with id doesn't exist
   * @param id - the id of the task to be removed
   */
  ~ remove_task(id: str) {
    let content = this._bucket.get(id)
    if !content {
      throw("Task with id ${id} doesn't exist");
    }
    this._bucket.delete(id);
  }

   /** 
   * Gets the tasks ids 
   * @returns set of task id
   */
  ~ list_task_ids(): Set<str> {
    return this._bucket.list();
  }

   /** 
   * Find tasks with title that contains a term
   * @param term - the term to search
   * @returns set of task id that matches the term
   */
  ~ find_tasks_with(term: str): Set<str> {
    let result = this.list_task_ids();
    let output = new MutSet<str>();
    for id in result {
      // TODO: how can we make this concurrent?
      let title = this.get_task(id);
      if title.contains(term) {
        output.add(id)
      }
    }
    return output.to_set()
  }
}

let tasks = new TaskList();

let clear_tasks = new cloud.Function((s: str): str ~> {
  let results = tasks.list_task_ids();
  let i = 0;
  // I hate this code, but wanted to use while here
  while (i < results.len){
    tasks.remove_task(results.at(i++)) 
  }
}) as "utility:clear tasks"

let add_tasks = new cloud.Function((s: str): str ~> {
  tasks.add_task("clean the dishes");
  tasks.add_task("buy dishwasher soap");
  tasks.add_task("organize the dishes");
  tasks.add_task("clean the toilet");
  tasks.add_task("clean the kitchen");
}) as "utility:add tasks";

new cloud.Function((s: str): str ~> {
  clear_tasks.invoke();
  add_tasks.invoke();
  let result = tasks.find_tasks_with("clean the dish");
  assert(result.len == 1);
  assert("clean the dishes" == tasks.get_task(result.at(0)));
}) as "test:get and find task";

new cloud.Function((s: str): str ~> {
  clear_tasks.invoke();
  add_tasks.invoke();
  tasks.remove_tasks(tasks.find_tasks_with("clean the dish").at(0))
  let result = tasks.find_tasks_with("clean the dish");
  assert(result.len == 0);
  assert("clean the dishes" == tasks.get_task());
}) as "test:get, remove and find task";

new cloud.Function((s: str): str ~> {
  clear_tasks.invoke();
  try {
    tasks.remove_tasks("fake-id"); // should throw an exception
    assert(false); // this code should not be reachable 
  } catch (e) {
    assert(true); // redundant, keeping it here to show the intent of the code
  }
}) as "test: deleting an unexisting task should throw an exception";
```
