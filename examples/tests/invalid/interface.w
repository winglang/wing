// interface with 2 methods having the same name, same signature
// interface with the same extend twice


// interface extend loop
interface IA extends IB {
}

interface IB extends IA {
}

// interface extends interface which doesn't exist
interface IExist extends IDontExist {
                      // ^^^^^^^^^^ Unknown symbol "IDontExist"
}

// interface extends class
class ISomeClass {
}
interface ISomeInterface extends ISomeClass {
                      // ^^^^^^^^^^ Unknown symbol "IDontExist"
}

