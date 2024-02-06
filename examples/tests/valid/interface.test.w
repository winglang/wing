interface IShape {
    // method with a return type
    method1(): str;
    // method with a void return type
    method2(): void;
    // method with a return type of the interface type
    method3(): IShape?;
}

interface IPointy {
    method2(): void;
}

interface ISquare extends IShape, IPointy {
    
}

class Square impl ISquare {
    pub method1(): str {
        return "";
    }
    pub method2(): void {}
    pub method3(): IShape? {
        return this;
    }
}


let var square: IShape = {
    method1: () => { return ""; },
    method2: () => {},
    method3: () => {}
};

square = new Square();

let takesInterface = (s: IPointy) => {};
takesInterface(method2: () => {});
