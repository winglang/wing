bring "./store.w" as file1;
bring "./subdir/subfile.w" as file2;
bring "./subdir/empty.w" as file3;
bring math;

// classes from other files can be used
let store = new file1.Store();
let q = new file2.Q();

test "add data to store" {
  store.store("foo");
}

// structs from other files can be used
let s = file1.Point {
  x: 1,
  y: 2,
};

// enums from other files can be used
let c = file1.Color.BLUE;
assert(c != file1.Color.RED);

// interfaces from other files can be used
class Triangle impl file1.Shape {
  public area(): num {
    return 1;
  }
}
let t = new Triangle();

// classes can have the same name as classes in other modules
class Util {}
