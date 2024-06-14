let innerOptional = (): Json? => {
  return nil;
};

let outerJson = (x: Json) => {

};


let innerJson = (): Json => {
  return {};
};

let outerOptional = (x: Json?) => {

};


// those are ok
outerJson(innerJson());
outerOptional(innerOptional());
outerOptional(innerJson());

// this is problematic as json? can be nil, and nil is not json
outerJson(innerOptional());
        //^^^^^^^^^^^^^^^ Expected type to be "Json", but got "Json?" instead

