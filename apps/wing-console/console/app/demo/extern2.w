
bring cloud;

class FlyIO {
  bucket: cloud.Bucket;
  
  init() {
    this.bucket = new cloud.Bucket();
  }
  
  inflight create(id:str, cloneUrl: str, sha: str, entrypoint: str): str {
    this.bucket.putJson(id, {
      id: id,
      cloneUrl: cloneUrl,
      sha: sha,
      entrypoint: entrypoint
    });
    // flyio url 
    
    return "https://${id}.fly.io";
  }
}
