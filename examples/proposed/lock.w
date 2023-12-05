bring cloud;

/**
 * A lock that can only be acquired by one inflight at a time.
 *
 * Internally, this uses a cloud.Counter to keep track of a number.
 * If the number is 0, the lock is free. If the number is 1, the lock
 * is acquired.
 *
 * This is a very simple lock, and it has a number of limitations:
  * - It is not reentrant. If a single inflight tries to acquire the lock
  *   twice, it may block forever.
  * - It is not fair. If multiple inflights are waiting to acquire the lock,
  *   there is no guarantee that they will acquire the lock in the order
  *   that they requested it.
  * - It is not stable. If an inflight crashes while holding the lock, the
  *   lock will be permanently stuck in the acquired state.
 */
resource Lock {
  counter: cloud.Counter;
  new() {
    this.counter = new cloud.Counter();
  }

  pub inflight var is_locked: bool;

  inflight new() {
    this.is_locked = false;
  }

  /**
   * Try to acquire the lock. If the lock is already acquired, return false.
   * Otherwise, return true.
   */
  inflight try_lock(): bool {
    // If the lock is already acquired by the current inflight, throw an error.
    if this.is_locked {
      throw "Lock is already acquired by this inflight";
    }

    // The lock is already acquired by another inflight - too bad. :(
    if this.counter.peek() > 0 {
      return false;
    }

    let value = this.counter.inc();
    if value == 1 {
      // We successfully acquired the lock.
      this.is_locked = true;
      return true;
    } else {
      // Someone else acquired the lock between the time we checked and
      // the time we tried to acquire it. Undo our increment.
      this.counter.dec();
      return false;
    }
  }

  /**
   * Acquire the lock. If the lock is already acquired by another inflight,
   * block until it is released.
   */
  inflight lock() {
    // If the lock is already acquired by the current inflight, throw an error.
    if this.is_locked {
      throw "Lock is already acquired by this inflight";
    }

    while !this.try_lock() {
      cloud.sleep(1);
    }
  }

  /**
   * Release the lock. If the lock is not held by this inflight, this is a no-op.
   */
  inflight unlock() {
    if !this.is_locked {
      return;
    }
    this.counter.dec();
  }
}
