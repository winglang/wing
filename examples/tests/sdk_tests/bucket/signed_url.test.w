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

  // // Download file from private bucket using GET presigned URL
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

// test "signedUrl for non existent key" {
//   let var error = "";
  
//   if (util.env("WING_TARGET") != "sim") { 
//     try{
//       let signedUrl = testBucket.signedUrl("file.txt");
//     } catch e {
//       error = e;
//     }

//     assert(error == "Cannot provide signed url for a non-existent key (key=file.txt)");
//   }
// }
