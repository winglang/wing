use cloud
x := 5s
bucket := cloud::Bucket()

// bucket.upload("myfile", "somedata")

my_queue := new cloud::Queue(timeout: 30m);
my_queue.hello();

inflight function worker() {
  console.log("hello, world");
  bucket.upload("myfile/hello.txt", "boom boom");
}

handler := new cloud::Function(worker);

// TODO: we need to case-convert from underscore to camelCase as we call into JSII modules
my_queue.addWorker(handler);
