bring cloud;
bring fs;
bring util;
bring expect;

let bucket = new cloud.Bucket();

test "signedUrl GET" {
  let KEY = "tempfile.txt";
  let VALUE = "Hello, Wing!";

  bucket.put(KEY, VALUE);

  let getSignedUrl = bucket.signedUrl(KEY);

  // Download file from private bucket using GET presigned URL
  let output = util.shell("curl \"{getSignedUrl}\"");

  expect.equal(output, VALUE);
}

test "signedUrl PUT" {
  let KEY = "tempfile.txt";
  let VALUE = "Hello, Wing!";

  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, KEY);
  fs.writeFile(tempFile, VALUE);

  let putSignedUrl = bucket.signedUrl(KEY, { action: cloud.BucketSignedUrlAction.PUT });

  // Upload file to private bucket using PUT presigned URL
  util.shell("curl -X PUT -T \"{tempFile}\" \"{putSignedUrl}\"");

  expect.equal(bucket.get(KEY), VALUE);
}

test "signedUrl duration option is respected" {
  let ACCESS_DENIED_ERROR = "<Error><Code>AccessDenied</Code><Message>Request has expired</Message>";
  let KEY = "tempfile.txt";
  let VALUE = "Hello, Wing!";

  bucket.put(KEY, VALUE);

  let getSignedUrl = bucket.signedUrl(KEY, { duration: 1s });

  util.sleep(2s);

  // Download file from private bucket using expired GET presigned URL
  let output = util.shell("curl \"{getSignedUrl}\"", { throw: false });

  assert(output.contains(ACCESS_DENIED_ERROR));
}