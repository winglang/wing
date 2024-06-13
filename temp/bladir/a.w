bring "./common.w" as common;

pub inflight class FooA {
  pub method() {
    new common.Common();
  }
}

pub class BarA {
  pub method() {
    new common.CommonBar();
  }
}