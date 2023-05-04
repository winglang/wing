bring cloud;

let queue = new cloud.Queue();

let handler = inflight (body: str): str => {
    let i = 0;
    let iterator = inflight (j: num): num => {
        return j+1;
    };
    while iterator(i) < 3 {
        log("${i}");
    }
};

queue.add_consumer(handler);
