bring "@winglibs/testfixture" as fixture;
bring testfixture;
bring testfixture as testfixture2;

new fixture.Store();
let fave_num = fixture.FavoriteNumbers.SEVEN;
let fave_num2 = testfixture.FavoriteNumbers.SEVEN;
let fave_num3 = testfixture2.FavoriteNumbers.SEVEN;

assert(fixture.Store.makeKey("hello") == "data/hello.json");

test "makeKeyInflight" {
  assert(fixture.Store.makeKeyInflight("hello") == "data/hello.json");
}
