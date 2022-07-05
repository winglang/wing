use cloud
x := 5s
bucket := cloud::Bucket()
//bucket.upload("myfile", "somedata")

my_queue := cloud::Queue(timeout: 10m)

proc worker() {
  console.log("hello, world")
  bucket->upload("myfile/hello.txt", "boom boom")
}

handler := cloud::Function(worker)

// TODO: we need to case-convert from underscore to camelCase as we call into JSII modules
my_queue.addWorker(handler)
