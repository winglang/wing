async handle() {
  const { b } = this;
  (await b.put("foo","text"));
  (await b.put("foo/","text"));
  (await b.put("foo/bar","text"));
  (await b.put("foo/bar/","text"));
  (await b.put("foo/bar/baz","text"));
  const objs = (await b.list());
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await objs.at(0)) === "foo")'`)})(((await objs.at(0)) === "foo"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await objs.at(1)) === "foo/")'`)})(((await objs.at(1)) === "foo/"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await objs.at(2)) === "foo/bar")'`)})(((await objs.at(2)) === "foo/bar"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await objs.at(3)) === "foo/bar/")'`)})(((await objs.at(3)) === "foo/bar/"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await objs.at(4)) === "foo/bar/baz")'`)})(((await objs.at(4)) === "foo/bar/baz"))};
}
