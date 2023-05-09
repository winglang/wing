interface IShape {
    // method with a return type
    method1(): str;
    // method without a return type
    method2();
    // method with a return type of the interface type
    method3(): IShape;
}

interface IPointy {
    method2();
}

interface ISquare extends IShape, IPointy {
    
}
