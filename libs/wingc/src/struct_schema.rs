use crate::{
	ast::{Reference, Scope},
	jsify::{JSifier, JSifyContext},
	type_check::{is_udt_struct_type, resolve_user_defined_type, Struct},
	visit::{self, Visit},
	visit_context::VisitContext,
};

pub struct StructSchemaVisitor<'a> {
	jsify: &'a JSifier<'a>,
	ctx: VisitContext,
}

impl<'a> StructSchemaVisitor<'a> {
	pub fn new(jsifier: &'a JSifier<'a>) -> Self {
		Self {
			jsify: jsifier,
			ctx: VisitContext::new(),
		}
	}

	fn jsify_struct(&self, struct_: &Struct) {
		let res = self.jsify.jsify_struct(
			struct_,
			&mut JSifyContext {
				lifts: None,
				visit_ctx: &mut VisitContext::new(),
			},
		);

		self.jsify.emit_struct_file(&struct_.name.name, res);
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
					self.jsify_struct(type_.unwrap().as_struct().unwrap());
				}
				visit::visit_reference(self, node);
			}
			Reference::Identifier(_) => {
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
