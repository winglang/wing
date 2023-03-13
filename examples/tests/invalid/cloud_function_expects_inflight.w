bring cloud;

new cloud.Function((name: str): str => {
    return "Hello ${name}";
});
// ^ Expected type to be "inflight (any): any", but got "preflight (str): str" instead
