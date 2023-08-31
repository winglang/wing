bring cloud;

struct CountingSemaphoreProps {
  availableResources: num;
}

resource CountingSemaphore {
  public limit: num;
  _counter: cloud.Counter;

  // need some ttl solution here,
  // probably in-house once replaced with a key-value store
  init(props: CountingSemaphoreProps) {
    // pseudocode: input validation
    this.limit = props.availableResources;
    this._counter = new cloud.Counter();
  }

  // some stable unique instance id is wanted in the inflight context
  // so that a resource instance can be properly claimed and later released
  // when used in conjunction with a key-value store
  public inflight try_acquire(): bool {
    if this.is_at_capacity() {
      return false;
    }

    let post_acquired_capacity = this._counter.inc();
    if post_acquired_capacity <= this.limit {
      return true;
    }
    this.release();
    return false;
  }

  // probably key-value store is wanted,
  // so that a specific resource instance can be released
  // rather than naively releasing a count
  public inflight release() {
    if this._counter.peek() <= 0 {
      return;
    }

    this._counter.dec();
  }

  public inflight is_at_capacity(): bool {
    return this._counter.peek() >= this.limit;
  }
}

let resource_1 = new CountingSemaphore({ availableResources: 2 });
let resource_2 = new CountingSemaphore({ availableResources: 3 });

let queue = new cloud.Queue();
/**
 * An example handler to work with two shared resources.
 */
queue.add_consumer(inflight (message: str) => {
  let is_resource_1_acquired = resource_1.try_acquire();
  if !is_resource_1_acquired {
    // brutally error out to re-enqueue
    throw "Failed to acquire resource 1";
  }
  let is_resource_2_acquired = resource_2.try_acquire();
  if !is_resource_2_acquired {
    resource_1.release();
    // brutally error out to re-enqueue
    throw "Failed to acquire resource 2";
  }

  // real work
  log("all resources are acquired, processing message: ${message}");

  resource_1.release();
  resource_2.release();
});
