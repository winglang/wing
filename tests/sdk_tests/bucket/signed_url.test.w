bring cloud;
bring fs;
bring util;
bring expect;

let bucket = new cloud.Bucket();

test "signedUrl GET (implicit)" {
  let KEY = "tempfile.txt";
  let VALUE = "Hello, Wing!";

  bucket.put(KEY, VALUE);

  let getSignedUrl = bucket.signedUrl(KEY);

  // Download file from private bucket using GET presigned URL
  let output = util.shell("curl \"{getSignedUrl}\"");

  expect.equal(output, VALUE);
}

test "signedUrl GET (explicit)" {
  let KEY = "tempfile.txt";
  let VALUE = "Hello, Wing!";

  bucket.put(KEY, VALUE);

  let getSignedUrl = bucket.signedUrl(KEY, { action: cloud.BucketSignedUrlAction.DOWNLOAD });

  // Download file from private bucket using GET presigned URL
  let output = util.shell("curl \"{getSignedUrl}\"");

  expect.equal(output, VALUE);
}

test "signedUrl GET with non-existent key" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      expect.equal(actual, expected);
      error = true;
    }
      expect.equal(error, true);
  };
  let UNEXISTING_KEY = "no-such-file.txt";
  let OBJECT_DOES_NOT_EXIST_ERROR = "Cannot provide signed url for a non-existent key (key={UNEXISTING_KEY})";

  assertThrows(OBJECT_DOES_NOT_EXIST_ERROR, () => {
    bucket.signedUrl(UNEXISTING_KEY);
  });
}

test "signedUrl PUT" {
  let KEY = "tempfile.txt";
  let VALUE = "Hello, Wing!";

  let tempDir = fs.mkdtemp();
  let tempFile = fs.join(tempDir, KEY);
  fs.writeFile(tempFile, VALUE);

  let putSignedUrl = bucket.signedUrl(KEY, { action: cloud.BucketSignedUrlAction.UPLOAD });

  // Upload file to private bucket using PUT presigned URL
  util.shell("curl -X PUT -T \"{tempFile}\" \"{putSignedUrl}\"");

  expect.equal(bucket.get(KEY), VALUE);
}

test "signedUrl duration option is respected" {
  let isExpiredTokenError = (output: str) => {
    let target = util.env("WING_TARGET");
    let var result = false;

    if target == "tf-aws" {
      result = output.contains("<Code>AccessDenied</Code><Message>Request has expired</Message>");
    } elif target == "tf-gcp" {
      result = output.contains("<Code>ExpiredToken</Code><Message>Invalid argument.</Message>");
    }
    
    return result;
  };

  let KEY = "tempfile.txt";
  let VALUE = "Hello, Wing!";

  bucket.put(KEY, VALUE);

  let getSignedUrl = bucket.signedUrl(KEY, { duration: 1s });

  util.sleep(2s);

  // Download file from private bucket using expired GET presigned URL
  let output = util.shell("curl \"{getSignedUrl}\"");

  expect.equal(isExpiredTokenError(output), true);
}