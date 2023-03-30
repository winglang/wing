# User Story 10 - Task List using Inflight Closures

> **Status**: Done

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

let bucket = new cloud.Bucket();
let counter = new cloud.Counter();

/**
 * Adds a task to the task list.
 * @returns The ID of the new task
 */
let add_task = new cloud.Function(inflight (title: str): str => {
  let id = counter.inc();
  log("adding task ${id} with title: ${title}");
  bucket.put("${id}", title);
  return "${id}";
}) as "add_task";
  
/**
 * Gets a task from the task list 
 * @param id - the id of the task to return
 * @returns The ID of the task (optimistic)
 */
let get_task = new cloud.Function(inflight (id: str): str => {
  return bucket.get("${id}");
}) as "get_task";

/**
 * Delete a task from the task like
 * @param id - the id of the task to return
 * @returns The ID of the task deleted (optimistic)
 */
let delete_task = new cloud.Function(inflight (id: str): str => {
  bucket.delete("${id}");
  return id;
}) as "delete_task";

/**
 * Find a task from the task list by title
 * @param title - the title of the task to look for
 * @returns The ID of the task found (optimistic)
 */
let find_task = new cloud.Function(inflight (title: str): str => {
  for id in bucket.list() {
    let content = get_task.invoke(id);
    log("Found task #${id} with '${content}'");
    if title == content {
      return id;
    }
  }
  return "NOT FOUND";
}) as "find_task";


// ---------------- Tests Section ---------------- 
new cloud.Function(inflight (s: str): str => {
    let counter_value = counter.inc(0);
    let expected = "${counter_value}";
    let id = add_task.invoke("Add inflight resource functions");
    log("added new task with id ${id}");
    assert(expected == id);
}) as "test: add a new task";

new cloud.Function(inflight (s: str): str => {
    let expected = "task 42";
    let id = add_task.invoke(expected);
    log("added new task with id ${id}");
    let content = get_task.invoke(id);
    log("The content that was added as task #${id} is '${content}'");
    assert(content == expected);
}) as "test: get a task";

new cloud.Function(inflight (s: str): str => {
  for id in bucket.list() {
    delete_task.invoke(id); 
  }
  let bucket_size = bucket.list().length;
  log("bucket_size is ${bucket_size}");
  assert(0 == bucket_size);
}) as "test: delete all tasks";


new cloud.Function(inflight (s: str): str => {
  log("------ test: find ------");
  let value = counter.inc(0);
  log("Initial counter is #${value}");
  add_task.invoke("counter(${value}) counter"); 
  add_task.invoke("counter(${value}) + 1");
  add_task.invoke("counter(${value}) + 2");
  add_task.invoke("counter(${value}) + 3");
  add_task.invoke("counter(${value}) + 4");
  log("------ Running Find ------");
  let id = find_task.invoke("counter(${value}) + 2");
  let expected = "${value + 2}"; 
  log("found task with id ${id} (expected ${value + 2})");
  assert(id == expected);
}) as "test: find task by content";
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
