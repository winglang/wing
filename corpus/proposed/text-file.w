use fs;

let hello = fs::TextFile("hello.txt");
hello.addLine("world!");
