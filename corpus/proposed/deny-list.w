bring cloud;
bring fs;

struct DenyListRule {
  package_name: string;
  version: string?;
  reason: string;
}

struct DenyListProps {
  rules: DenyListRule[];
  package_data_bucket: cloud.Bucket;
  package_data_key_prefix: str;
  prune_on_change?: bool;
  prune_period?: duration;
  on_change_handler?: cloud.Function;
}

resource DenyList {
  _bucket: cloud.Bucket;
  _object_key: str;
  _prune: Prune;

  new(props: DenyListProps) {
    let object_key = "deny-list.json";
    let rules_dir = this.write_to_file(props.rules, this.object_key);
    let bucket = cloud.Bucket();
    bucket.upload("${rules_dir}/*/**", prune: true, retain_on_delete: true)

    let prune = Prune(
      package_data_bucket: props.package_data_bucket,
      package_data_key_prefix: props.package_data_key_prefix,
      deny_list: this,
      on_change_handler: props.on_change_handler,
    );

    if props.prune_on_change ?? true {
      bucket.on_upload(prune.prune_handler, filters: [{ prefix: object_key, suffix: object_key }])
    }

    let prune_period = props.prune_period ?? 5m;
    if prune_period && prune_period > 0 {
      prune.prune_handler.add_schedule(prune_period.to_rate())
    }

    this._bucket = bucket;
    this._prune = prune;
    this._object_key = object_key;
  }

  _write_to_file(list: DenyListRule[], filename: str): str {
    let tmpdir = fs.mkdtemp();
    let filepath = "${tmpdir}/${filename}";
    let map = create_deny_list_map(list);
    fs.write_json(filepath, map);
    return tmpdir;
  }

  ~rules: map<string, DenyListRule>;

  ~new() {
    this.rules = this._bucket.get(this._object_key) ?? {};
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
    this._bucket.set(this._object_key, this.rules);
  }
}

fn main() {
  let deny_list = DenyList();

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
