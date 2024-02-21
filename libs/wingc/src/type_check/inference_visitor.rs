use crate::{
	ast::Symbol,
	closure_transform::CLOSURE_CLASS_PREFIX,
	diagnostic::WingSpan,
	type_check::{
		Class, FunctionSignature, InferenceId, Interface, JsonData, JsonDataKind, Struct, Type, TypeRef, Types,
		CLOSURE_CLASS_HANDLE_METHOD,
	},
	visit_types::visit_json,
};

/// Deeply visits a type and finds any inferences that can be resolved.
pub struct InferenceVisitor<'a> {
	/// Used for updating or unwrapping known inferences
	pub types: &'a mut Types,
	/// The expected type of the current node.
	/// This changes as the visitor traverses a type to match any unwrapping of types (e.g. Map<T> -> T)
	pub expected_type: Option<&'a TypeRef>,
	/// Whether or not we found an inference during the entire visit
	pub found_inference: bool,
	/// The span of interest for the given type
	pub span: &'a WingSpan,
}

impl<'a> crate::visit_types::VisitTypeMut<'_> for InferenceVisitor<'a> {
	fn visit_typeref_mut(&mut self, node: &'_ mut TypeRef) {
		if node.is_inferred() {
			*node = self.types.maybe_unwrap_inference(*node);

			// we unwrapped a known inference, we should try again to continue this process if needed
			if !node.is_inferred() {
				self.visit_typeref_mut(node)
			}
		} else {
			crate::visit_types::visit_typeref_mut(self, node);
		}
	}

	// structs and interfaces cannot have inferences
	fn visit_interface_mut(&mut self, _node: &'_ mut Interface) {}
	fn visit_struct_mut(&mut self, _node: &'_ mut Struct) {}
	fn visit_json_mut(&mut self, node: &'_ mut JsonData) {
		match &mut node.kind {
			JsonDataKind::Type(t) => {
				self.visit_typeref_mut(&mut t.type_);
			}
			JsonDataKind::Fields(fields) => {
				for field in fields.values_mut() {
					self.visit_typeref_mut(&mut field.type_);
				}
			}
			JsonDataKind::List(list) => {
				for item in list {
					self.visit_typeref_mut(&mut item.type_);
				}
			}
		}
	}

	fn visit_class_mut(&mut self, node: &'_ mut Class) {
		// We only care about visiting a class if it represent an inflight closure, where inference is possible.
		// In which case, we need to visit the function signature of the handle method
		if node.name.name.starts_with(CLOSURE_CLASS_PREFIX) {
			if let Some(handle) = node.env.lookup_mut(&Symbol::global(CLOSURE_CLASS_HANDLE_METHOD), None) {
				self.visit_typeref_mut(&mut handle.as_variable_mut().unwrap().type_);
			}
		}
	}

	fn visit_function_signature_mut(&mut self, node: &'_ mut FunctionSignature) {
		for param in node.parameters.iter_mut() {
			self.visit_typeref_mut(&mut param.typeref);
		}

		self.visit_typeref_mut(&mut node.return_type);
	}
}

impl<'a> crate::visit_types::VisitType<'_> for InferenceVisitor<'a> {
	fn visit_typeref(&mut self, node: &'_ TypeRef) {
		if let Some(expected) = self.expected_type {
			match &**expected {
				// unwrap the simple "wrapper" types to correspond to diving into the actual type we're looking at
				Type::Optional(t)
				| Type::Array(t)
				| Type::MutArray(t)
				| Type::Map(t)
				| Type::MutMap(t)
				| Type::Set(t)
				| Type::MutSet(t) =>
				// If the type we're looking at is also a wrapper type, then we need to unwrap it
				{
					match &**node {
						Type::Optional(_)
						| Type::Array(_)
						| Type::MutArray(_)
						| Type::Map(_)
						| Type::MutMap(_)
						| Type::Set(_)
						| Type::MutSet(_) => {
							self.expected_type = Some(t);
						}
						_ => {}
					}
				}

				Type::Anything
				| Type::Number
				| Type::String
				| Type::Duration
				| Type::Boolean
				| Type::Void
				| Type::Json(_)
				| Type::MutJson
				| Type::Nil
				| Type::Unresolved
				| Type::Function(_)
				| Type::Class(_)
				| Type::Struct(_)
				| Type::Interface(_)
				| Type::Enum(_)
				| Type::Inferred(_) => {}
			}
		}

		crate::visit_types::visit_typeref(self, node);
	}

	fn visit_json(&mut self, node: &'_ JsonData) {
		match &node.kind {
			JsonDataKind::Type(_) => {
				visit_json(self, node);
			}
			JsonDataKind::Fields(fields) => {
				let expected_struct = self.expected_type.and_then(|t| t.as_struct());
				for field in fields {
					self.expected_type = None;
					if let Some(expected) = expected_struct {
						if let Some(expected_field) = expected.env.lookup(field.0, None) {
							self.expected_type = Some(&expected_field.as_variable().unwrap().type_);
						}
					}
					self.visit_typeref(&field.1.type_);
				}
			}
			JsonDataKind::List(list) => {
				for item in list {
					self.visit_typeref(&item.type_);
				}
			}
		}
	}

	// structs and interfaces cannot have inferences
	fn visit_interface(&mut self, _node: &'_ Interface) {}
	fn visit_struct(&mut self, _node: &'_ Struct) {}

	fn visit_class(&mut self, node: &'_ Class) {
		// We only care about visiting a class if it represent an inflight closure, where inference is possible.
		// In which case, we need to visit the function signature of the handle method
		if let Some(method) = node.get_closure_method() {
			self.visit_typeref(&method);
		}
	}

	fn visit_function_signature(&mut self, node: &'_ FunctionSignature) {
		let expected_function_sig = if let Some(ref expected) = self.expected_type {
			expected.maybe_unwrap_option().as_deep_function_sig()
		} else {
			None
		};

		for (idx, param) in node.parameters.iter().enumerate() {
			self.expected_type = expected_function_sig.and_then(|f| f.parameters.get(idx).map(|p| &p.typeref));
			self.visit_typeref(&param.typeref);
		}

		self.expected_type = expected_function_sig.map(|f| &f.return_type);
		self.visit_typeref(&node.return_type);
	}

	fn visit_inference(&mut self, node: &'_ InferenceId) {
		self.found_inference = true;

		if let Some(expected) = self.expected_type {
			self.types.update_inferred_type(*node, *expected, self.span);
		}
	}
}

#[derive(Default)]
/// Deeply visits a type and finds any inferences.
pub struct InferenceCounterVisitor {
	/// Whether or not we found an inference during the entire visit
	pub found_inference: bool,

	/// Whether or not we found an inference during the entire visit
	pub found_inferences: Vec<InferenceId>,
}

impl crate::visit_types::VisitType<'_> for InferenceCounterVisitor {
	// structs and interfaces cannot have inferences
	fn visit_interface(&mut self, _node: &'_ Interface) {}
	fn visit_struct(&mut self, _node: &'_ Struct) {}

	fn visit_class(&mut self, node: &'_ Class) {
		// We only care about visiting a class if it represent an inflight closure, where inference is possible.
		// In which case, we need to visit the function signature of the handle method
		if let Some(method) = node.get_closure_method() {
			self.visit_typeref(&method);
		}
	}

	fn visit_inference(&mut self, node: &'_ InferenceId) {
		self.found_inference = true;
		self.found_inferences.push(*node);
	}
}
