bring cloud;

let bucket = new clod.Bucket();
               //^ Unknown symbol

let funky = new cloudy.Funktion(inflight () => { });
              //^ Unknown symbol

let x = 2 + y;
          //^ Unknown symbol

class SomeResource {
  bucket: cloud.Bucket;

  init() {
    this.bucket = new cloud.Bucket();
  }

  inflight getTask(id: str): str {
    this.bucket.assert(2 + "2");
               //^ Unknown symbol
                          //^ Expected type to be "num", but got "str" instead
    return this.bucket.methodWhichIsNotPartOfBucketApi(id);
                      //^ Unknown symbol
  }
}
