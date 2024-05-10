// TODO: uncomment test with https://github.com/winglang/wing/issues/1306

// bring cloud;

// let b = new cloud.Bucket();
// let q = new cloud.Queue();

// let service = new cloud.Service(
//   on_start: inflight () => {
//     log("Service started!");
//     b.put("file.txt", "Hello, world!");
//     q.push("Some junk message");
    
//   },
//   on_stop: inflight () => {
//     b.delete("file.txt");
//     q.purge();
//     log("Service stopped!");
//   }
// );

// new cloud.Function(inflight() => {
//   service.stop();
// }) as "Stop service";

// new cloud.Function(inflight() => {
//   service.start();
// }) as "Start service";