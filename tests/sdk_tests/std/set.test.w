//-----------------------------------------------------------------------------
// toArray()
let mySet = Set<num> [1, 2, 3];
let myArrayFromSet = mySet.toArray();
assert(myArrayFromSet.at(0) == 1);
assert(myArrayFromSet.at(1) == 2);
assert(myArrayFromSet.at(2) == 3);
assert(myArrayFromSet.length == mySet.size);
assert(myArrayFromSet.length == 3);

let myMutSet = MutSet<str> ["a", "b", "c"];
let myArrayFromMutSet = myMutSet.toArray();
assert(myArrayFromMutSet.at(0) == "a");
assert(myArrayFromMutSet.at(1) == "b");
assert(myArrayFromMutSet.at(2) == "c");
assert(myArrayFromMutSet.length == myMutSet.size);
assert(myArrayFromMutSet.length == 3);
//-----------------------------------------------------------------------------


// container types are equal regardless of the mutability if they have the same
// content but in all scenraios the type is specified for better readability

assert(Set<num>[1, 2] == MutSet<num>[1, 2]);
assert(Set<bool>[true, false] == MutSet<bool>[false, true]);

test "equality"{
    assert(Set<num>[1, 2] == MutSet<num>[1, 2]);
    assert(Set<bool>[true, false] == MutSet<bool>[false, true]);
}


let openings = MutSet<str> ["A Cruel Angel's Thesis", "Lilium", "Unravel", "TOP"];
let immutOpenings: Set<str> = openings.copy();
assert(immutOpenings.copyMut() == openings);
openings.add("Abnormalize");
assert(openings.has("Abnormalize"));
openings.delete("TOP");
assert(openings.has("TOP") == false);
openings.clear();
assert(openings.size == 0);

test "mutability" {
    let openings = MutSet<str> ["A Cruel Angel's Thesis", "Lilium", "Unravel", "TOP"];
    let immutOpenings: Set<str> = openings.copy();
    assert(immutOpenings.copyMut() == openings);
    openings.add("Abnormalize");
    assert(openings.has("Abnormalize"));
    openings.delete("TOP");
    assert(openings.has("TOP") == false);
    openings.clear();
    assert(openings.size == 0);
}


let maleVA = Set<str> ["Kenjiro Tsuda", "Akira Ishida", "Yoshitsugu Matsuoka"];
assert(maleVA.size == 3);

let femaleVA = MutSet<str>["Saori Hayami", "Miyuki Sawashiro"];
assert(femaleVA.size == 2);
femaleVA.add("Maaya Sakamoto");
assert(femaleVA.size == 3);
femaleVA.clear();
assert(femaleVA.size == 0);

test "size()" {
    let maleVA = Set<str> ["Kenjiro Tsuda", "Akira Ishida", "Yoshitsugu Matsuoka"];
    assert(maleVA.size == 3);

    let femaleVA = MutSet<str>["Saori Hayami", "Miyuki Sawashiro"];
    assert(femaleVA.size == 2);
    femaleVA.add("Maaya Sakamoto");
    assert(femaleVA.size == 3);
    femaleVA.clear();
    assert(femaleVA.size == 0);
}


let genre = Set<str> ["isekai", "mecha", "cyberpunk"];
assert(genre.has("drama") == false);
assert(genre.has("mecha"));

let mutGenre = MutSet<str> ["rom-com", "sports", "sci-fi"];
assert(mutGenre.has("psychological") == false);
assert(mutGenre.has("rom-com"));
mutGenre.delete("rom-com");
mutGenre.add("psychological");
assert(mutGenre.has("psychological"));
assert(mutGenre.has("rom-com") == false);

test "has()" {
    let genre = Set<str> ["isekai", "mecha", "cyberpunk"];
    assert(genre.has("drama") == false);
    assert(genre.has("mecha"));

    let mutGenre = MutSet<str> ["rom-com", "sports", "sci-fi"];
    assert(mutGenre.has("psychological") == false);
    assert(mutGenre.has("rom-com"));
    mutGenre.delete("rom-com");
    mutGenre.add("psychological");
    assert(mutGenre.has("psychological"));
    assert(mutGenre.has("rom-com") == false);
}


let endings = Set<bool>[];
assert(endings.toArray() == Array<bool>[]);
let strEndings = Set<str> ["Somewhere, Faraway, Everyone is Listening to a Ballad"];
assert(strEndings.toArray() == ["Somewhere, Faraway, Everyone is Listening to a Ballad"]);
let copyEndings = endings.copyMut();
assert(copyEndings.toArray() == endings.toArray());

let mutEndings = MutSet<Array<str>> [["Fly Me To The Moon", "Slump"], ["Heikousen"]];
assert(mutEndings.toArray() == [["Fly Me To The Moon", "Slump"], ["Heikousen"]]);
mutEndings.add(["Wagamama"]);
assert(mutEndings.toArray() == [["Fly Me To The Moon", "Slump"], ["Heikousen"], ["Wagamama"]]);
let immutEndings = mutEndings.copy();
assert(immutEndings.toArray() == mutEndings.toArray());

test "toArray()" {
    let endings = Set<bool>[];
    assert(endings.toArray() == Array<bool>[]);
    let strEndings = Set<str> ["Somewhere, Faraway, Everyone is Listening to a Ballad"];
    assert(strEndings.toArray() == ["Somewhere, Faraway, Everyone is Listening to a Ballad"]);
    let copyEndings = endings.copyMut();
    assert(copyEndings.toArray() == endings.toArray());

    let mutEndings = MutSet<Array<str>> [["Fly Me To The Moon", "Slump"], ["Heikousen"]];
    assert(mutEndings.toArray() == [["Fly Me To The Moon", "Slump"], ["Heikousen"]]);
    mutEndings.add(["Wagamama"]);
    assert(mutEndings.toArray() == [["Fly Me To The Moon", "Slump"], ["Heikousen"], ["Wagamama"]]);
    let immutEndings = mutEndings.copy();
    assert(immutEndings.toArray() == mutEndings.toArray());
}


let talkingQuirks = Set<str> ["dattebane", "battebayo", "dattebasa"];
assert(talkingQuirks.copyMut() == MutSet<str> ["dattebane", "battebayo", "dattebasa"]);

test "copyMut()" {
    let talkingQuirks = Set<str> ["dattebane", "battebayo", "dattebasa"];
    assert(talkingQuirks.copyMut() == MutSet<str> ["dattebane", "battebayo", "dattebasa"]);
}


let evaRebuild = MutSet<num> [1.11, 2.22, 3.33];
evaRebuild.add(3.0+1.0);
assert(evaRebuild.has(3.0+1.0));
assert(evaRebuild == MutSet<num>[1.11, 2.22, 3.33, 3.0+1.0]);

test "add()" {
    let evaRebuild = MutSet<num> [1.11, 2.22, 3.33];
    evaRebuild.add(3.0+1.0);
    assert(evaRebuild.has(3.0+1.0));
    assert(evaRebuild == MutSet<num>[1.11, 2.22, 3.33, 3.0+1.0]);
}


let studios = MutSet<str> ["Gainax", "Ghibli", "Production I.G.", "Shaft"];
assert(studios.delete("Gainax"));
assert(studios.has("Gainax") == false);
assert(studios.delete("Sunrise") == false);
assert(studios.size == 3);

test "delete()" {
    let studios = MutSet<str> ["Gainax", "Ghibli", "Production I.G.", "Shaft"];
    assert(studios.delete("Gainax"));
    assert(studios.has("Gainax") == false);
    assert(studios.delete("Sunrise") == false);
    assert(studios.size == 3);
}


let demographics = MutSet<str> ["shounen", "shoujo", "josei", "seinen"];
demographics.clear();
assert(demographics.size == 0);
demographics.add("kodomo");
demographics.clear();
assert(demographics.has("kodomo") == false);

test "clear()" {
    let demographics = MutSet<str> ["shounen", "shoujo", "josei", "seinen"];
    demographics.clear();
    assert(demographics.size == 0);
    demographics.add("kodomo");
    demographics.clear();
    assert(demographics.has("kodomo") == false);
}


let acronyms = MutSet<Map<str>> [{"SEL" => "Serial Experiments Lain", "NGE" => "Neon Genesis Evangelion"}];
let copyAcronyms = acronyms.copy();
assert(copyAcronyms == Set<Map<str>>[{"SEL" => "Serial Experiments Lain", "NGE" => "Neon Genesis Evangelion"}]);
acronyms.add({"DomeKano" => "Domestic na Kanojo"});
let copyAcronymsNew = acronyms.copy().copyMut();
assert(copyAcronymsNew == acronyms);

test "copy()" {
    let acronyms = MutSet<Map<str>> [{"SEL" => "Serial Experiments Lain", "NGE" => "Neon Genesis Evangelion"}];
    let copyAcronyms = acronyms.copy();
    assert(copyAcronyms == Set<Map<str>>[{"SEL" => "Serial Experiments Lain", "NGE" => "Neon Genesis Evangelion"}]);
    acronyms.add({"DomeKano" => "Domestic na Kanojo"});
    let copyAcronymsNew = acronyms.copy().copyMut();
    assert(copyAcronymsNew == acronyms);
}
