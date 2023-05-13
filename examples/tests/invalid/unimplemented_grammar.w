let a: void = nil;
let b: any = 0;
let somePromise = Promise<str>{};
let c = defer somePromise();
let d = await c;
