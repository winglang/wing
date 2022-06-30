use cloud
x := 5s
bucket := cloud::Bucket()
bucket.upload("myfile", "somedata")

my_queue := cloud::Queue(timeout: 10m)

proc worker() {
  console.log("hello, world")
  bucket->upload("myfile/hello.txt", "boom boom")
}


my_queue.add_worker(worker)
