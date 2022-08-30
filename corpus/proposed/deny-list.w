bring cloud;
bring fs;

struct DenyListRule {
  package_name: str;
  version: str?;
  reason: str;
}

struct DenyListProps {
  rules: array<DenyListRule>;
}

resource DenyList {
  _bucket: cloud.Bucket;
  _object_key: str;

  new(props: DenyListProps) {
    this._bucket = cloud.Bucket();
    this._object_key = "deny-list.json";

    let rules_dir = this._write_to_file(props.rules, this._object_key);
    bucket.upload("${rules_dir}/*/**", prune: true, retain_on_delete: true);
  }

  _write_to_file(list: array<DenyListRule>, filename: str): str {
    let tmpdir = fs.mkdtemp();
    let filepath = "${tmpdir}/${filename}";
    let map = new map<DenyListRule>();
    for rule in list {
      append_rule(map, rule);
    }
    fs.write_json(filepath, map);
    return tmpdir;
  }

  ~rules: map<DenyListRule>;

  ~new() {
    this.rules = this._bucket.get(this._object_key) ?? new map<DenyListRule>();
  }

  public ~lookup(name: str, version: str): DenyListRule? {
    return this.rules[name] ?? this.rules["${name}/v${version}"];
  }

  public ~add_rule(rule: DenyListRule) {
    append_rule(this.rules, rule)
    this._bucket.set(this._object_key, this.rules);
  }
}

fn append_rule(map: mut map<DenyListRule>, rule: DenyListRule) {
  let suffix = version != nil ? "/v${rule.version}" : "";
  let path = "${rule.package_name}${suffix}";
  map[path] = rule;
}

fn main() {
  let deny_list = DenyList();

  fn ~filter_fn(event: cloud.QueueEvent) {
    let package_name = event.data["package_name"];
    let version = event.data["version"];
    let reason = event.data["reason"];
    if deny_list.lookup(package_name, version) != nil {
      print("Package rejected: ${package_name}");
    } else {
      print("Package accepted: ${package_name}");
    }
  }

  queue = cloud.Queue();
  filter = cloud.Function(filter_fn);
  queue.add_consumer(filter);
}
