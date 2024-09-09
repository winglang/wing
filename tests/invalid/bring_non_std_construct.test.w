bring "cdktf" as cdktf;

// We want to test importing a construct that doesn't have a `scope`/`id` pair as its first arguments.
// Such constructs are technically valid but go against CDK conventions. Nonetheless we need to see
// we support them and provide correct diagnosticts when the user uses them.
// We use cdktf's backends as an example of such constructs.

new cdktf.S3Backend();
//^ Expected 1 positional argument(s) but got 0

class Foo {
  new() {
    new cdktf.S3Backend(this, cdktf.S3BackendConfig {bucket: "foo", key: "bar"}) as "s3_backend";
                                                                                  //^ Cannot set id of non-standard preflight class "S3Backend" using `as`
    new cdktf.S3Backend(this, cdktf.S3BackendConfig {bucket: "foo", key: "bar"}) in this;
                                                                                  //^ Cannot set scope of non-standard preflight class "S3Backend" using `in`
  }
}