bring "./common.w" as common;

pub inflight class FooB {
  pub method() {
    new common.Common();
  }
}

pub class BarB {
  pub method() {
    new common.CommonBar();
  }
}