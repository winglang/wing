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
inflight class ISomeClass {}
interface ISomeInterface extends ISomeClass {
                      // Interface "ISomeInterface (at ../../examples/tests/invalid/interface.w:21:11)" extends "ISomeClass", which is not an interface
}

// interface with multiple methods having the same name, different signature
interface IWithSameName {
    foo();
    foo();
 // ^^^ Symbol "foo" already defined in this scope
    foo(): num;
 // ^^^ Symbol "foo" already defined in this scope
}