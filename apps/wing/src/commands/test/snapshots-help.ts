export const SNAPSHOTS_HELP = `\
Snapshots (s, --snapshots <mode>):
  never  \t Snapshot are never captured
  auto   \t Determines behavior based on the "CI" environment variable: "assert" if CI=1 or "deploy" otherwise
  deploy \t Execute tests on the target platform and update snapshots if all tests pass
  assert \t verifies that the snapshot is up-to-date and fails the test is they are not
  update \t Only update the snapshots without actually executing the tests on the target platform

  When testing against a cloud target (e.g. -t tf-aws), if all tests pass, the compiler output 
  will be captured under "<entrypoint>.snap.md".
`;

export const SNAPSHOT_ERROR_PREFIX = "Snapshot mismatch:";

export const SNAPSHOTS_ERROR_HELP = [
  "Update with '--snapshots=update'",
  "To disable this behavior run with '--snapshots=never'",
  "See https://www.winglang.io/docs/tools/cli#cloud-test-snapshots",
].join("\n");
