bring cloud;

let bucket = new clod.Bucket();
               //^ Unknown symbol

let funky = new cloudy.Funktion(inflight () => { });
              //^ Unknown symbol

let x = 2 + y;
          //^ Unknown symbol

class SomeResource {
  _bucket: cloud.Bucket;

  init() {
    this._bucket = new cloud.Bucket();
  }

  inflight get_task(id: str): str {
    this._bucket.assert(2 + "2");
               //^ Unknown symbol
                          //^ Expected type to be "num", but got "str" instead
    return this._bucket.method_which_is_not_part_of_bucket_api(id);
                      //^ Unknown symbol
  }
}
