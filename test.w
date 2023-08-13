class Table {
  inflight items: MutArray<num>;

  inflight init() {
    this.items = MutArray<num>[];
  }
  inflight putItem(x: num) {
    this.items.push(x);
  }
}

