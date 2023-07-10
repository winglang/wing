bring cloud;

let x = MutJson { a: 1 };
x.set("hello", new cloud.Bucket());
//             ^^^^^^^^^^^^^^^^^^ Expected type to be "MutJson", but got "Bucket" instead