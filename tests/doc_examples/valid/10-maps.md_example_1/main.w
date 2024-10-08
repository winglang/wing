// This file was auto generated from an example found in: 10-maps.md_example_1
// Example metadata: {"valid":true}
// immutable map
let configration = Map<str>{
  "URL" => "https://winglang.io"
};

// mutable map
let listOfPrices = MutMap<num>{
  "PRODUCT_1" => 100.00,
  "PRODUCT_2" => 200.00,
  "PRODUCT_3" => 300.00
};

// Map<num> is inferred 
let values = {"a" => 1, "b" => 2};    // immutable map, Map<num> is inferred

// Change the values of the mutable map
listOfPrices.set("PRODUCT_1", 500);

log(configration.get("URL"));
log(Json.stringify(values.keys()));
log(Json.stringify(listOfPrices.get("PRODUCT_1")));
