struct MyDataModel1 extends OtherModel, CoolerModel {
  field1: num;
  field2: str;
}

// struct_definition [0, 0] - [3, 1]
// name: identifier [0, 7] - [0, 19]
// field: struct_field [1, 2] - [1, 14]
//   name: identifier [1, 2] - [1, 8]
//   type: builtin_type [1, 10] - [1, 13]
// field: struct_field [2, 2] - [2, 14]
//   name: identifier [2, 2] - [2, 8]
//   type: builtin_type [2, 10] - [2, 13]