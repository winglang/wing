use crate::{
	ast::Symbol,
	closure_transform::CLOSURE_CLASS_PREFIX,
	type_check::{Class, FunctionSignature, Interface, Struct, Type, TypeRef, Types, CLOSURE_CLASS_HANDLE_METHOD},
};

pub struct InferenceVisitor<'a> {
	pub types: &'a mut Types,
	pub expected_type: Option<&'a TypeRef>,
	pub found_inference: bool,
}

impl<'a> crate::visit_types::VisitTypeMut<'_> for InferenceVisitor<'a> {
	fn visit_typeref_mut(&mut self, node: &'_ mut TypeRef) {
		if matches!(**node, Type::Inferred(_)) {
			*node = self.types.maybe_unwrap_inference(*node);
		} else {
			crate::visit_types::visit_typeref_mut(self, node);
		}
	}

	// structs and interfaces cannot have inferences
	fn visit_interface_mut(&mut self, _node: &'_ mut Interface) {}
	fn visit_struct_mut(&mut self, _node: &'_ mut Struct) {}

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
				| Type::Json
				| Type::MutJson
				| Type::Nil
				| Type::Unresolved
				| Type::Function(_)
				| Type::Class(_)
				| Type::Interface(_)
				| Type::Struct(_)
				| Type::Enum(_) => {}

				Type::Inferred(_) => {
					// Inferences are not a useful expected type
					self.expected_type = None;
				}
			}
		}

		crate::visit_types::visit_typeref(self, node);
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
			expected.as_deep_function_sig()
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

	fn visit_inference(&mut self, node: &'_ usize) {
		self.found_inference = true;

		if let Some(expected) = self.expected_type {
			self.types.update_inferred_type(*node, *expected);
		}
	}
}
