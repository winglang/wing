bring "jsii-fixture" as jsii_fixture;

new jsii_fixture.JsiiClassWithPrivateConstructor();
// error: constructor is private and only accessible within class "JsiiClassWithPrivateConstructor"

jsii_fixture.JsiiClassWithPrivateConstructor.makeInstance(); // OK
