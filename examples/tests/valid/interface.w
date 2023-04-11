interface IShape {
    // method with a return type
    method_1(): str;
    // method without a return type
    method_2();
    // method with a return type of the interface type
    method_3(): IShape;
}

interface IPointy {
    method_2();
}

interface ISquare extends IShape, IPointy {
    
}
