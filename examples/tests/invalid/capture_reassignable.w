bring cloud;

let var x = 5;

let handler = inflight (m: str): str => {
    log("x: ${x}");
    //          ^ error: cannot capture reassignable variable "x"
};
