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
    print("adding task ${id} with title: ${title}");
    this._bucket.put(id, title);
    return id;
  }

  /** 
   * Gets a task from the task list.
   * @param id - the id of the task to return
   * @returns the title of the task (optimistic)
   */
  inflight get_task(id: str): str {
    return this._bucket.get(id);
  }

  /** 
   * Removes a task from the list
   * @throws Will throw an error if taks with id doesn't exist
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
      let title = this.get_task(id); 
      if title.contains(term) { 
        print("found task ${id} with title \"${title}\" with term \"${term}\"");
        output.push(id);
      }
    }
    
    print("found ${output.length} tasks which match term '${term}'");
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
  assert(result.length == 1);
  assert("clean the dishes" == tasks.get_task(result.at(0)));
}) as "test: get and find task";


new cloud.Function(inflight (s: str): str => {
  tasks.add_task("clean the dishes");
  tasks.add_task("buy dishwasher soap");
  tasks.remove_tasks(tasks.find_tasks_with("clean the").at(0));
  let result = tasks.find_tasks_with("clean the dish");
  assert(result.length == 0);
}) as "test: get, remove and find task";