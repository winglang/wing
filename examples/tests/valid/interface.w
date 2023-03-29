// interface with reference to itself in one of the methods
// interface with 2 methods having the same name, different signature

interface IBla {
    method_1(): str;
    method_2();
}

interface IFurniture {
    method_2();
}

interface IAnimal extends IFurniture, IBla {
}
