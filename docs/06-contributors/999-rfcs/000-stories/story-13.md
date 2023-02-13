# User Story 13 - Task List with Json and duration

> **Status**: Expected released on 2023/02/16

The following code is an iteration of Wing's task list.
This version of it includes the following functional changes:
- Storing Json instead of a string
- Using duration for estimated effort

Also, it includes some non-functional requirements: 
- The Bucket should be replicated across different regions 
  - +100 if we are able to do the same for azure as well
- Least privileged permissions are granted:
  - Give all permissions unless stated otherwise
  - If the developer explicitly set permissions, give only the stated permissions 
- The code should work on sim, aws, azure
- VScode should help developers with code completion and hover
  - Windows support - vscode extention should work on windows
  - Hover: when you hover over a symbol you get its type information
  - Code Completion: 
    - VScode should complete keywords (for, bring, if...)  in the right context
    - VScode should complete symbols in scope 
    - VScode should complete fields and methods of a object 
    - VScode should complete type annotation after using the :
- Console should be able to show all resources, and interact with them


```ts (wing)
bring cloud;

/**
 * Represents a cloud task list.
 */
resource TaskList {
  /** stores the tasks */
  _bucket: cloud.Bucket;

  /** used to create a global id */
  _counter: cloud.Counter;
  
  init() {
    this._bucket = new cloud.Bucket();
    this._counter = new cloud.Counter();
  }

  /** 
   * Adds a task to the task list.
   * @returns The ID of the new task.
   */
  inflight add_task(title: str): str {
    let id = "${this._counter.inc()}";
    let j = Json { 
      title: title, 
    };
    print("adding task ${id} with data: ${j}"); //j should be printed out nicely 
    this._bucket.put_json(id, j);
    return id;
  }

  /** 
   * Gets a task from the task list.
   * @param id - the id of the task to return
   * @returns the title of the task (optimistic)
   */
  inflight get_task(id: str): Json {
    return this._bucket.get_json(id);
  }

    /** 
   * Removes a task from the list
   * @param id - the id of the task to be removed
   */
  inflight remove_tasks(id: str): str {
    print("removing task ${id}");
    this._bucket.delete(id);
    return id;
  }

   /** 
    * Gets the tasks ids 
    * @returns set of task id
    */
  inflight list_task_ids(): Set<str> {
    let result = MutSet<str> {};
    for id in this._bucket.list() {
      result.add(id);
    }
    return result.copy();
  }

   /** 
    * Find tasks with title that contains a term
    * @param term - the term to search
    * @returns set of task id that matches the term
    */
  inflight find_tasks_with(term: str): Array<str> {
    print("find_tasks_with: ${term}");
    let task_ids = this.list_task_ids();
    print("found ${task_ids.size} tasks");
    let output = MutArray<str>[];
    for id in task_ids {
      let j = this.get_task(id); 
      let title = j.get("title"); // notice that I've decided to create a small baby macro get function that should be removed next sprint
      if title.contains(term) { 
        print("found task ${id} with title \"${title}\" with term \"${term}\"");
        output.push(id);
      }
    }
    
    print("found ${output.len} tasks which match term '${term}'");
    return output.copy();
  }
}

// --------------------------------------------
// testing
// --------------------------------------------
let tasks = new TaskList();

new cloud.Function(inflight (s: str): str => {
  tasks.add_task("clean the dishes");
  let result = tasks.find_tasks_with("clean the dishes");
  assert(result.len == 1);
  let t = tasks.get_task(result.at(0));
  assert("clean the dishes" == str.from_json(t.title));
}) as "test:add, get and find task";

new cloud.Function(inflight (s: str): str => {
  tasks.add_task("clean the dishes");
  tasks.add_task("buy dishwasher soap");
  tasks.remove_tasks(tasks.find_tasks_with("clean the").at(0));
  let result = tasks.find_tasks_with("clean the dish");
  assert(result.len == 0);
}) as "test:add, remove and find task";
```
