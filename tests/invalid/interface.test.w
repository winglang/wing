bring "jsii-fixture" as jsii_fixture;

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
                      // Interface "ISomeInterface (at ../../tests/invalid/interface.w:21:11)" extends "ISomeClass", which is not an interface
}

// interface with multiple methods having the same name, different signature
interface IWithSameName {
    foo(): void;
    foo(): void;
 // ^^^ Symbol "foo" already defined in this scope
    foo(): num;
 // ^^^ Symbol "foo" already defined in this scope
}

interface INoProps {
  bar: str;
//^^^^^^^^ interfaces can't have properties 
}

// interfaces can't have access modifiers in their method signatures
interface IPointy {
  pub method2(): str;  
//^^^ Access modifiers are not allowed in interfaces
}

// interface parameters must have types
interface IMissingParamTypes {
  method1(a, b): void;
  //^ Expected type annotation
}

// Can't implement preflight interface on inflight class
interface IPreflight {
  method1(): void;
}
inflight class CImplPreflightIface impl IPreflight {
  pub method1(): void {}
}

// Can't extend preflight interface on inflight interface
inflight interface IInflightExtendsPreflight extends IPreflight {
  method2(): void;
}

// Inflight interfaces can't extend JSII interfaces
inflight interface IInflightExtendsJsii extends jsii_fixture.ISomeInterface {
  method(): void;
}

// Inflight classes can't implement JSII interfaces
inflight class CInflightImplJsii impl jsii_fixture.ISomeInterface {
  pub method(): void {}
}