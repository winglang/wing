let a: void = nil;
let b: any = 0;
let some_promise = Promise<str>{};
let c = defer some_promise();
let d = await c;
