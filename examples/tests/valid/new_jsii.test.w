// verifies that `new CustomScope()` is only
// executed once when passed as a custom scope

bring cloud;

let var count = 0;

class CustomScope {
  new() {
    count += 1;
  }
}

new cloud.Bucket() in new CustomScope();
assert(count == 1);