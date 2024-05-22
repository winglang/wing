bring "jsii-fixture" as jf;

/// === Preflight tests ===
class PreflightBaseWithCtorParam {
  new(a: num) {}
}

// Missing ctor so no call to super error
class PreflighChild1 extends PreflightBaseWithCtorParam {}

// Missing call to super in ctor
class PreflighChild2 extends PreflightBaseWithCtorParam {
  new(a: num) {}
}

// Missing args in call to super in ctor
class PreflighChild3 extends PreflightBaseWithCtorParam {
  new() {
    super();
  }
}

/// === Inflight tests ===
inflight class InflightBaseWithCtorParam {
  new(a: num) {}
}

// Missing ctor so no call to super error
inflight class InflightChild1 extends InflightBaseWithCtorParam {}

// Missing call to super in ctor
inflight class InflightChild2 extends InflightBaseWithCtorParam {
  new(a: num) {}
}

// Missing args in call to super in ctor
inflight class InflightChild3 extends InflightBaseWithCtorParam {
  new() {
    super();
  }
}

// Missing super call when inflight inherits phase independent class (jsii)
inflight class InflightChild4 extends jf.JsiiClass {
  new() {}
}

// === Inflight classes defined inflight ===
inflight () => {
  class InflightBaseWithCtorParam {
    new(a: num) {}
  }
  
  // Missing ctor so no call to super error
  class InflightChild1 extends InflightBaseWithCtorParam {}
  
  // Missing call to super in ctor
  class InflightChild2 extends InflightBaseWithCtorParam {
    new(a: num) {}
  }
  
  // Missing args in call to super in ctor
  class InflightChild3 extends InflightBaseWithCtorParam {
    new() {
      super();
    }
  }
  
  // Missing super call when inflight inherits phase independent class (jsii)
  class InflightChild4 extends jf.JsiiClass {
    new() {}
  }
};