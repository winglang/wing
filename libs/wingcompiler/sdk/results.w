bring cloud;

pub struct CheckResult {
  /** a unique id of the check */
  checkid: str;

  /** the construct path of the check */
  checkpath: str;

  /** timestamp the check was run */
  timestamp: str;

  /** true if the test was successful */
  ok: bool;

  /** error message if the test failed */
  error: str?;
}

/** Centralized storage for check results */
pub class Results {
  pub static of(scope: std.IResource): Results {
    let var root = std.Node.of(scope).root;
    let rootNode = std.Node.of(root);

    // special case where the root is an app with a test runner (which means we are running inside a test context)
    // in this case our app is actually the child called "Default". yes this is horribly hacky.
    // help! https://github.com/winglang/wing/issues/513
    if rootNode.tryFindChild("cloud.TestRunner") != nil {
      if let defaultChild = rootNode.defaultChild {
        root = unsafeCast(defaultChild);
      }
    }

    let id = "checks.Results";
    let exists: Results? = unsafeCast(std.Node.of(root).tryFindChild(id));
    let rootAsResource: Results = unsafeCast(root);
    return exists ?? new Results() as id in rootAsResource;
  }

  bucket: cloud.Bucket;

  new() {
    this.bucket = new cloud.Bucket() as "results";
  }

  pub inflight store(result: CheckResult) {
    let checkid = result.checkid;
    let body = Json.stringify(result);
    let key = this.makeLatestKey(checkid);
    log("storing {key}");
    this.bucket.putJson(key, result);
    this.bucket.putJson(this.makeKey(checkid, "{result.timestamp}.json"), result);
  }

  pub inflight latest(checkid: str): CheckResult? {
    let key = this.makeLatestKey(checkid);
    let s = this.bucket.tryGetJson(key);
    return CheckResult.fromJson(s);
  }

  inflight makeKey(checkid: str, key: str): str {
    return "{checkid}/{key}";
  }

  inflight makeLatestKey(checkid: str): str {
    return this.makeKey(checkid, "latest.json");
  }
}
