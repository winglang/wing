bring cloud;
bring fs;

struct DenyListRule {
  package_name: str;
  version: str?;
  reason: str;
}

struct DenyListProps {
  rules: list<DenyListRule>;
}

resource DenyList {
  _bucket: cloud.Bucket;
  _object_key: str;

  init(props: DenyListProps) {
    this._bucket = cloud.Bucket();
    this._object_key = "deny-list.json";

    let rules_dir = this._write_to_file(props.rules, this._object_key);
    this._bucket.upload("${rules_dir}/*/**", prune: true, retain_on_delete: true);
  }

  _write_to_file(list: list<DenyListRule>, filename: str): str {
    let tmpdir = fs.mkdtemp();
    let filepath = "${tmpdir}/${filename}";
    let map = new mut_map<DenyListRule>();
    for rule in list {
      append_rule(map, rule);
    }
    fs.write_json(filepath, map);
    return tmpdir;
  }

  ~ _rules: MutMap<DenyListRule>;

  ~ new() {
    this._rules = this._bucket.get(this._object_key) ?? new mut_map<DenyListRule>();
  }

  ~ lookup(name: str, version: str): DenyListRule? {
    return this._rules.get(name) ?? this.rules.get("${name}/v${version}");
  }

  ~ add_rule(rule: DenyListRule) {
    append_rule(this.rules, rule)
    this._bucket.upload(this._object_key, this.rules);
  }
}

fn append_rule(map: mut_map<DenyListRule>, rule: DenyListRule) {
  let suffix = version != nil ? "/v${rule.version}" : "";
  let path = "${rule.package_name}${suffix}";
  map[path] = rule;
}

let deny_list = def DenyList();
let filter = cloud.Function((event: cloud.QueueEvent) ~> {
  let package_name = event.data["package_name"];
  let version = event.data["version"];
  let reason = event.data["reason"];
  if deny_list.lookup(package_name, version) != nil {
    print("Package rejected: ${package_name}");
  } else {
    print("Package accepted: ${package_name}");
  }
});

let queue = cloud.Queue();
queue.add_consumer(filter);
