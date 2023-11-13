bring cloud;
bring ui;

class WidgetService {
  data: cloud.Bucket;
  counter: cloud.Counter;
  init() {
    this.data = new cloud.Bucket();
    this.counter = new cloud.Counter();
    
    // a button lets you invoke any inflight function
    new ui.Button("Add widget", inflight () => { this.addWidget(); });
    
    // a field displays a labeled value, with optional refreshing
    new ui.Field(
      "Total widgets",
      inflight () => { return this.countWidgets(); },
      refreshRate: 5s,
    );
  }

  inflight addWidget() {
    let id = this.counter.inc();
    this.data.put("widget-${id}", "my data");
  }

  inflight countWidgets(): str {
    return "${this.data.list().length}";
  }
}

new WidgetService();
