bring cloud;
bring expect;

let arr = Array<num>[1, 2, 3];

arr[0] = 5;
// ^ error: Cannot update elements of an immutable array

arr["key"];
// ^ error: Expected type to be "num", but got "str" instead

let b = new cloud.Bucket();
b[0] = 5;
// ^ error: Type "Bucket" is not indexable

let optarr: Array<num>? = [1, 2, 3];
optarr[0] = 5;
// ^ error: Type "Array<num>?" is not indexable

let map = Map<num>{"us-east-1" => 5, "us-west-2" => 8};
map[0];
// ^ error: Expected type to be "str", but got "num" instead

let mutmap = Map<bool>{ "a" => true, "b" => false };
mutmap["a"] = false;
// ^ error: Cannot update elements of an immutable map

let json = Json.parse("\{\"a\": 5}");
json[0] = 5;
// ^ error: Cannot update elements of an immutable Json

let s = "hello";
s[0] = "H";
// ^ error: Strings are immutable

let var x = 3 + "hello";
x["hi"] = 4;
// ^ error: Unsupported reassignment of element of type unresolved

let f = (x): Array<str> => {
  log(x[0]);
  // ^ error: Indexing into an inferred type is not supported
  return x;
};
