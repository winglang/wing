bring cloud;

let bucket = new cloud.Bucket();
let counter = new cloud.Counter();

/**
 * Adds a task to the task list.
 * @returns The ID of the new task
 */
let add_task = new cloud.Function(inflight (title: str): str => {
  let id = counter.inc();
  print("adding task ${id} with title: ${title}");
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
    print("Found task #${id} with '${content}'");
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
    print("added new task with id ${id}");
    assert(expected == id);
}) as "test: add a new task";

new cloud.Function(inflight (s: str): str => {
    let expected = "task 42";
    let id = add_task.invoke(expected);
    print("added new task with id ${id}");
    let content = get_task.invoke(id);
    print("The content that was added as task #${id} is '${content}'");
    assert(content == expected);
}) as "test: get a task";