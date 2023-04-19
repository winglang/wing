async handle(s) {
  const { my_bool, my_dur, my_num, my_second_bool, my_str } = this;
  {console.log(my_str)};
  const n = my_num;
  {console.log(`${n}`)};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(my_second_bool === false)'`)})((my_second_bool === false))};
  if (my_bool) {
    {console.log("bool=true")};
  }
  else {
    {console.log("bool=false")};
  }
  const min = my_dur.minutes;
  const sec = my_dur.seconds;
  const hr = my_dur.hours;
  const split = (await `min=${min} sec=${sec} hr=${hr}`.split(" "));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(split.length === 3)'`)})((split.length === 3))};
}
