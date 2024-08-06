use duplicate::duplicate_item;

use crate::type_check::{
	Class, FunctionSignature, InferenceId, Interface, JsonData, JsonDataKind, Struct, SymbolKind, Type, TypeRef,
};

#[duplicate_item(
  VisitType visit_typeref visit_class visit_function_signature visit_struct visit_interface visit_inference visit_json node_reference(type);
  [VisitType] [visit_typeref] [visit_class] [visit_function_signature] [visit_struct] [visit_interface] [visit_inference] [visit_json] [&'a type];
  [VisitTypeMut] [visit_typeref_mut] [visit_class_mut] [visit_function_signature_mut] [visit_struct_mut] [visit_interface_mut] [visit_inference_mut] [visit_json_mut] [&'a mut type];
)]
pub trait VisitType<'a> {
	fn visit_typeref(&mut self, node: node_reference([TypeRef])) {
		visit_typeref(self, node);
	}
	fn visit_class(&mut self, node: node_reference([Class])) {
		visit_class(self, node);
	}
	fn visit_function_signature(&mut self, node: node_reference([FunctionSignature])) {
		visit_function_signature(self, node);
	}
	fn visit_struct(&mut self, node: node_reference([Struct])) {
		visit_struct(self, node);
	}
	fn visit_interface(&mut self, node: node_reference([Interface])) {
		visit_interface(self, node);
	}
	fn visit_inference(&mut self, node: node_reference([InferenceId])) {
		visit_inference(self, node);
	}
	fn visit_json(&mut self, node: node_reference([JsonData])) {
		visit_json(self, node);
	}
}

#[duplicate_item(
  VisitType visit_typeref visit_class visit_function_signature visit_struct visit_interface visit_inference visit_json node_match(node) node_reference(type) node_unwrap(node);
  [VisitType] [visit_typeref] [visit_class] [visit_function_signature] [visit_struct] [visit_interface] [visit_inference] [visit_json] [&node] [&'a type] [node];
  [VisitTypeMut] [visit_typeref_mut] [visit_class_mut] [visit_function_signature_mut] [visit_struct_mut] [visit_interface_mut] [visit_inference_mut] [visit_json_mut] [&mut node] [&'a mut type] [ref mut node];
)]
pub fn visit_typeref<'a, V>(v: &mut V, node: node_reference([TypeRef]))
where
	V: VisitType<'a> + ?Sized,
{
	match node_match([**node]) {
		Type::Anything
		| Type::Number
		| Type::String
		| Type::Duration
		| Type::Datetime
		| Type::Regex
		| Type::Boolean
		| Type::Void
		| Type::Json(None)
		| Type::MutJson
		| Type::Nil
		| Type::Unresolved
		| Type::Enum(_)
		| Type::Stringable => {}

		Type::Inferred(node_unwrap([n])) => {
			v.visit_inference(n);
		}

		Type::Optional(node_unwrap([t]))
		| Type::Array(node_unwrap([t]))
		| Type::MutArray(node_unwrap([t]))
		| Type::Map(node_unwrap([t]))
		| Type::MutMap(node_unwrap([t]))
		| Type::Set(node_unwrap([t]))
		| Type::MutSet(node_unwrap([t])) => {
			v.visit_typeref(t);
		}

		Type::Json(Some(node_unwrap([data]))) => {
			v.visit_json(data);
		}

		Type::Function(node_unwrap([function_sig])) => {
			v.visit_function_signature(function_sig);
		}
		Type::Class(node_unwrap([class])) => {
			v.visit_class(class);
		}
		Type::Interface(node_unwrap([interface])) => {
			v.visit_interface(interface);
		}
		Type::Struct(node_unwrap([s])) => {
			v.visit_struct(s);
		}
	}
}

pub fn visit_function_signature<'a, V>(v: &mut V, node: &'a FunctionSignature)
where
	V: VisitType<'a> + ?Sized,
{
	for param in &node.parameters {
		v.visit_typeref(&param.typeref);
	}

	v.visit_typeref(&node.return_type);
}

pub fn visit_json<'a, V>(v: &mut V, node: &'a JsonData)
where
	V: VisitType<'a> + ?Sized,
{
	match &node.kind {
		JsonDataKind::Type(t) => v.visit_typeref(&t.type_),
		JsonDataKind::Fields(fields) => {
			for field in fields.values() {
				v.visit_typeref(&field.type_);
			}
		}
		JsonDataKind::List(list) => {
			for item in list {
				v.visit_typeref(&item.type_);
			}
		}
	};
}

pub fn visit_json_mut<'a, V>(v: &mut V, node: &'a mut JsonData)
where
	V: VisitTypeMut<'a> + ?Sized,
{
	match &mut node.kind {
		JsonDataKind::Type(t) => v.visit_typeref_mut(&mut t.type_),
		JsonDataKind::Fields(fields) => {
			for field in fields.values_mut() {
				v.visit_typeref_mut(&mut field.type_);
			}
		}
		JsonDataKind::List(list) => {
			for item in list {
				v.visit_typeref_mut(&mut item.type_);
			}
		}
	};
}

pub fn visit_class<'a, V>(v: &mut V, node: &'a Class)
where
	V: VisitType<'a> + ?Sized,
{
	for variable in node.env.symbol_map.values() {
		if let SymbolKind::Variable(variable) = &variable.kind {
			v.visit_typeref(&variable.type_);
		}
	}
}

pub fn visit_struct<'a, V>(v: &mut V, node: &'a Struct)
where
	V: VisitType<'a> + ?Sized,
{
	for field in node.env.symbol_map.values() {
		if let SymbolKind::Variable(variable) = &field.kind {
			v.visit_typeref(&variable.type_);
		}
	}
}

pub fn visit_interface<'a, V>(v: &mut V, node: &'a Interface)
where
	V: VisitType<'a> + ?Sized,
{
	for field in node.env.symbol_map.values() {
		if let SymbolKind::Variable(variable) = &field.kind {
			v.visit_typeref(&variable.type_);
		}
	}
}

pub fn visit_inference<'a, V>(_v: &mut V, _node: &'a InferenceId)
where
	V: VisitType<'a> + ?Sized,
{
}

pub fn visit_function_signature_mut<'a, V>(v: &mut V, node: &'a mut FunctionSignature)
where
	V: VisitTypeMut<'a> + ?Sized,
{
	for param in node.parameters.iter_mut() {
		v.visit_typeref_mut(&mut param.typeref);
	}

	v.visit_typeref_mut(&mut node.return_type);
}

pub fn visit_class_mut<'a, V>(v: &mut V, node: &'a mut Class)
where
	V: VisitTypeMut<'a> + ?Sized,
{
	for variable in node.env.symbol_map.values_mut() {
		if let SymbolKind::Variable(ref mut variable) = variable.kind {
			v.visit_typeref_mut(&mut variable.type_);
		}
	}
}

pub fn visit_struct_mut<'a, V>(v: &mut V, node: &'a mut Struct)
where
	V: VisitTypeMut<'a> + ?Sized,
{
	for field in node.env.symbol_map.values_mut() {
		if let SymbolKind::Variable(ref mut variable) = field.kind {
			v.visit_typeref_mut(&mut variable.type_);
		}
	}
}

pub fn visit_interface_mut<'a, V>(v: &mut V, node: &'a mut Interface)
where
	V: VisitTypeMut<'a> + ?Sized,
{
	for field in node.env.symbol_map.values_mut() {
		if let SymbolKind::Variable(ref mut variable) = field.kind {
			v.visit_typeref_mut(&mut variable.type_);
		}
	}
}

pub fn visit_inference_mut<'a, V>(_v: &mut V, _node: &'a mut InferenceId)
where
	V: VisitTypeMut<'a> + ?Sized,
{
}
