struct Person {
  name: str;
  age: num;
}

struct House {
  address: str;
  residents: Array<Person>;
}

struct MyParams {
  houses: Array<House>;
}


let app = nodeof(this).app;

app.parameters.addSchema(MyParams.schema());

let myParams = MyParams.fromParameters(app.parameters);

assert(myParams.houses.length == 2);
assert(myParams.houses.at(0).address == "123 Main St");
assert(myParams.houses.at(0).residents.length == 2);