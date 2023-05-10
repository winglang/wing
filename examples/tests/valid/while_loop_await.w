bring cloud;

let queue = new cloud.Queue();

let iterator = inflight (j: num): num => {
    return j+1;
};

let handler = inflight (body: str): str => {
    let i = 0;
    while iterator(i) < 3 {
        log("${i}");
    }
};

queue.addConsumer(handler);
