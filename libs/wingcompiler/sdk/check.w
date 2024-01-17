bring cloud;
bring "./results.w" as r;

pub struct CheckProps {
  /** 
   * Runs the check on deployment and fails deployment if the check fails.
   * @default true
   */
  deploy: bool?;

  /** turn this check to a test (default `true`)*/
  testing: bool?;

  /** 
   * Runs the check every interval
   * @default nil
   */
  rate: duration?;
}

pub interface ICheck {
  /** runs the check and returns the result. note that this method will not throw an exception even
    if the check failed */
  inflight run(): r.CheckResult;

  /** returns the last check result or nil if the check was never executed */
  inflight latest(): r.CheckResult?;
}

pub class Check impl ICheck {
  results: r.Results;
  invoker: cloud.Function;
  checkid: str;
  checkpath: str;

  new(handler: inflight (): void, props: CheckProps?) {
    this.checkid = std.Node.of(this).addr;
    this.checkpath = std.Node.of(this).path;
    this.results = r.Results.of(this);

    let wrapper = inflight (): str => {
      log("running check {this.node.path} ({this.checkid})...");
      let ts = datetime.utcNow().toIso();

      let var result: r.CheckResult = {
        checkid: this.checkid,
        checkpath: this.checkpath,
        timestamp: ts,
        ok: true 
      };

      try {
        handler();
      } catch e {
        log("check failed: {e}");
        
        result = { 
          checkid: this.checkid,
          checkpath: this.checkpath,
          timestamp: ts,
          ok: false, 
          error: e 
        };
      }

      this.results.store(result);

      return Json.stringify(result);
    };

    if props?.deploy ?? true {
      new cloud.OnDeploy(wrapper);
    }

    if let rate = props?.rate {
      let schedule = new cloud.Schedule(rate: rate);
      schedule.onTick(wrapper);
    }

    if props?.testing ?? true {
      new std.Test(handler) as "test";
    }

    this.invoker = new cloud.Function(wrapper) as "run";
  }

  /**
   * Invokes the check and returns it's result
   */
  pub inflight run(): r.CheckResult {
    let result = this.invoker.invoke("");
    return r.CheckResult.fromJson(Json.parse(result));
  }

  /**
   * Returns the last check result or `nil` if the check was never invoked.
   */
  pub inflight latest(): r.CheckResult? {
    return this.results.latest(this.checkid);
  }
}
