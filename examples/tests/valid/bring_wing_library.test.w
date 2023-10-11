bring "wing-fixture" as fixture;

new fixture.Store();
let fave_num = fixture.FavoriteNumbers.SEVEN;

assert(fixture.Store.makeKey("hello") == "data/hello.json");

test "makeKeyInflight" {
  assert(fixture.Store.makeKeyInflight("hello") == "data/hello.json");
}
