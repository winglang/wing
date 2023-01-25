bring cloud;

struct CountingSemaphoreProps {
  availableResources: num;
}

resource CountingSemaphore {
  public limit: num;
  _counter: cloud.Counter;

  // wish: ttl
  init(props: CountingSemaphoreProps) {
    // pseudocode: input validation
    this.limit = props.availableResources;
    this._counter = new cloud.Counter();
  }

  // some stable unique instance id is wanted in the inflight context
  // so that a reousce instance can be properly claimed and later released
  // when used in conjunction with a key-value store =
  inflight try_acquire(): bool {
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
  inflight release() {
    if this._counter.peek() <= 0 {
      return;
    }

    this._counter.dec();
  }

  inflight is_at_capacity(): bool {
    return this._counter.peek() >= this.limit;
  }
}