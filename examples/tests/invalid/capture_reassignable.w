bring cloud;

let var x = 5;

let handler = inflight (m: str): str => {
    print("x: ${x}");
    //          ^ error: cannot capture reassignable variable "x"
};
