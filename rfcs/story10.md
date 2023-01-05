# User Story 10 - Task List using Inflight Closures

It is an early morning in the heart of Tel Aviv, a CEO wakes up and heads out to WayCup, his favorite coffee shop.

He starts his day going over his emails, slack messages, updates from github, etc... But he is struggling. There are
so many things he needs to do, such little time. What would he do? How will he manage all his tasks?

Well... Luckily, he is also an app developer, and when you are a developer everything can be solved with... a new app!

So he spins up VSCode with a file called `task-list.w` and starts writing code in a his new favorite
programming language, Wing!

> Your mission, if you choose to accept it, is to implement the needed pieces of the Wing compile
> for the first iteration of the task list app. This step includes a custom Wing resource that
> represents the task list, and offers an inflight API for editing the list.

```js
bring cloud;

/** stores the tasks */
let bucket = new cloud.Bucket();

/** used to create a global id */
let counter = new cloud.Counter();

/** 
 * Adds a task to the task list.
 * @returns The ID of the new task.
 */
let add_task = new cloud.Function(inflight (title: str): str => {
  let id = "${counter.inc()}";
  print("adding task ${id} with title: ${title}");
  bucket.put(id, title);
  return id;
});

/** 
 * Gets a task from the task list.
 * @param id - the id of the task to return
 * @returns the title of the task (optimistic)
 */
let get_task = new cloud.Function(inflight (id: str): str => {
  return bucket.get(id);
});

/** 
 * Removes a task from the list
 * @throws Will throw an error if taks with id doesn't exist
 * @param id - the id of the task to be removed
 */
let remove_task = new cloud.Function(inflight (id: str):str => {
  print("removing task ${id}");
  bucket.delete(id);
  return "";
});

/** 
* Gets the tasks ids 
* @returns set of task id
*/
let list_task_ids = new cloud.Function(inflight (_: str): Set<str> => { // TODO cloud.Function requires (s:str) => str
  return bucket.list(); 
});

/** 
* Find tasks with title that contains a term
* @param term - the term to search
* @returns set of task id that matches the term
*/
let find_tasks_with = new cloud.Function(inflight (term: str): Set<str> => { // TODO cloud.Function requires (s:str) => str
  print("find_tasks_with: ${term}");
  let task_ids = list_task_ids.invoke("");
  print("found ${task_ids} tasks");
  let output = new MutSet<str>();
  for id in task_ids {
    let title = get_task.invoke(id);
    if title.contains(term) {
      print("found task ${id} with title \"${title}\" with term \"${term}\"");
      output.add(id);
    }
  }

  print("found ${output.len} tasks which match term '${term}'");
  return output.freeze();
});

// --------------------------------------------
// testing
// --------------------------------------------

let clear_tasks = new cloud.Function(inflight (s: str): str => {
 let results = new MutArray<str>(list_task_ids());
  
  while (results.len > 0) {
    let t = results.pop();
    remove_task.invoke(t);
  }
}) as "utility:clear tasks";

let add_tasks = new cloud.Function(inflight (s: str): str => {
  add_task.invoke("clean the dishes");
  add_task.invoke("buy dishwasher soap");
  add_task.invoke("organize the dishes");
  add_task.invoke("clean the toilet");
  add_task.invoke("clean the kitchen");
}) as "utility:add tasks";

new cloud.Function(inflight (s: str): str => {
  clear_tasks.invoke("");
  add_tasks.invoke("");
  let result = find_tasks_with.invoke("clean the dish");
  assert(result.len == 1);
  assert("clean the dishes".equals(get_task.invoke(result.at(0))));
}) as "test:get and find task";

new cloud.Function(inflight (s: str): str => {
  clear_tasks.invoke("");
  add_tasks.invoke("");
  remove_task.invoke(find_tasks_with.invoke("clean the dish").at(0))
  let result = find_tasks_with.invoke("clean the dish");
  assert(result.len == 0);
}) as "test:get, remove and find task";

new cloud.Function(inflight (s: str): str => {
  clear_tasks.invoke("");
  try {
    remove_task.invoke("fake-id"); // should throw an exception
    assert(false); // this code should not be reachable 
  } catch (e) {
    assert(true); // redundant, keeping it here to show the intent of the code
  }
}) as "test: deleting an unexisting task should throw an exception";
```

## Wing Console

During the development process of the task list app, our CEO uses Wing Console to test the application locally.

After creating the `task-list.w` file he starts Wing Console by running the following command and continues to 
develop the application side by side with the console:

```sh
wing it ./task-list.w
``` 

While **Wing Console** is running in the background, it watches the .w file src dir for changes, 
recompile the application and updates the view in real time.

In the Console, the developer can see the  bucket, the counter and the functions as resources. The developer can activate the functions and see the how the bucket files are created and the counter is incremented, the console also presents the logs

Next to the `TaskList` resource (at the root of the app), we can see the testing `cloud.Function` and
by clicking on the functions, tests are executed and logs and events appear in the event view.
He also sees the bucket fills up with tasks as he iterates.
