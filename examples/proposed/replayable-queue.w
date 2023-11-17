bring cloud;

/** 
 * A queue that can replay all messages 
 */
class ReplayableQueue {
  queue: cloud.Queue;
  bucket: cloud.Bucket; 
  counter: cloud.Counter;
  
  new() {
    this.queue = new cloud.Queue();
    this.bucket = new cloud.Bucket();
    this.counter = new cloud.Counter();
  }

  setConsumer(fn: inflight (str): str){
    this.queue.setConsumer(fn);
  }
  
  inflight push(m: str) {
    this.queue.push(m);
    this.bucket.put("messages/{this.counter.inc()}", m);
  }
  
  inflight replay(){
    for i in this.bucket.list() {
      this.queue.push(this.bucket.get(i));
    }
  }
}


// how to use the queue
class RemoteControl { 
  new(q: ReplayableQueue){
    let f = inflight (m: str): str => {
      log("setConsumer got triggered with {m}");
    };
      
    q.setConsumer(f);
    
    new cloud.Function(inflight (m: str) => {
      q.push(m);
    }) as "push";
        
    new cloud.Function(inflight () => {
      q.replay();
    }) as "replay";
  }
}

let q = new ReplayableQueue();
new RemoteControl(q);

// Exercises for the curious reader:
// - Add some time retention for keeping messages
// - Add some max messages to keep property
// - Make sure that messages are replayed in order (currenlty it relies on the bucket.list() order) 
