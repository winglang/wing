//-----------------------------------------------------------------------------
// keys()
let m = { "hello" => 123, "world" => 99 };
let mkeys = m.keys();
assert(mkeys.length == 2);
assert(mkeys.at(0) == "hello");
assert(mkeys.at(1) == "world");

//-----------------------------------------------------------------------------
// values()
let mvalues = m.values();
assert(mvalues.length == 2);
assert(mvalues.at(0) == 123);
assert(mvalues.at(1) == 99);


// container types are equal regardless of the mutability if they have the same
// content but in all scenraios the type is specified for better readability

assert(Map<str>{} == MutMap<str>{});

test "equality"{
  assert(Map<str>{} == MutMap<str>{});
}


let apprentices = MutMap<str> { "plagueis" => "sidious", "dooku" => "ventress" };
apprentices.delete("plagueis");
assert(apprentices.size() == 1);
assert(apprentices.copy() == Map<str> {"dooku" => "ventress"});
apprentices.set("sidious", "dooku");
assert(apprentices.get("sidious")  == "dooku");
apprentices.set("sidious", "maul");
assert(apprentices.get("sidious") == "maul");
apprentices.clear();
assert(apprentices == MutMap<str>{});

test "mutability" {
  let apprentices = MutMap<str> { "plagueis" => "sidious", "dooku" => "ventress" };
  apprentices.delete("plagueis");
  assert(apprentices.size() == 1);
  assert(apprentices.copy() == Map<str> {"dooku" => "ventress"});
  apprentices.set("sidious", "dooku");
  assert(apprentices.get("sidious")  == "dooku");
  apprentices.set("sidious", "maul");
  assert(apprentices.get("sidious") == "maul");
  apprentices.clear();
  assert(apprentices == MutMap<str>{});
}


let trilogies = { "PT" => 2, "OT" => 1, "ST" => 3 };
assert(trilogies.size() == 3);

let mutTrilogies = MutMap<num> { "PT" => 2, "OT" => 1, "ST" => 3 };
assert(mutTrilogies.size() == 3);
mutTrilogies.delete("ST"); // One could argue that it's better if this does not exist
assert(mutTrilogies.size() == 2);

test "size()" {
  let trilogies = { "PT" => 2, "OT" => 1, "ST" => 3 };
  assert(trilogies.size() == 3);

  let mutTrilogies = MutMap<num> { "PT" => 2, "OT" => 1, "ST" => 3 };
  assert(mutTrilogies.size() == 3);
  mutTrilogies.delete("ST");
  assert(mutTrilogies.size() == 2);
}


let greeting = { "hello" => "there!" };
assert(greeting.get("hello") == "there!");
try {
  greeting.get("bye");
} catch err {
  assert(err.contains("does not contain key: \"bye\""));
}


let general: str? = greeting.tryGet("grievous");
assert(general == nil);

let mutGreeting = MutMap<str>{ "general" => "kenobi" };
assert(mutGreeting.get("general") == "kenobi");

let Viceroy: str? = mutGreeting.tryGet("gunray");
assert(Viceroy == nil);

test "get()" {
  let greeting = { "hello" => "there!" };
  assert(greeting.get("hello") == "there!");
  try {
    greeting.get("bye");
  } catch err {
    assert(err.contains("does not contain key: \"bye\""));
  }

  let general: str? = greeting.tryGet("grievous");
  assert(general == nil);

  let mutGreeting = MutMap<str>{ "general" => "kenobi" };
  assert(mutGreeting.get("general") == "kenobi");

  let Viceroy: str? = mutGreeting.tryGet("gunray");
  assert(Viceroy == nil);
}


let legion501 = { "fives" => "CT-5555", "rex" => "CT-7567" , "appo" => "CC-1119", "jesse" => "CT-5597" };
assert(legion501.has("fives") == true);
assert(legion501.has("rex") == legion501.has("jesse"));
assert(legion501.has("cody") == false);

let padawans = MutMap<str> { "ahsoka" => "anakin", "anakin" => "kenobi", "kenobi" => "qui gon", "qui gon" => "dooku", "dooku" => "yoda" };
assert(padawans.has("anakin") == true);
assert(padawans.has("qui gon") == padawans.has("dooku") == padawans.has("anakin"));
assert(padawans.has("windu") == padawans.has("sifo dyas"));
assert(padawans.has("revan") == false);

test "has()" {
  let legion501 = { "fives" => "CT-5555", "rex" => "CT-7567" , "appo" => "CC-1119", "jesse" => "CT-5597" };
  assert(legion501.has("fives") == true);
  assert(legion501.has("rex") == legion501.has("jesse"));
  assert(legion501.has("cody") == false);

  let padawans = MutMap<str> { "ahsoka" => "anakin", "anakin" => "kenobi", "kenobi" => "qui gon", "qui gon" => "dooku", "dooku" => "yoda" };
  assert(padawans.has("anakin") == true);
  assert(padawans.has("qui gon") == padawans.has("dooku") == padawans.has("anakin"));
  assert(padawans.has("windu") == padawans.has("sifo dyas"));
  assert(padawans.has("revan") == false);
}


let forceUsers = { "sith" => ["malak", "vader", "bane"], "jedi" => ["sunrider", "bastila", "bindo"]};
let userKeys = forceUsers.values();
let valArr = [["malak", "vader", "bane"], ["sunrider", "bastila", "bindo"]];
assert(userKeys.length == valArr.length);
for i in 0..userKeys.length {
  assert(userKeys.at(i) == valArr.at(i));
}

let saberforms = MutMap<str> { "1st" => "shii-cho", "2nd" => "makashi", "3rd" => "soresu", "4th" => "ataru", "5th" => "shien", "6th" => "niman", "7th" => "juyo"};
let saberformNames = saberforms.values();
let nameArr = ["shii-cho", "makashi", "soresu", "ataru", "shien", "niman", "juyo"];
assert(saberformNames.length == nameArr.length);
for i in 0..saberformNames.length {
  assert(saberformNames.at(i) == nameArr.at(i));
}

test "values()" {
  let forceUsers = { "sith" => ["malak", "vader", "bane"], "jedi" => ["sunrider", "bastila", "bindo"]};
  let userKeys = forceUsers.values();
  let valArr = [["malak", "vader", "bane"], ["sunrider", "bastila", "bindo"]];
  assert(userKeys.length == valArr.length);
  for i in 0..userKeys.length {
    assert(userKeys.at(i) == valArr.at(i));
  }

  let saberforms = MutMap<str> { "1st" => "shii-cho", "2nd" => "makashi", "3rd" => "soresu", "4th" => "ataru", "5th" => "shien", "6th" => "niman", "7th" => "juyo"};
  let saberformNames = saberforms.values();
  let nameArr = ["shii-cho", "makashi", "soresu", "ataru", "shien", "niman", "juyo"];
  assert(saberformNames.length == nameArr.length);
  for i in 0..saberformNames.length {
    assert(saberformNames.at(i) == nameArr.at(i));
  }
}


let lightsaberColorMap = { "red" => "sith", "blue" => "jedi" };
let lightsaberColors = lightsaberColorMap.keys();
let colorArr = ["red", "blue"];
assert(lightsaberColors.length == colorArr.length);
for i in 0..lightsaberColors.length {
  assert(lightsaberColors.at(i) == colorArr.at(i));
}

let isMandalorianWarrior = MutMap<bool> { "bo katan" => true, "jango" => true, "satine" => false, "boba" => true};
let mandalorianKeys = isMandalorianWarrior.keys();
let keysArr = ["bo katan", "jango", "satine", "boba"];
assert(mandalorianKeys.length == keysArr.length);
for i in 0..mandalorianKeys.length {
  assert(mandalorianKeys.at(i) == keysArr.at(i));
}

test "keys()" {
  let lightsaberColorMap = { "red" => "sith", "blue" => "jedi" };
  let lightsaberColors = lightsaberColorMap.keys();
  let colorArr = ["red", "blue"];
  assert(lightsaberColors.length == colorArr.length);
  for i in 0..lightsaberColors.length {
    assert(lightsaberColors.at(i) == colorArr.at(i));
  }

  let isMandalorianWarrior = MutMap<bool> { "bo katan" => true, "jango" => true, "satine" => false, "boba" => true};
  let mandalorianKeys = isMandalorianWarrior.keys();
  let keysArr = ["bo katan", "jango", "satine", "boba"];
  assert(mandalorianKeys.length == keysArr.length);
  for i in 0..mandalorianKeys.length {
    assert(mandalorianKeys.at(i) == keysArr.at(i));
  }

}


let ruleOfTwo = { "master" => "apprentice" };
let mutRuleOfTwo: MutMap<str> = ruleOfTwo.copyMut();
assert(mutRuleOfTwo.copy() == ruleOfTwo);
assert(mutRuleOfTwo.delete("master") == true);
assert(mutRuleOfTwo.size() == 0);

test "copyMut()" {
  let ruleOfTwo = { "master" => "apprentice" };
  let mutRuleOfTwo: MutMap<str> = ruleOfTwo.copyMut();
  assert(mutRuleOfTwo.copy() == ruleOfTwo);
  assert(mutRuleOfTwo.delete("master") == true);
  assert(mutRuleOfTwo.size() == 0);
}


let authority = MutMap<str> {"republic" => "senate", "empire" => "emperor"};
let immutAuthority: Map<str> = authority.copy();
assert(immutAuthority.copyMut() == authority);

test "copy()" {
  let authority = MutMap<str> {"republic" => "senate", "empire" => "emperor"};
  let immutAuthority: Map<str> = authority.copy();
  assert(immutAuthority.copyMut() == authority);
}


let senate = MutMap<str> {"chancellor" => "palpatine"}; // I love democracy
senate.set("senator", "organa");
assert(senate.get("senator") == "organa");
assert(senate.size() == 2);

test "set()" {
  let senate = MutMap<str> {"chancellor" => "palpatine"};
  senate.set("senator", "organa");
  assert(senate.get("senator") == "organa");
  assert(senate.size() == 2);
}


let position = MutMap<str> {"librarian" => "jocasta"};
position.clear();
assert(position.size() == 0);

test "clear()" {
  let position = MutMap<str> {"librarian" => "jocasta"};
  position.clear();
  assert(position.size() == 0);
}


let sithTriumvirate = MutMap<str> { "traya" => "lord of betrayal", "nihilus" => "lord of hunger", "sion" => "lord of pain" };
sithTriumvirate.delete("nihilus");
assert(sithTriumvirate.size() == 2);
sithTriumvirate.delete("sion");
assert(sithTriumvirate == MutMap<str> { "traya" => "lord of betrayal" });

test "delete()" {
  let sithTriumvirate = MutMap<str> { "traya" => "lord of betrayal", "nihilus" => "lord of hunger", "sion" => "lord of pain" };
  sithTriumvirate.delete("nihilus");
  assert(sithTriumvirate.size() == 2);
  sithTriumvirate.delete("sion");
  assert(sithTriumvirate == MutMap<str> { "traya" => "lord of betrayal" });
}


// testing optionals
let mapOfOptionalString = MutMap<str?>{ };
mapOfOptionalString.set("a", nil);
let b = mapOfOptionalString.get("a");
assert(b == nil);

// testing entries() method with multiple items
let map = { "foo" => "hello", "bar" => "world" };

test "entries()" {
  // iterate over map entries
  let entries = map.entries();

  assert(entries.length == 2);
  assert(entries.at(0).key == "foo");
  assert(entries.at(0).value == "hello");
  assert(entries.at(1).key == "bar");
  assert(entries.at(1).value == "world");
}
