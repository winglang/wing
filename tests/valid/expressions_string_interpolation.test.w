bring expect;

let regularString = "str\n\"";
let emptyString = "";
let number = 1;

let coolString = "cool \"\{{regularString}}\" test";
let reallyCoolString = "{number}{emptyString}\n{coolString}\n\{empty_string}{"string-in-string"}!";

let beginingWithCoolStrings = "{regularString} {number} <- cool";
let endingWithCoolStrings = "cool -> {regularString} {number}";

let nonInterpolated = #"a non { { {interpolated } } } strin{ g }";

let nonInterpolatedJson = {a: nonInterpolated, b: #"this {one} too"};

expect.equal("{1+1}", "2");
expect.equal("\{1+1}", "\{1+1}");
expect.notEqual("\{1+1}", "2");
expect.notEqual("\{1+1}", "\{2}");
log("\{1+1\} {number}");
log(nonInterpolated);
log("this is '{nonInterpolated}'");
expect.equal(#"{number}", "\{number\}");
expect.equal(#"{1 + 1}", "\{1 + 1\}");
expect.equal(#"", "");
expect.equal(#"{}", "\{\}");
expect.equal("a\nb\nc", #"a\nb\nc" );
expect.equal(#"\{\}".length, 2);
expect.equal(#"{}".length, 2);
expect.equal(#"\\{".length, 2);
expect.equal(#"a\nb\nc".length, 5);
expect.equal("{number} \{number}", "1 \{number}");

// multiline
let ml1 = "this
is
multiline";

let ml2 = #"this
is
multiline";

let ml3 = "this\n\is\n\multiline";

expect.equal(ml1,ml2);
expect.equal(ml2,ml3);

test "str interpolation with lifted expr" {
    let i = 1336;
    let s = "leet: {i+number}";
    expect.equal(s, "leet: 1337");
    expect.equal(#"leet: {i+number}", "leet: \{i+number\}");
    expect.equal(#"", "");
    expect.equal(#"{}".length, 2);

}