bring cloud;

struct DenyListRule {
  package_name: string;
  version: string?;
  reason: string;
}

resource DenyList {
  bucket: cloud.Bucket;
  new() {
    this.bucket = cloud.Bucket();
  }

  ~rules: map<string, DenyListRule>;

  ~new() {
    this.rules = this.bucket.get("deny-list.json") ?? {};
  }

  public ~lookup(name: str, version: str): DenyListRule? {
    return this.rules[name] ?? this.rules["{name}/v{version}"];
  }

  public ~add_rule(name: str, version: str?, reason: str) {
    let mut path = name;
    if version != nil {
        path = "{path}/v{version}";
    }
    this.rules[path] = {
      package_name: name,
      version: version,
      reason: reason,
    };
    this.bucket.set("deny-list.json", this.rules);
  }
}

fn main() {
  deny_list = DenyList();

  fn ~filter_fn(event: cloud.QueueEvent) {
    let package_name = event.data["package_name"];
    let version = event.data["version"];
    let reason = event.data["reason"];
    if deny_list.lookup(package_name, version) {
      print("Package rejected: " + package_name);
    } else {
      print("Package accepted: " + package_name);
    }
  }

  queue = cloud.Queue();
  filter = cloud.Function(filter_fn);
  queue.add_consumer(filter);
}
