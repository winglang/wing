/// This file is autogenerated by schemafy based on the jsii manifest json schema from @jsii/spec
use serde::{Deserialize, Serialize};

#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
#[serde(untagged)]
pub enum JsiiFile {
	Assembly(Assembly),
	AssemblyRedirect(AssemblyRedirect),
}

#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct AssemblyRedirect {
	pub compression: String,
	pub filename: String,
	pub schema: String,
}

#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct AssemblyRepository {
	#[doc = " If the package is not in the root directory (for example, when part"]
	#[doc = " of a monorepo), you should specify the directory in which it lives."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub directory: Option<String>,
	#[doc = " The type of the repository (``git``, ``svn``, ...)"]
	#[serde(rename = "type")]
	pub type_: String,
	#[doc = " The URL of the repository."]
	pub url: String,
}
#[doc = " A JSII assembly specification."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct Assembly {
	#[doc = " The main author of this package."]
	pub author: Person,
	#[doc = " List of bin-scripts"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub bin: Option<::std::collections::BTreeMap<String, String>>,
	#[doc = " List if bundled dependencies (these are not expected to be jsii"]
	#[doc = " assemblies)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub bundled: Option<::std::collections::BTreeMap<String, String>>,
	#[doc = " Additional contributors to this package."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub contributors: Option<Vec<Person>>,
	#[doc = " Direct dependencies on other assemblies (with semver), the key is the JSII"]
	#[doc = " assembly name, and the value is a SemVer expression."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub dependencies: Option<::std::collections::BTreeMap<String, String>>,
	#[doc = " Target configuration for all the assemblies that are direct or transitive"]
	#[doc = " dependencies of this assembly. This is needed to generate correct native"]
	#[doc = " type names for any transitively inherited member, in certain languages."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "dependencyClosure")]
	pub dependency_closure: Option<::std::collections::BTreeMap<String, DependencyConfiguration>>,
	#[doc = " Description of the assembly, maps to \"description\" from package.json"]
	#[doc = " This is required since some package managers (like Maven) require it."]
	pub description: String,
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " A fingerprint that can be used to determine if the specification has"]
	#[doc = " changed."]
	pub fingerprint: String,
	#[doc = " The url to the project homepage. Maps to \"homepage\" from package.json."]
	pub homepage: String,
	#[doc = " The version of the jsii compiler that was used to produce this Assembly."]
	#[serde(rename = "jsiiVersion")]
	pub jsii_version: String,
	#[doc = " Keywords that help discover or identify this packages with respects to it's"]
	#[doc = " intended usage, audience, etc... Where possible, this will be rendered in"]
	#[doc = " the corresponding metadata section of idiomatic package manifests, for"]
	#[doc = " example NuGet package tags."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub keywords: Option<Vec<String>>,
	#[doc = " The SPDX name of the license this assembly is distributed on."]
	pub license: String,
	#[doc = " Arbitrary key-value pairs of metadata, which the maintainer chose to"]
	#[doc = " document with the assembly. These entries do not carry normative"]
	#[doc = " semantics and their interpretation is up to the assembly maintainer."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub metadata: Option<::std::collections::BTreeMap<String, serde_json::Value>>,
	#[doc = " The name of the assembly"]
	pub name: String,
	#[doc = " The readme document for this module (if any)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub readme: Option<ReadMe>,
	#[doc = " The module repository, maps to \"repository\" from package.json"]
	#[doc = " This is required since some package managers (like Maven) require it."]
	pub repository: AssemblyRepository,
	#[doc = " The version of the spec schema"]
	pub schema: String,
	#[doc = " Submodules declared in this assembly."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub submodules: Option<::std::collections::BTreeMap<String, Submodule>>,
	#[doc = " A map of target name to configuration, which is used when generating"]
	#[doc = " packages for various languages."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub targets: Option<AssemblyTargets>,
	#[doc = " All types in the assembly, keyed by their fully-qualified-name"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub types: Option<::std::collections::BTreeMap<String, Type>>,
	#[doc = " The version of the assembly"]
	pub version: String,
}
#[doc = " Configurable targets for an asembly."]
pub type AssemblyTargets =
	::std::collections::BTreeMap<String, ::std::collections::BTreeMap<String, serde_json::Value>>;
#[doc = " An Initializer or a Method."]
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct Callable {
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
	#[doc = " The FQN of the parent type (class or interface) that this entity"]
	#[doc = " overrides or implements. If undefined, then this entity is the first in"]
	#[doc = " it's hierarchy to declare this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub overrides: Option<String>,
	#[doc = " The parameters of the Initializer or Method."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub parameters: Option<Vec<Parameter>>,
	#[doc = " Indicates if this Initializer or Method is protected (otherwise it is"]
	#[doc = " public, since private members are not modeled)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub protected: Option<bool>,
	#[doc = " Indicates whether this Initializer or Method is variadic or not. When"]
	#[doc = " ``true``, the last element of ``#parameters`` will also be flagged"]
	#[doc = " ``#variadic``."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub variadic: Option<bool>,
}
#[doc = " Represents classes."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct ClassType {
	#[doc = " Indicates if this class is an abstract class."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "abstract")]
	pub abstract_: Option<bool>,
	#[doc = " The name of the assembly the type belongs to."]
	pub assembly: String,
	#[doc = " The FQN of the base class of this class, if it has one."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub base: Option<String>,
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " The fully qualified name of the type (``<assembly>.<namespace>.<name>``)"]
	pub fqn: String,
	#[doc = " Initializer (constructor) method."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub initializer: Option<Callable>,
	#[doc = " The FQNs of the interfaces this class implements, if any."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub interfaces: Option<Vec<String>>,
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
	#[doc = " List of methods."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub methods: Option<Vec<Method>>,
	#[doc = " The simple name of the type (MyClass)."]
	pub name: String,
	#[doc = " The namespace of the type (`foo.bar.baz`)."]
	#[doc = " "]
	#[doc = " When undefined, the type is located at the root of the assembly (its"]
	#[doc = " `fqn` would be like `<assembly>.<name>`)."]
	#[doc = " "]
	#[doc = " For types inside other types or inside submodules, the `<namespace>` corresponds to"]
	#[doc = " the namespace-qualified name of the container (can contain multiple segments like:"]
	#[doc = " `<ns1>.<ns2>.<ns3>`)."]
	#[doc = " "]
	#[doc = " In all cases:"]
	#[doc = " "]
	#[doc = "  <fqn> = <assembly>[.<namespace>].<name>"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub namespace: Option<String>,
	#[doc = " List of properties."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub properties: Option<Vec<Property>>,
	#[doc = " Unique string representation of the corresponding Typescript symbol"]
	#[doc = " "]
	#[doc = " Used to map from TypeScript code back into the assembly."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "symbolId")]
	pub symbol_id: Option<String>,
}
#[doc = " Kinds of collections."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub enum CollectionKind {
	#[serde(rename = "array")]
	Array,
	#[serde(rename = "map")]
	Map,
}
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct CollectionTypeReferenceCollection {
	#[doc = " The type of an element (map keys are always strings)."]
	pub elementtype: TypeReference,
	#[doc = " The kind of collection."]
	pub kind: CollectionKind,
}
#[doc = " Reference to a collection type."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct CollectionTypeReference {
	pub collection: CollectionTypeReferenceCollection,
}
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct DependencyConfiguration {
	#[serde(skip_serializing_if = "Option::is_none")]
	pub submodules: Option<::std::collections::BTreeMap<String, Targetable>>,
	#[doc = " A map of target name to configuration, which is used when generating"]
	#[doc = " packages for various languages."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub targets: Option<AssemblyTargets>,
}
#[doc = " Key value pairs of documentation nodes."]
#[doc = " Based on TSDoc."]
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct Docs {
	#[doc = " Custom tags that are not any of the default ones"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub custom: Option<::std::collections::BTreeMap<String, String>>,
	#[doc = " Description of the default"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub default: Option<String>,
	#[doc = " If present, this block indicates that an API item is no longer supported"]
	#[doc = " and may be removed in a future release.  The `@deprecated` tag must be"]
	#[doc = " followed by a sentence describing the recommended alternative."]
	#[doc = " Deprecation recursively applies to members of a container. For example,"]
	#[doc = " if a class is deprecated, then so are all of its members."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub deprecated: Option<String>,
	#[doc = " Example showing the usage of this API item"]
	#[doc = " "]
	#[doc = " Starts off in running text mode, may switch to code using fenced code"]
	#[doc = " blocks."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub example: Option<String>,
	#[doc = " Detailed information about an API item."]
	#[doc = " "]
	#[doc = " Either the explicitly tagged `@remarks` section, otherwise everything"]
	#[doc = " past the first paragraph if there is no `@remarks` tag."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub remarks: Option<String>,
	#[doc = " The `@returns` block for this doc comment, or undefined if there is not"]
	#[doc = " one."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub returns: Option<String>,
	#[doc = " A `@see` link with more information"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub see: Option<String>,
	#[doc = " Whether the API item is beta/experimental quality"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub stability: Option<String>,
	#[doc = " Whether this class or interface was intended to be subclassed/implemented"]
	#[doc = " by library users."]
	#[doc = " "]
	#[doc = " Classes intended for subclassing, and interfaces intended to be"]
	#[doc = " implemented by consumers, are held to stricter standards of API"]
	#[doc = " compatibility."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub subclassable: Option<bool>,
	#[doc = " Summary documentation for an API item."]
	#[doc = " "]
	#[doc = " The first part of the documentation before hitting a `@remarks` tags, or"]
	#[doc = " the first line of the doc comment block if there is no `@remarks` tag."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub summary: Option<String>,
}
#[doc = " Represents a member of an enum."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct EnumMember {
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " The name/symbol of the member."]
	pub name: String,
}
#[doc = " Represents an enum type."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct EnumType {
	#[doc = " The name of the assembly the type belongs to."]
	pub assembly: String,
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " The fully qualified name of the type (``<assembly>.<namespace>.<name>``)"]
	pub fqn: String,
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
	#[doc = " Members of the enum."]
	pub members: Vec<EnumMember>,
	#[doc = " The simple name of the type (MyClass)."]
	pub name: String,
	#[doc = " The namespace of the type (`foo.bar.baz`)."]
	#[doc = " "]
	#[doc = " When undefined, the type is located at the root of the assembly (its"]
	#[doc = " `fqn` would be like `<assembly>.<name>`)."]
	#[doc = " "]
	#[doc = " For types inside other types or inside submodules, the `<namespace>` corresponds to"]
	#[doc = " the namespace-qualified name of the container (can contain multiple segments like:"]
	#[doc = " `<ns1>.<ns2>.<ns3>`)."]
	#[doc = " "]
	#[doc = " In all cases:"]
	#[doc = " "]
	#[doc = "  <fqn> = <assembly>[.<namespace>].<name>"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub namespace: Option<String>,
	#[doc = " Unique string representation of the corresponding Typescript symbol"]
	#[doc = " "]
	#[doc = " Used to map from TypeScript code back into the assembly."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "symbolId")]
	pub symbol_id: Option<String>,
}
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct InterfaceType {
	#[doc = " The name of the assembly the type belongs to."]
	pub assembly: String,
	#[doc = " True if this interface only contains properties. Different backends might"]
	#[doc = " have idiomatic ways to allow defining concrete instances such interfaces."]
	#[doc = " For example, in Java, the generator will produce a PoJo and a builder"]
	#[doc = " which will allow users to create a concrete object with data which"]
	#[doc = " adheres to this interface."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub datatype: Option<bool>,
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " The fully qualified name of the type (``<assembly>.<namespace>.<name>``)"]
	pub fqn: String,
	#[doc = " The FQNs of the interfaces this interface extends, if any."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub interfaces: Option<Vec<String>>,
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
	#[doc = " List of methods."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub methods: Option<Vec<Method>>,
	#[doc = " The simple name of the type (MyClass)."]
	pub name: String,
	#[doc = " The namespace of the type (`foo.bar.baz`)."]
	#[doc = " "]
	#[doc = " When undefined, the type is located at the root of the assembly (its"]
	#[doc = " `fqn` would be like `<assembly>.<name>`)."]
	#[doc = " "]
	#[doc = " For types inside other types or inside submodules, the `<namespace>` corresponds to"]
	#[doc = " the namespace-qualified name of the container (can contain multiple segments like:"]
	#[doc = " `<ns1>.<ns2>.<ns3>`)."]
	#[doc = " "]
	#[doc = " In all cases:"]
	#[doc = " "]
	#[doc = "  <fqn> = <assembly>[.<namespace>].<name>"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub namespace: Option<String>,
	#[doc = " List of properties."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub properties: Option<Vec<Property>>,
	#[doc = " Unique string representation of the corresponding Typescript symbol"]
	#[doc = " "]
	#[doc = " Used to map from TypeScript code back into the assembly."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "symbolId")]
	pub symbol_id: Option<String>,
}
#[doc = " A method with a name (i.e: not an initializer)."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct Method {
	#[doc = " Is this method an abstract method (this means the class will also be an abstract class)"]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "abstract")]
	pub abstract_: Option<bool>,
	#[doc = " Indicates if this is an asynchronous method (it will return a promise)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "async")]
	pub async_: Option<bool>,
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
	#[doc = " The name of the method. Undefined if this method is a initializer."]
	pub name: String,
	#[doc = " The FQN of the parent type (class or interface) that this entity"]
	#[doc = " overrides or implements. If undefined, then this entity is the first in"]
	#[doc = " it's hierarchy to declare this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub overrides: Option<String>,
	#[doc = " The parameters of the Initializer or Method."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub parameters: Option<Vec<Parameter>>,
	#[doc = " Indicates if this Initializer or Method is protected (otherwise it is"]
	#[doc = " public, since private members are not modeled)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub protected: Option<bool>,
	#[doc = " The return type of the method (`undefined` if `void`)"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub returns: Option<OptionalValue>,
	#[doc = " Indicates if this is a static method."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "static")]
	pub static_: Option<bool>,
	#[doc = " Indicates whether this Initializer or Method is variadic or not. When"]
	#[doc = " ``true``, the last element of ``#parameters`` will also be flagged"]
	#[doc = " ``#variadic``."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub variadic: Option<bool>,
}
#[doc = " Reference to a named type, defined by this assembly or one of its"]
#[doc = " dependencies."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct NamedTypeReference {
	#[doc = " The fully-qualified-name of the type (can be located in the"]
	#[doc = " ``spec.types[fqn]``` of the assembly that defines the type)."]
	pub fqn: String,
}
#[doc = " A value that can possibly be optional."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct OptionalValue {
	#[doc = " Determines whether the value is, indeed, optional."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub optional: Option<bool>,
	#[doc = " The declared type of the value, when it's present."]
	#[serde(rename = "type")]
	pub type_: TypeReference,
}
#[doc = " Represents a method parameter."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct Parameter {
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " The name of the parameter."]
	pub name: String,
	#[doc = " Determines whether the value is, indeed, optional."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub optional: Option<bool>,
	#[doc = " The declared type of the value, when it's present."]
	#[serde(rename = "type")]
	pub type_: TypeReference,
	#[doc = " Whether this is the last parameter of a variadic method. In such cases,"]
	#[doc = " the `#type` attribute is the type of each individual item of the variadic"]
	#[doc = " arguments list (as opposed to some array type, as for example TypeScript"]
	#[doc = " would model it)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub variadic: Option<bool>,
}
#[doc = " Metadata about people or organizations associated with the project that"]
#[doc = " resulted in the Assembly. Some of this metadata is required in order to"]
#[doc = " publish to certain package repositories (for example, Maven Central), but is"]
#[doc = " not normalized, and the meaning of fields (role, for example), is up to each"]
#[doc = " project maintainer."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct Person {
	#[doc = " The email of the person"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub email: Option<String>,
	#[doc = " The name of the person"]
	pub name: String,
	#[doc = " If true, this person is, in fact, an organization"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub organization: Option<bool>,
	#[doc = " A list of roles this person has in the project, for example `maintainer`,"]
	#[doc = " `contributor`, `owner`, ..."]
	pub roles: Vec<String>,
	#[doc = " The URL for the person"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub url: Option<String>,
}
#[doc = " Kinds of primitive types."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub enum PrimitiveType {
	#[serde(rename = "any")]
	Any,
	#[serde(rename = "boolean")]
	Boolean,
	#[serde(rename = "date")]
	Date,
	#[serde(rename = "json")]
	Json,
	#[serde(rename = "number")]
	Number,
	#[serde(rename = "string")]
	String,
}
#[doc = " Reference to a primitive type."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct PrimitiveTypeReference {
	#[doc = " If this is a reference to a primitive type, this will include the"]
	#[doc = " primitive type kind."]
	pub primitive: PrimitiveType,
}
#[doc = " A class property."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct Property {
	#[doc = " Indicates if this property is abstract"]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "abstract")]
	pub abstract_: Option<bool>,
	#[doc = " A hint that indicates that this static, immutable property is initialized"]
	#[doc = " during startup. This allows emitting \"const\" idioms in different target"]
	#[doc = " languages. Implies `static` and `immutable`."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "const")]
	pub const_: Option<bool>,
	#[doc = " Documentation for this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub docs: Option<Docs>,
	#[doc = " Indicates if this property only has a getter (immutable)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub immutable: Option<bool>,
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
	#[doc = " The name of the property."]
	pub name: String,
	#[doc = " Determines whether the value is, indeed, optional."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub optional: Option<bool>,
	#[doc = " The FQN of the parent type (class or interface) that this entity"]
	#[doc = " overrides or implements. If undefined, then this entity is the first in"]
	#[doc = " it's hierarchy to declare this entity."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub overrides: Option<String>,
	#[doc = " Indicates if this property is protected (otherwise it is public)"]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub protected: Option<bool>,
	#[doc = " Indicates if this is a static property."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "static")]
	pub static_: Option<bool>,
	#[doc = " The declared type of the value, when it's present."]
	#[serde(rename = "type")]
	pub type_: TypeReference,
}
#[doc = " README information"]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct ReadMe {
	pub markdown: String,
}
#[doc = " Elements that can contain a `readme` property."]
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct ReadMeContainer {
	#[doc = " The readme document for this module (if any)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub readme: Option<ReadMe>,
}
#[doc = " Indicates that an entity has a source location"]
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct SourceLocatable {
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
}
#[doc = " Where in the module source the definition for this API item was found"]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct SourceLocation {
	#[doc = " Relative filename"]
	pub filename: String,
	#[doc = " 1-based line number in the indicated file"]
	pub line: f64,
}
#[doc = " A submodule"]
#[doc = " "]
#[doc = " The difference between a top-level module (the assembly) and a submodule is"]
#[doc = " that the submodule is annotated with its location in the repository."]
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct Submodule {
	#[doc = " Where in the module this definition was found"]
	#[doc = " "]
	#[doc = " Why is this not `locationInAssembly`? Because the assembly is the JSII"]
	#[doc = " file combining compiled code and its manifest, whereas this is referring"]
	#[doc = " to the location of the source in the module the assembly was built from."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "locationInModule")]
	pub location_in_module: Option<SourceLocation>,
	#[doc = " The readme document for this module (if any)."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub readme: Option<ReadMe>,
	#[doc = " Unique string representation of the corresponding Typescript symbol"]
	#[doc = " "]
	#[doc = " Used to map from TypeScript code back into the assembly."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "symbolId")]
	pub symbol_id: Option<String>,
	#[doc = " A map of target name to configuration, which is used when generating"]
	#[doc = " packages for various languages."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub targets: Option<AssemblyTargets>,
}
#[doc = " A targetable module-like thing"]
#[doc = " "]
#[doc = " Has targets and a readme. Used for Assemblies and Submodules."]
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct Targetable {
	#[doc = " A map of target name to configuration, which is used when generating"]
	#[doc = " packages for various languages."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub targets: Option<AssemblyTargets>,
}
#[doc = " Represents a type definition (not a type reference)."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
#[serde(tag = "kind")]
pub enum Type {
	#[serde(rename = "class")]
	ClassType(ClassType),
	#[serde(rename = "enum")]
	EnumType(EnumType),
	#[serde(rename = "interface")]
	InterfaceType(InterfaceType),
}
#[doc = " A reference to a type (primitive, collection or fqn)."]
pub type TypeReference = serde_json::Value;
#[doc = " Indicates that a jsii entity's origin can be traced to TypeScript code"]
#[doc = " "]
#[doc = " This is interface is not the same as `SourceLocatable`. SourceLocatable"]
#[doc = " identifies lines in source files in a source repository (in a `.ts` file,"]
#[doc = " with respect to a git root)."]
#[doc = " "]
#[doc = " On the other hand, `TypeScriptLocatable` identifies a symbol name inside a"]
#[doc = " potentially distributed TypeScript file (in either a `.d.ts` or `.ts`"]
#[doc = " file, with respect to the package root)."]
#[derive(Clone, PartialEq, Debug, Default, Deserialize, Serialize)]
pub struct TypeScriptLocatable {
	#[doc = " Unique string representation of the corresponding Typescript symbol"]
	#[doc = " "]
	#[doc = " Used to map from TypeScript code back into the assembly."]
	#[serde(skip_serializing_if = "Option::is_none")]
	#[serde(rename = "symbolId")]
	pub symbol_id: Option<String>,
}
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct UnionTypeReferenceUnion {
	#[doc = " All the possible types (including the primary type)."]
	pub types: Vec<TypeReference>,
}
#[doc = " Reference to a union type."]
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct UnionTypeReference {
	#[doc = " Indicates that this is a union type, which means it can be one of a set"]
	#[doc = " of types."]
	pub union: UnionTypeReferenceUnion,
}
#[derive(Clone, PartialEq, Debug, Deserialize, Serialize)]
pub struct JsiiRepository {
	#[doc = " If the package is not in the root directory (for example, when part"]
	#[doc = " of a monorepo), you should specify the directory in which it lives."]
	#[serde(skip_serializing_if = "Option::is_none")]
	pub directory: Option<String>,
	#[doc = " The type of the repository (``git``, ``svn``, ...)"]
	#[serde(rename = "type")]
	pub type_: String,
	#[doc = " The URL of the repository."]
	pub url: String,
}
