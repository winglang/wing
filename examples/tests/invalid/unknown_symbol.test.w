bring cloud;

let bucket = new clod.Bucket();
               //^ Unknown symbol

let funky = new cloudy.Funktion(inflight () => { });
              //^ Unknown symbol

let x = 2 + y;
          //^ Unknown symbol

class SomeResource {
  bucket: cloud.Bucket;

  new() {
    this.bucket = new cloud.Bucket();
  }

  inflight getTask(id: str): str {
    this.bucket.assert(2 + "2");
               //^ Property "assert" doesn't exist in "Bucket"
                          //^ Expected type to be "num", but got "str" instead
    return this.bucket.methodWhichIsNotPartOfBucketApi(id);
                      //^ Property "methodWhichIsNotPartOfBucketApi" doesn't exist in "Bucket"
  }
}

class A extends B {
              //^ Unknown symbol
}

class SomeResourceChild extends SomeResource {
}

let src = new SomeResourceChild();
// Make sure the error states the class and not its parent
src.dodo();
   //^ Property "dodo" doesn't exist in "SomeResourceChild"

unknown = 1;
//^ Unknown symbol

let let = 2;
  //^^^ Reserved word