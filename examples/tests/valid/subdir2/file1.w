bring "./inner" as blah; // an alias that is not "inner"

class Foo {
  pub foo(): str {
    return "foo";
  }

  pub checkWidget(widget: blah.Widget): num {
    return widget.compute() + blah.Widget.staticCompute();
  }
}
