bring std;
//    ^^^ Redundant bring of "std"
bring cloud;
bring cloud;
//    ^^^^^ "cloud" is already defined
bring fs;
//    ^^^^^ "fs" is not a built-in module
bring ;
//^^^^^ Expected built-in module or "external module"
bring c;
//^^^^^^ "c" is not a built-in module