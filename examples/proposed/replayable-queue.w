bring cloud;

/** 
 * A queue that can replay all messages 
 */
resource ReplayableQueue {
  queue: cloud.Queue;
  bucket: cloud.Bucket; 
  counter: cloud.Counter;
  
  init() {
    this.queue = new cloud.Queue();
    this.bucket = new cloud.Bucket();
    this.counter = new cloud.Counter();
  }

  on_message(fn: inflight (str): str){
    this.queue.on_message(fn);
  }
  
  inflight push(m: str) {
    this.queue.push(m);
    this.bucket.put("messages/${this.counter.inc()}", m);
  }
  
  inflight replay(){
    for i in this.bucket.list() {
      this.queue.push(this.bucket.get(i));
    }
  }
}


// how to use the queue
resource RemoteControl { 
  init(q: ReplayableQueue){
    let f = inflight (m: str): str => {
      print("on_message got triggered with ${m}");
    };
      
    q.on_message(f);
    
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
