bring expect;

let regularString = "str\n\"";
let emptyString = "";
let number = 1;

let coolString = "cool \"\{{regularString}}\" test";
let reallyCoolString = "{number}{emptyString}\n{coolString}\n\{empty_string}{"string-in-string"}!";

let beginingWithCoolStrings = "{regularString} {number} <- cool";
let endingWithCoolStrings = "cool -> {regularString} {number}";

let nonInterpolated = #"a non { { {interpolated } } } strin{ g }";

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


test "str interpolation with lifted expr" {
    let i = 1336;
    let s = "leet: {i+number}";
    expect.equal(s, "leet: 1337");
    expect.equal(#"leet: {i+number}", "leet: \{i+number\}");
    expect.equal(#"", "");
    expect.equal(#"{}".length, 2);

}