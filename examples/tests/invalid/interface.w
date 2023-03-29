// interface extend loop
interface IA extends IB {
                  // ^^ Unknown symbol "IB"
}

interface IB extends IA {
}

// interface extends interface which doesn't exist
interface IExist extends IDontExist {
                      // ^^^^^^^^^^ Unknown symbol "IDontExist"
}

// interface extends class
class ISomeClass {
    init(){}
}
interface ISomeInterface extends ISomeClass {
                      // Interface "ISomeInterface (at ../../examples/tests/invalid/interface.w:21:11)" extends "ISomeClass", which is not an interface
}

// interface with 2 methods having the same name, different signature
interface IWithSameName {
    foo();
    foo();
 // ^^^ Symbol "foo" already defined in this scope
    foo(): num;
 // ^^^ Symbol "foo" already defined in this scope
}