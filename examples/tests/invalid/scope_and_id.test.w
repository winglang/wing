// Verify correct type for preflight class's scope and id
class PreflightClass {}

let x = 1;

new PreflightClass() as x;
                      //^ Expected type to be "str", but got "num" instead
new PreflightClass() in x;
                      //^ Expected scope to be a preflight object, instead found "num"

// Verify can't instantiate an inflight class with scope and id
let pc = new PreflightClass();
inflight class InflightClass {}
inflight () => {
  new InflightClass() as "hi";
                       //^ Inflight classes cannot have an id
  new InflightClass() in pc;
                        //^ Inflight classes cannot have a scope
};