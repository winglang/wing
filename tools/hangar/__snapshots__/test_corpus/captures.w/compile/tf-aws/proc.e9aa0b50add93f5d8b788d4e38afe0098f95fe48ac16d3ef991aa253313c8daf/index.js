async handle(event) {
  const { bucket1, bucket2, bucket3 } = this;
  (await bucket1.put("file.txt","data"));
  (await bucket2.get("file.txt"));
  (await bucket2.get("file2.txt"));
  (await bucket3.get("file3.txt"));
  for (const stuff of (await bucket1.list())) {
    {console.log(stuff)};
  }
  {console.log((await bucket2.publicUrl("file.txt")))};
  try {
    (await bucket1.publicUrl("file.txt"));
  }
  catch ($error_error) {
    const error = $error_error.message;
    {console.log(error)};
  }
}
