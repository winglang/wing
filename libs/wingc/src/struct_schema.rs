use crate::{
	ast::{Reference, Scope},
	jsify::{codemaker::CodeMaker, JSifier, JSifyContext},
	type_check::{is_udt_struct_type, resolve_user_defined_type, Struct, symbol_env::SymbolEnv, Type, UnsafeRef},
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

	fn jsify_struct(&self, struct_: &Struct) -> CodeMaker {
		self.jsify_struct_schema(struct_, self.ctx.current_env().unwrap())
	}

  fn jsify_struct_schema_required_fields(&self, env: &SymbolEnv) -> CodeMaker {
    let mut code = CodeMaker::default();
		code.open("required: [");
		for (field_name, (_stmt_idx, kind)) in env.symbol_map.iter() {
			if !matches!(*kind.as_variable().unwrap().type_, Type::Optional(_)) {
				code.line(format!("\"{}\",", field_name));
			}
		}
		code.close("]");
		code
  }

  fn jsify_struct_schema_field(&self, typ: &UnsafeRef<Type>, env: &SymbolEnv) -> String {
    match **typ {
			Type::String | Type::Number | Type::Boolean => {
				format!("{{ type: \"{}\" }}", self.jsify.jsify_type(typ).unwrap())
			}
			Type::Struct(ref s) => {
				let mut code = CodeMaker::default();
				code.open("{");
				code.line("type: \"object\",");
				code.open("properties: {");
				code.add_code(self.jsify_struct_env_properties(&s.env));
				code.close("},");
				code.add_code(self.jsify_struct_schema_required_fields(&s.env));
				code.close("}");
				code.to_string().strip_suffix("\n").unwrap().to_string()
			}
			Type::Array(ref t) | Type::Set(ref t) => {
				let mut code = CodeMaker::default();
				code.open("{");

				code.line("type: \"array\",");

				if matches!(**typ, Type::Set(_)) {
					code.line("uniqueItems: true,");
				}

				code.line(format!("items: {}", self.jsify_struct_schema_field(t, env)));

				code.close("}");
				code.to_string().strip_suffix("\n").unwrap().to_string()
			}
			Type::Map(ref t) => {
				let mut code = CodeMaker::default();
				code.open("{");

				code.line("type: \"object\",");
				code.line(format!(
					"patternProperties: {{ \".*\": {} }}",
					self.jsify_struct_schema_field(t, env)
				));

				code.close("}");
				code.to_string().strip_suffix("\n").unwrap().to_string()
			}
			Type::Optional(t) => self.jsify_struct_schema_field(&t, env),
			Type::Json(_) => "{ type: \"object\" }".to_string(),
			_ => "{ type: \"null\" }".to_string(),
		}
  }

  fn jsify_struct_env_properties(&self, env: &SymbolEnv) -> CodeMaker {
    let mut code = CodeMaker::default();
		for (field_name, (.., kind)) in env.symbol_map.iter() {
			code.line(format!(
				"{}: {},",
				field_name,
				self.jsify_struct_schema_field(&kind.as_variable().unwrap().type_, env)
			));
		}
		code
  }

  fn jsify_struct_schema(&self, struct_: &Struct, env: &SymbolEnv) -> CodeMaker {
    let mut code = CodeMaker::default();

		code.open("module.exports = function(stdStruct) {".to_string());
		code.open(format!("class {} {{", struct_.name));

		code.open("static jsonSchema() {".to_string());
		code.open("return {");

		code.line(format!("id: \"/{}\",", struct_.name));
		code.line("type: \"object\",".to_string());

		code.open("properties: {");

		code.add_code(self.jsify_struct_env_properties(&struct_.env));

		//close properties
		code.close("},");

		code.add_code(self.jsify_struct_schema_required_fields(&struct_.env));

		// close return
		code.close("}");

		// close schema
		code.close("}");

		// create _validate() function
		code.open("static fromJson(obj) {");
		code.line("return stdStruct._validate(obj, this.jsonSchema())");
		code.close("}");

		// create _toInflightType function that just requires the generated struct file
		code.open("static _toInflightType(context) {".to_string());
		code.line(format!(
			"return `require(\"./${{require('path').basename(__filename)}}\")(${{ context._lift(stdStruct) }})`;",
		));
		code.close("}");

		// close class
		code.close("}");
		// close module.exports

		code.line(format!("return {};", struct_.name.name));
		code.close("};");

		code
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
					let struct_code = self.jsify_struct(
            type_.unwrap().as_struct().unwrap()
          );
					self.jsify.emit_struct_file(
						&self.jsify.jsify_user_defined_type(
							type_name,
							&mut JSifyContext {
								lifts: None,
								visit_ctx: &mut VisitContext::new(),
							},
							self.ctx.current_env().unwrap(),
						),
						struct_code,
					);
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