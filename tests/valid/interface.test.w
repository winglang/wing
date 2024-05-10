struct A {
  // other types can reference interfaces before they are defined
  field0: IShape;
}

// type annotations can reference interfaces before they are defined
let a: IShape? = nil;

interface IShape {
    // method with a return type
    method1(): str;
    // method with a void return type
    method2(): void;
    // method with a return type of the interface type
    method3(): IShape;
}

interface IPointy {
    method2(): void;
}

interface ISquare extends IShape, IPointy {
    
}

class C {}

// interfaces can reference classes
interface IClass {
    method1(): C;
    // method2(): D; // TODO: not supported yet - classes are not hoisted
}

class D {}

// mutually referential interfaces
interface IThing1 {
  m2(): IThing2?;
}

interface IThing2 {
  m1(): IThing1?;
}
