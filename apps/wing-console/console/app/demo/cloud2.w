
bring cloud;

class DNS {
  bucket: cloud.Bucket;
  
  init() {
    this.bucket = new cloud.Bucket();
  }
  
  inflight add(origin: str, destination: str): void {
    this.bucket.putJson(origin, {
      origin: origin,
      destination: destination,
    });
  }
}
