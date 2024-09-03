bring "@winglibs/testfixture" as fixture;

let e = fixture.FavoritePlanets.MARS;
// ^ Error: Cannot access internal enum 'FavoritePlanets'

class FakeClass impl fixture.InternalInterface {}
// ^ Error: Cannot access internal interface 'InternalInterface'

let i = new fixture.InternalClass();
// ^ Error: Cannot access internal class 'InternalClass'

fixture.PublicClass.internalStaticMethod();
// ^ Error: Cannot access internal method 'internalStaticMethod'

let p = new fixture.PublicClass();
p.internalField;
// ^ Error: Cannot access internal field 'internalField'

p.internalMethod();
// ^ Error: Cannot access internal method 'internalMethod'

let s = fixture.InternalStruct {};
// ^ Error: Cannot access internal struct 'InternalStruct'
