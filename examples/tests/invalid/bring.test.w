bring std;
//    ^^^ Redundant bring of "std"
bring cloud;
bring cloud;
//    ^^^^^ "cloud" is already defined
bring fs;
//    ^^^^^ "fs" is not a built-in module
bring ;
//^^^^^ Expected module specification (see https://www.winglang.io/docs/libraries)
bring c;
//^^^^^^ "c" is not a built-in module