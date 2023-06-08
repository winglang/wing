interface IShape {
    // method with a return type
    method1() -> str;
    // method with a void return type
    method2() -> void;
    // method with a return type of the interface type
    method3() -> IShape;
}

interface IPointy {
    method2() -> void;
}

interface ISquare extends IShape, IPointy {
    
}
