use std::collections::BTreeMap;

use itertools::Itertools;

use crate::{
	ast::{AccessModifier, Phase, Symbol},
	closure_transform::CLOSURE_CLASS_PREFIX,
	jsify::codemaker::CodeMaker,
	type_check::{
		jsii_importer::is_construct_base, Class, ClassLike, Enum, FunctionSignature, Interface, Namespace, Struct,
		SymbolKind, Type, TypeRef, VariableInfo, VariableKind, CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME,
	},
};

const FIELD_HEADER: &'static str = "### Fields";
const METHOD_HEADER: &'static str = "### Methods";
const PARAMETER_HEADER: &'static str = "### Parameters";

#[derive(Debug, Default, Clone)]
pub struct Docs {
	pub summary: Option<String>,
	pub remarks: Option<String>,
	pub example: Option<String>,

	pub returns: Option<String>,
	pub deprecated: Option<String>,
	pub see: Option<String>,

	pub custom: BTreeMap<String, String>,

	// ---
	pub default: Option<String>,
	pub stability: Option<String>,
	pub subclassable: Option<bool>,
}

pub trait Documented {
	fn render_docs(&self) -> String;
}

impl Docs {
	pub(crate) fn with_summary(summary: &str) -> Docs {
		Docs {
			summary: Some(summary.to_string()),
			..Default::default()
		}
	}

	pub fn as_jsdoc_comment(&self) -> Option<String> {
		let mut markdown = CodeMaker::default();
		let mut has_data = false;
		markdown.line("/** ");

		if let Some(s) = &self.summary {
			has_data = true;
			markdown.append(s);
		}

		if let Some(s) = &self.remarks {
			has_data = true;
			markdown.line(s);
		}

		if let Some(s) = &self.example {
			has_data = true;
			markdown.line(s);
		}

		if let Some(s) = &self.returns {
			has_data = true;
			markdown.line(format!("@returns {s}"));
		}

		if let Some(s) = &self.deprecated {
			has_data = true;
			markdown.line(format!("@deprecated {s}"));
		}

		if let Some(s) = &self.see {
			has_data = true;
			markdown.line(format!("@see {s}"));
		}

		if has_data {
			markdown.append(" */");
			Some(markdown.to_string())
		} else {
			None
		}
	}
}

impl Documented for SymbolKind {
	fn render_docs(&self) -> String {
		match self {
			SymbolKind::Type(t) => t.render_docs(),
			SymbolKind::Variable(v) => v.render_docs(),
			SymbolKind::Namespace(n) => n.render_docs(),
		}
	}
}

impl Documented for Namespace {
	fn render_docs(&self) -> String {
		format!("Module `{}`", self.name).to_string()
	}
}

impl Documented for TypeRef {
	fn render_docs(&self) -> String {
		match &**self {
			Type::Function(f) => f.render_docs(),
			Type::Class(c) => render_class(c),
			Type::Interface(i) => render_interface(i),
			Type::Struct(s) => render_struct(s),
			Type::Optional(t) => t.render_docs(),
			Type::Enum(e) => render_enum(e),

			// primitive types don't have docs yet
			Type::Anything
			| Type::Number
			| Type::String
			| Type::Duration
			| Type::Boolean
			| Type::Void
			| Type::Json(_)
			| Type::MutJson
			| Type::Nil
			| Type::Inferred(_)
			| Type::Unresolved
			| Type::Array(_)
			| Type::MutArray(_)
			| Type::Map(_)
			| Type::MutMap(_)
			| Type::Set(_)
			| Type::MutSet(_) => "".to_string(),
		}
	}
}

impl Documented for VariableInfo {
	fn render_docs(&self) -> String {
		let mut modifiers = vec![];

		if let VariableKind::StaticMember = self.kind {
			modifiers.push("static");
		}

		match self.phase {
			Phase::Inflight => modifiers.push("inflight"),
			Phase::Preflight => modifiers.push("preflight"),
			Phase::Independent => {}
		}

		if self.reassignable {
			modifiers.push("var");
		}

		let modifiers_str = modifiers.join(" ");
		let name_str = if modifiers.is_empty() {
			self.name.name.clone()
		} else {
			format!("{} {}", modifiers_str, self.name)
		};

		let mut markdown = CodeMaker::default();
		markdown.line("```wing");
		markdown.line(format!("{name_str}: {}", self.type_));

		let type_docs = self.type_.render_docs();

		if !type_docs.is_empty() {
			if type_docs.starts_with("```wing") {
				// skip the first line to combine the code block
				markdown.line(type_docs.lines().skip(1).join("\n"));
			} else {
				markdown.line("```");
				markdown.line("---");
				markdown.line(type_docs);
			}
		} else {
			markdown.line("```");

			if let Some(d) = &self.docs {
				markdown.line("---");

				if let Some(summary) = &d.summary {
					markdown.line(summary);
					markdown.empty_line();
				}

				render_docs(&mut markdown, d);
			}
		}

		markdown.to_string().trim().to_string()
	}
}

fn render_docs(markdown: &mut CodeMaker, docs: &Docs) {
	if let Some(s) = &docs.returns {
		markdown.empty_line();
		markdown.line("### Returns");
		markdown.line(s);
	}

	if let Some(s) = &docs.remarks {
		markdown.empty_line();
		markdown.line("### Remarks");
		markdown.line(s);
	}

	if let Some(s) = &docs.example {
		markdown.empty_line();
		markdown.line("### Example");
		// For now, the examples are all still in typescript
		markdown.line("```ts");
		markdown.line(s);
		markdown.line("```");
	}

	markdown.empty_line();

	if let Some(_) = &docs.deprecated {
		markdown.line("@deprecated");
	}

	docs.custom.iter().for_each(|(k, v)| {
		if matches!(
			k.as_str(),
			// Already included in wing's type system
			"inflight"
			// Implementation detail not needed for the user
			| "macro"
			// Psuedo-abstract marker, mostly useful internally
			| "abstract"
			// Marker type use, not for users
			| "skipDocs" | "wingType"
		) {
			return;
		}

		let value = if v == "true" {
			String::default()
		} else {
			format!("*{v}*")
		};
		markdown.line(format!("*@{}* {}", k, value));
	});

	if let Some(s) = &docs.see {
		markdown.empty_line();
		markdown.line(format!("See [{}]({})", s, s));
	}
}

fn render_signature_help(f: &FunctionSignature) -> String {
	let mut markdown = CodeMaker::default();

	for (param_idx, param) in f.parameters.iter().enumerate() {
		let param_type = param.typeref;
		let param_type_unwrapped = param.typeref.maybe_unwrap_option();
		let is_last = param_idx == f.parameters.len() - 1;

		let param_name = if param.name.is_empty() {
			format!("arg{}", param_idx)
		} else {
			param.name.clone()
		};
		let detail_text = if let Some(summary) = &param.docs.summary {
			format!("— `{param_type}` — {summary}")
		} else {
			format!("— `{param_type}`")
		};
		let is_last_struct = is_last && param_type_unwrapped.is_struct();
		let prefix = if param.variadic || is_last_struct { "..." } else { "" };

		if !is_last_struct {
			markdown.line(format!("- `{prefix}{param_name}` {detail_text}"));
		} else {
			markdown.line(format!("- `{prefix}{param_name}` {detail_text}"));

			let structy = param_type_unwrapped.as_struct().unwrap();
			let struct_text = render_classlike_members(structy);

			markdown.indent();
			markdown.line(struct_text.replace(FIELD_HEADER, ""));
			markdown.unindent();
		}
	}

	markdown.to_string().trim().to_string()
}

impl Documented for FunctionSignature {
	fn render_docs(&self) -> String {
		let mut markdown = CodeMaker::default();

		if let Some(s) = &self.docs.summary {
			markdown.line(s);
		}

		if self.parameters.len() > 0 {
			markdown.line(PARAMETER_HEADER);
			markdown.line(render_signature_help(self));
		}

		render_docs(&mut markdown, &self.docs);

		markdown.to_string().trim().to_string()
	}
}

fn render_struct(s: &Struct) -> String {
	let mut markdown = CodeMaker::default();

	let extends = s.extends.iter().map(ToString::to_string).join(", ");
	let extends = if extends.is_empty() {
		String::default()
	} else {
		format!(" extends {}", extends)
	};

	markdown.line("```wing");
	markdown.line(format!("struct {}{extends}", s.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &s.docs.summary {
		markdown.line(s);
	}

	markdown.line(render_classlike_members(s));

	render_docs(&mut markdown, &s.docs);

	markdown.to_string().trim().to_string()
}

fn render_interface(i: &Interface) -> String {
	let mut markdown = CodeMaker::default();

	let extends = i
		.extends
		.iter()
		.map(|i| render_typeref(&Some(*i)))
		.map(|i| i.unwrap_or_default())
		.collect_vec();

	let extends = if !extends.is_empty() {
		format!(" extends {}", extends.join(", "))
	} else {
		String::default()
	};

	markdown.line("```wing");
	markdown.line(format!("interface {}{extends}", i.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &i.docs.summary {
		markdown.line(s);
	}

	markdown.line(render_classlike_members(i));

	markdown.empty_line();

	render_docs(&mut markdown, &i.docs);

	markdown.to_string().trim().to_string()
}

fn render_enum(e: &Enum) -> String {
	let mut markdown = CodeMaker::default();

	markdown.line("```wing");
	markdown.line(format!("enum {}", e.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &e.docs.summary {
		markdown.line(s);
	}

	for prop in e.values.iter() {
		let value_doc = if let Some(doc) = prop.1.as_ref() {
			format!(" — {}", doc)
		} else {
			String::default()
		};
		markdown.line(&format!("- `{}{}`\n", prop.0, value_doc));
	}

	markdown.empty_line();

	render_docs(&mut markdown, &e.docs);

	markdown.to_string().trim().to_string()
}

fn render_class(c: &Class) -> String {
	if c.name.name.starts_with(CLOSURE_CLASS_PREFIX) {
		if let Some(closure) = c.get_closure_method() {
			return closure.maybe_unwrap_option().render_docs();
		}
	}

	let mut markdown = CodeMaker::default();

	markdown.line("```wing");

	let extends = if let Some(t) = render_typeref(&c.parent) {
		format!(" extends {}", t)
	} else {
		String::default()
	};

	let interfaces = c
		.implements
		.iter()
		.map(|i| render_typeref(&Some(*i)))
		.map(|i| i.unwrap_or_default())
		.collect_vec();

	let implements = if !interfaces.is_empty() {
		format!(" impl {}", interfaces.join(", "))
	} else {
		String::default()
	};

	markdown.line(format!("class {}{}{}", c.name, extends, implements));

	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &c.docs.summary {
		markdown.line(s);
	}
	render_docs(&mut markdown, &c.docs);

	if matches!(c.phase, Phase::Preflight | Phase::Independent) {
		if let Some(initializer) = c.get_method(&Symbol::global(CLASS_INIT_NAME)) {
			let function_sig = initializer.type_.as_function_sig().unwrap();
			if function_sig.parameters.len() > 0 {
				markdown.line("### Initializer");
				markdown.line(render_signature_help(&function_sig));
			}
		}
	}

	if let Some(initializer) = c.get_method(&Symbol::global(CLASS_INFLIGHT_INIT_NAME)) {
		let function_sig = initializer.type_.as_function_sig().unwrap();
		if function_sig.parameters.len() > 0 {
			markdown.line("### Initializer (`inflight`)");
			markdown.line(render_signature_help(&function_sig));
		}
	}

	markdown.line(render_classlike_members(c));

	markdown.to_string().trim().to_string()
}

fn render_classlike_members(classlike: &impl ClassLike) -> String {
	let mut field_markdown = CodeMaker::default();
	let mut method_markdown = CodeMaker::default();

	let public_member_variables = classlike
		.get_env()
		.iter(true)
		.flat_map(|f| if f.2.init { None } else { f.1.as_variable() })
		.filter(|v| v.access == AccessModifier::Public)
		// show optionals first, then sort alphabetically by name
		.sorted_by(|a, b| {
			let a_is_option = a.type_.is_option();
			let b_is_option = b.type_.is_option();
			a_is_option
				.cmp(&b_is_option)
				.then_with(|| a.name.name.cmp(&b.name.name))
		})
		.collect_vec();

	for member in public_member_variables {
		let member_type = member.type_;
		let option_text = if member_type.is_option() { "?" } else { "" };
		let member_name = &member.name.name;
		let member_docs = member.docs.as_ref().and_then(|d| d.summary.clone());
		let text = if let Some(member_docs) = member_docs {
			format!("- `{member_name}{option_text}` — `{member_type}` — {member_docs}")
		} else {
			format!("- `{member_name}{option_text}` — `{member_type}`")
		};

		if member_type.maybe_unwrap_option().is_function_sig() {
			if member.name.name == CLASS_INIT_NAME || member.name.name == CLASS_INFLIGHT_INIT_NAME {
				continue;
			}

			method_markdown.line(text);
		} else {
			field_markdown.line(text);
		}
	}

	let mut markdown = CodeMaker::default();

	if !field_markdown.is_empty() {
		markdown.line(FIELD_HEADER);
		markdown.add_code(field_markdown);
	}
	if !method_markdown.is_empty() {
		markdown.line(METHOD_HEADER);
		markdown.add_code(method_markdown);
	}

	markdown.to_string().trim().to_string()
}

fn render_typeref(typeref: &Option<TypeRef>) -> Option<String> {
	let Some(t) = typeref else {
		return None;
	};

	if let Some(class) = t.as_class() {
		// if the base class is "Resource" or "Construct" then we don't need to render it
		if let Some(fqn) = &class.fqn {
			if is_construct_base(&fqn) {
				return None;
			}
		}
	}

	// use TypeRef's Display trait to render the type
	Some(t.to_string())
}
