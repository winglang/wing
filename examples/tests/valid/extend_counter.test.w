bring cloud;
bring util;
bring expect;

let greeting = "yo";

class MyCounter extends cloud.Counter {
  pub field1: num;
  new() {
    this.field1 = 5;
  }

  pub inflight inc() {
    log("{this.field1}");
    log(greeting);
    super.inc();
  }
}

class MySuperCounter extends MyCounter {
  pub field2: num;
  new() {
    this.field2 = 10;
  }

  pub inflight inc() {
    log("{this.field2}");
    super.inc();
  }
}

let c = new MySuperCounter();

// test "counter works" {
//   c.inc();
//   expect.equal(c.peek(), 1);
// }
