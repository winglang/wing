async handle() {
  const { s1, s2 } = this;
  {console.log(`index of \"s\" in s1 is ${s1.indexOf("s")}`)};
  {console.log((await (await s1.split(" ")).at(1)))};
  {console.log((await s1.concat(s2)))};
}
