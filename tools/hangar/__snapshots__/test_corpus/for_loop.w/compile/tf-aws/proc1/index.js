async handle(event) {
  const {  } = this;
  for (const x of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,10,false)) {
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 10)'`)})((x > 10))};
    {console.log(`${x}`)};
  }
}
