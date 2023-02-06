# User Story 13 - Task List with uuid, Json and duration

> **Status**: Expected released on 2023/02/16

The following code is an iteration of Wing's task list.
This version of it includes the following functional changes:
- Using npm's uuid package inflight instead of the counter resource 
- Storing Json instead of a string
- Using duration for estimated effort

Also, it includes some non-functional requirements: 
- The Bucket should be replicated across different regions 
  - +100 if we are able to do the same for azure as well
- Least privileged permissions are granted
- The code should work on sim, aws, azure
- VScode should be able to autocomplete 
- Console should be able to show all resources, and interact with them



```ts (wing)
bring cloud;
// need to run: npm install uuid --save
bring uuid;

/**
 * Represents a cloud task list.
 */
resource TaskList {
  /** stores the tasks */
  _bucket: cloud.Bucket;
  
  init() {
    this._bucket = new cloud.Bucket();
  }

  /** 
   * Adds a task to the task list.
   * @returns The ID of the new task.
   */
  inflight add_task(title: str): str {
    let id = uuid.Uuid.v4();
    let j = Json { 
      title: title, 
    };
    print("adding task ${id} with data: ${j}"); //j should be printed out nicely 
    this._bucket.put(id, j.to_str());
    return id;
  }

  /** 
   * Gets a task from the task list.
   * @param id - the id of the task to return
   * @returns the title of the task (optimistic)
   */
  inflight get_task(id: str): Json {
    let blob = this._bucket.get(id);
    return Json.parse(blob);
  }

  /** 
   * Sets effort estimation on a test
   * @param id - the id of the task to return
   * @param effort_estimation - the time (duration) estimated for this task
   * @returns The ID of the existing task.
   */
  inflight add_estimation(id: str, effort_estimation: duration): str {
    let j = this.get_task(id).to_mut();
    j.set("effort_estimation", effort_estimation);
    this._bucket.put(id, j.to_str());
    return id;
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
    return result.to_immut();
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
    let output = MutArray<str>[];// #1172
    for id in task_ids {
      let j = this.get_task(id); 
      let title = Str.from_json(j.get("title"));
      if title.contains(term) { 
        print("found task ${id} with title \"${title}\" with term \"${term}\"");
        output.push(id);
      }
    }
    
    print("found ${output.len} tasks which match term '${term}'");
    return output.to_immut();
  }
}

// --------------------------------------------
// testing
// --------------------------------------------

resource Test {
  tasks: TaskList; 
  _test: inflight (Test): void;

  inflight before() {
    for id in this.tasks.list_task_ids() {
      this.tasks.remove_tasks(id);
    }
  }

  init(name: str, test: inflight (Test): void) {
    this.tasks = new TaskList();
    this._test = test;
    new cloud.Function({
      this.before();
      this._test(this);
    }) as "test:${name}";
  }
}

new Test("get and find task", inflight (t: Test) => {
  t.tasks.add_task("clean the dishes");
  let result = t.tasks.find_tasks_with("clean the dishes");
  assert(result.len == 1);
  let t = t.tasks.get_task(result.at(0));
  assert("clean the dishes" == Str.from_json(t.get("title")));
}) as "a1";

new Test("get, remove and find task", inflight (t: Test) => {
  t.tasks.add_task("clean the dishes");
  t.tasks.add_task("buy dishwasher soap");
  t.tasks.remove_tasks(tasks.find_tasks_with("clean the").at(0));
  let result = t.tasks.find_tasks_with("clean the dish");
  assert(result.len == 0);
}) as "a2";

new Test("effort_estimation", inflight (t: Test) => {
  let id = t.tasks.add_task("clean the dishes");
  let var j = t.tasks.get_task(id);
  assert(!j.get("effort_estimation")); //  make sure effort estimation default nil
  task.add_estimation(id, 4h);
  j = t.tasks.get_task(id);
  assert(4h == j.get("effort_estimation"));
}) as "a3";

```