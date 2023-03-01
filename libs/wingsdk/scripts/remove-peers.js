// This script removes peer dependency metadata from the .jsii file so that they
// are not included in the dependency closure of the package.
//
// This is done purely for performance reasons -- specifically, so tools trying
// to reflect on the types of the Wing SDK library do not need to look at all of
// its peer dependencies.
//
// This breaks anyone trying to consume the Wing SDK from other languages, but
// is okay in Wing and TypeScript as long as the Wing SDK does reference any
// types from peer dependencies in its public API. 
//
// We may be able to remove this hack by improving the performance of `wingii`
// so that it loads assemblies lazily.

const fs = require("fs");

function hidePeerDependencies() {
  const pkgJson = readJsonSync("package.json");
  const publicPeerDeps = Object.keys(pkgJson.peerDependencies).map((dep) => dep.split("@")[0]);
  const jsiiFile = readJsonSync(".jsii");

  const removePeerDeps = (deps) => Object.fromEntries(
    Object.entries(deps).filter(([key, _value]) =>
      publicPeerDeps.includes(key)
    )
  );

  jsiiFile.dependencies = removePeerDeps(jsiiFile.dependencies);
  jsiiFile.dependencyClosure = removePeerDeps(jsiiFile.dependencyClosure);

  writeJsonSync(".jsii", jsiiFile, { spaces: 2 });
}

function readJsonSync(filename) {
  return JSON.parse(fs.readFileSync(filename));
}

function writeJsonSync(filename, obj, opts) {
  fs.writeFileSync(filename, JSON.stringify(obj, null, opts.spaces));
}

hidePeerDependencies();
