use camino::Utf8Path;

use crate::{
	ast::{Reference, Scope},
	jsify::JSifier,
	json_schema_generator::JsonSchemaGenerator,
	type_check::{is_udt_struct_type, resolve_user_defined_type},
	visit::{self, Visit},
	visit_context::VisitContext,
};

pub struct StructSchemaVisitor<'a> {
	jsify: &'a JSifier<'a>,
	path: &'a Utf8Path,
	ctx: VisitContext,
}

impl<'a> StructSchemaVisitor<'a> {
	pub fn new(path: &'a Utf8Path, jsifier: &'a JSifier<'a>) -> Self {
		Self {
			jsify: jsifier,
			ctx: VisitContext::new(),
			path,
		}
	}
}

// Looks for any references to a struct type, and emits a struct schema file for it.
impl<'a> Visit<'a> for StructSchemaVisitor<'a> {
	fn visit_reference(&mut self, node: &'a crate::ast::Reference) {
		match node {
			Reference::InstanceMember { .. } => {
				visit::visit_reference(self, node);
			}
			Reference::TypeMember { type_name, .. } => {
				if is_udt_struct_type(type_name, self.ctx.current_env().unwrap()) {
					let type_ = resolve_user_defined_type(type_name, self.ctx.current_env().unwrap(), 0);
					let schema_generator = JsonSchemaGenerator::new();
					let struct_code = schema_generator.create_from_struct(type_.unwrap().as_struct().unwrap());

					// add the schema to the jsifier's referenced struct schemas
					self
						.jsify
						.add_referenced_struct_schema(&self.path, type_name.clone().to_string(), struct_code);
				}
				visit::visit_reference(self, node);
			}
			Reference::Identifier(_) => {
				visit::visit_reference(self, node);
			}
			Reference::ElementAccess { .. } => {
				visit::visit_reference(self, node);
			}
		}
	}

	fn visit_scope(&mut self, node: &'a Scope) {
		self.ctx.push_env(self.jsify.types.get_scope_env(&node));
		visit::visit_scope(self, node);
		self.ctx.pop_env();
	}
}
