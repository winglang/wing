use crate::{ast::*, type_check::Types};
use serde_json::json;
use std::{collections::BTreeMap, fs};
use wingii::jsii;

/// generates a JSII manifest for the given scope
pub fn jsiiify(scope: &Scope, types: &Types) -> String {
	let mut jsii_types: BTreeMap<String, serde_json::Value> = BTreeMap::new();
	for statement in scope.statements.iter() {
		match statement {
			Statement::VariableDef { .. } => {}
			Statement::FunctionDefinition(func_def) => match func_def.signature.flight {
				Flight::In => {}
				Flight::Pre => {}
			},
			Statement::Class {
				constructor,
				is_resource,
				members,
				methods,
				name,
				parent,
			} => {
				assert!(!is_resource, "resources are not supported yet");
				let manifest = jsii::ClassType {
					abstract_: Some(false),
					assembly: "wingc".to_string(),
					base: if parent.is_some() {
						None
					} else {
						None
					},
					docs: None,
					fqn: format!("wingc.{}", name.name),
					interfaces: None,
					kind: "class".to_string(),
					namespace: None,
					location_in_module: None,
					symbol_id: None,
					name: name.name.to_string(),
					initializer: Some(jsii::Callable {
						docs: None,
						location_in_module: None,
						overrides: None,
						protected: None,
						variadic: None,
						parameters: Some(
							constructor
								.parameters
								.iter()
								.map(|param| jsii::Parameter {
									docs: None,
									name: param.name.to_string(),
									optional: None,
									type_: json!({ "primitive": "any" }),
									variadic: None,
								})
								.collect(),
						),
					}),
					properties: Some(
						members
							.iter()
							.map(|member| jsii::Property {
								docs: None,
								location_in_module: None,
								name: member.name.name.to_string(),
								optional: None,
								protected: None,
								abstract_: None,
								const_: None,
								immutable: None,
								overrides: None,
								static_: None,
								type_: json!({ "primitive": "any" }),
							})
							.collect(),
					),
					methods: Some(
						methods
							.iter()
							.map(|method| jsii::Method {
								docs: None,
								async_: None,
								variadic: None,
								location_in_module: None,
                // remove everything after first space (?)
								name: method.name.name.to_string(),
								protected: None,
								abstract_: None,
								overrides: None,
								static_: None,
								returns: Some(jsii::OptionalValue {
									optional: None,
									type_: json!({ "primitive": "any" }),
								}),
								parameters: Some(
									method
										.parameters
										.iter()
										.map(|param| jsii::Parameter {
											docs: None,
											name: param.name.to_string(),
											optional: None,
											type_: json!({ "primitive": "any" }),
											variadic: None,
										})
										.collect(),
								),
							})
							.collect(),
					),
				};
				jsii_types.insert(name.name.clone(), serde_json::to_value(manifest).unwrap());
			}
			Statement::Struct { extends, members, name } => {
				let manifest = jsii::ClassType {
					abstract_: Some(false),
					base: match extends.len() {
						0 => None,
						1 => Some(extends[0].name.clone()),
						_ => panic!("multi inheritance not supported yet"),
					},
					assembly: "wing".to_string(),
					docs: None,
					fqn: format!("wing.{}", name.name),
					initializer: None,
					interfaces: None,
					kind: "class".to_string(),
					location_in_module: None,
					name: name.name.clone(),
					namespace: None,
					symbol_id: None,
					methods: None,
					properties: Some(
						members
							.iter()
							.map(|member| jsii::Property {
								abstract_: None,
								docs: None,
								immutable: Some(true),
								location_in_module: None,
								name: member.name.name.clone(),
								optional: None,
								overrides: None,
								protected: None,
								const_: None,
								static_: None,
								type_: json!({
									"primitive": "any"
								}),
							})
							.collect(),
					),
				};
				jsii_types.insert(name.name.clone(), serde_json::to_value(manifest).unwrap());
			}
			_ => {}
		}
	}
	let assembly = jsii::Assembly {
		name: "wing".to_string(),
		version: "0.1.0".to_string(),
		description: "description".to_string(),
		homepage: "homepage".to_string(),
		license: "MIT".to_string(),
		repository: jsii::AssemblyRepository {
			directory: None,
			type_: "git".to_string(),
			url: "#blank".to_string(),
		},
		author: jsii::Person {
			email: None,
			name: "wingc".to_string(),
			organization: None,
			url: None,
			roles: vec![],
		},
		fingerprint: "fingerprint".to_string(),
		jsii_version: "3.20.120".to_string(),
		schema: "jsii/0.10.0".to_string(),
		targets: None,
		types: Some(jsii_types),
		bin: None,
		bundled: None,
		contributors: None,
		dependencies: None,
		dependency_closure: None,
		docs: None,
		keywords: None,
		metadata: None,
		readme: None,
		submodules: None,
	};
	return serde_json::to_string_pretty(&assembly).unwrap();
}
