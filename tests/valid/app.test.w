/*\
args:
  - --rootId
  - root
\*/

bring expect;

expect.equal(@app.workdir.contains(".wing"), true);

let path = nodeof(@app).path;

for c in nodeof(@app).children {
  log(nodeof(c).path);
}

expect.notNil(nodeof(@app));
expect.equal(nodeof(@app).path.split("/").at(0), "root");
