bring cloud;

resource Utils {
  extern "./helpers.js" static inflight uuid(): str;
  extern "./helpers.js" static inflight sleep(ms: num): void;
}

/**
 * A resource that allows you to run background tasks asynchronously,
 * and check their status at any point in time.
 *
 * The function of the background task must be passed to the
 * constructor so that its code and permissions can be deployed to
 * the cloud when the TaskManager is created.
 */
resource TaskManager {
  fn: cloud.Function;
  state: cloud.Bucket;

  init(handler: inflight (str): void) {
    this.bucket = new cloud.Bucket();

    let wrapper = inflight (id: str, input: str) => {
      try {
        let result = handler.invoke(input);
        this.bucket.put("${id}/status", "done");
        this.bucket.put("${id}/result", result);
      } catch e {
        this.bucket.put("${id}/status", "failed");
        this.bucket.put("${id}/result", e);
      }
    };

    this.fn = new cloud.Function(wrapper);
  }

  /**
   * Starts a background task with the given input, and returns an id
   * that can be used to check the status of the task.
   */
  inflight start(input: str) {
    let id = Utils.uuid();
    this.fn.invoke_async(id, input);
    this.bucket.put("${id}/status", "pending");
  }

  /**
   * Returns the status of the background task with the given id.
   * If the task is still running, this will return "pending".
   * If the task has completed, this will return "done".
   * If the task has failed, this will return "failed".
   */
  inflight check(id: str): str {
    try {
      return this.bucket.get("${id}/status");
    } catch e {
      throw "no such key: ${id}";
    }
  }

  /**
   * Returns the result of the background task with the given id.
   */
  inflight get_result(id: str): str {
    try {
      return this.bucket.get("${id}/result");
    } catch e {
      throw "no such id: ${id}";
    }
  }

  /**
   * Returns a list of all running tasks.
   */
  inflight list_running_tasks(): Array<str> {
    let keys = this.bucket.list();
    let running = MutArray<str>[];
    for key in keys {
      if key.ends_with("/status") && this.bucket.get(key) == "pending" {
        running.push(id.split("/")[0]);
      }
    }
    return running.copy();
  }
}

let import_contacts = new TaskManager(inflight (input: str) => {
  // pretend to do some work
  Utils.sleep(5s);
  log(input);
});

// Tests

test "import_contacts_work" {
  let key = import_contacts.start("hello");
  Utils.sleep(1s);
  assert(import_contacts.check(key) == "pending");
  Utils.sleep(5s);
  assert(import_contacts.check(key) == "done");
  assert(import_contacts.get_result(key) == "hello");
}

// Exercises for the curious reader:
// - Add a timeout to the background task.
// - Add a way to cancel a background task.
// - Add a way to configure the number of retries.
// - Return a Task object from start() that can be used to check the status of the task.
