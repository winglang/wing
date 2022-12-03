bring fs;

let hi = new fs.JsonFile("hi.json");
hi.patch("foo", "bar");
hi.patch("goo", 12);
hi.patch("shoom.boom.good", false);