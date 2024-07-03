bring cloud;

let innerOptional = (): Json? => {
  return nil;
};

let outerJson = (x: Json) => {

};


let innerJson = (): Json => {
  return {};
};

let innerMutJson = (): MutJson => {
  return {};
};

let outerOptional = (x: Json?) => {

};


// those are ok
outerJson(innerJson());
outerOptional(innerOptional());
outerOptional(innerJson());
outerOptional(innerMutJson());
outerJson(innerMutJson());

// another cases 
outerJson( cloud.ApiResponse {
  status: 404
});
outerJson({x: 1, y: 2});

let castedMutJson: MutJson = cloud.ApiResponse {
  status: 404
};

let optionalStr = (): str? => {};

outerOptional(optionalStr());

let optionalNum: num? = 6;

let diverseJson = {
  a: "str",
  b: 3,
  c: -3,
  d: [{a: 1}, {a: 2}],
  e: Json.deepCopy(castedMutJson),
  f: optionalStr(),
  g: optionalNum
};

outerOptional(diverseJson);
outerJson(diverseJson);


// this is problematic as json? can be nil, and nil is not json
outerJson(innerOptional());
        //^^^^^^^^^^^^^^^ Expected type to be "Json", but got "Json?" instead

// this is problematic as str? can be nil, and nil is not json
outerJson(optionalStr());
        //^^^^^^^^^^^^^Expected type to be "Json", but got "str?" instead
