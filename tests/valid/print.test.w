bring cloud;

class Process {
  pub extern "./print-helpers.js" static write(s: str);
}

log("preflight log");
Process.write("start ");
Process.write("end\n");

test "log1" {
  log("inflight log 1.1");
  log("inflight log 1.2");
}


test "log2" {
  log("inflight log 2.1");
  log("inflight log 2.2");
}
