bring cloud;

let bucket = new clod.Bucket();
               //^ Unknown symbol

let x = 2 + y;
          //^ Unknown symbol

resource SomeResource {
  _bucket: cloud.Bucket;

  init() {
    this._bucket = new cloud.Bucket();
  }

  inflight get_task(id: str): str {
    return this._bucket.method_which_is_not_part_of_bucket_api(id);
                      //^ Unknown symbol
  }
}
