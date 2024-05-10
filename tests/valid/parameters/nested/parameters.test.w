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

let myParams = MyParams.fromJson(app.parameters.read(schema: MyParams.schema()));

assert(myParams.houses.length == 2);
assert(myParams.houses.at(0).address == "123 Main St");
assert(myParams.houses.at(0).residents.length == 2);