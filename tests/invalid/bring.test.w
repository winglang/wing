bring std;
//    ^^^ Redundant bring of "std"
bring cloud;
bring cloud;
//    ^^^^^ "cloud" is already defined
bring ;
//^^^^^ Expected module specification (see https://www.winglang.io/docs/libraries)
bring c;
//^^^^^^ "c" is not a built-in module

bring regex;
//^ "Could not find a trusted library "@winglibs/regex" installed"

bring num;
//^ Could not find a trusted library "@winglibs/num" installed
