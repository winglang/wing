use std::{collections::BTreeMap, sync::OnceLock};

use itertools::Itertools;
use regex::Regex;

use crate::{
	ast::{AccessModifier, Phase},
	closure_transform::CLOSURE_CLASS_PREFIX,
	jsify::codemaker::CodeMaker,
	type_check::{
		jsii_importer::is_construct_base, symbol_env::SymbolEnvKind, Class, ClassLike, Enum, FunctionSignature, Interface,
		Namespace, Struct, SymbolKind, Type, TypeRef, VariableInfo, VariableKind, CLASS_INFLIGHT_INIT_NAME,
		CLASS_INIT_NAME,
	},
};

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
	fn docs(&self) -> Option<&Docs>;
	fn render_docs(&self) -> String;
}

impl Docs {
	pub fn render(&self) -> String {
		let mut markdown = CodeMaker::default();

		render_summary(&mut markdown, self);
		render_docs(&mut markdown, self);

		markdown.to_string().trim().to_string()
	}

	pub(crate) fn with_summary(summary: &str) -> Docs {
		Docs {
			summary: Some(summary.to_string()),
			..Default::default()
		}
	}

	pub fn as_jsdoc_comment(&self) -> Option<String> {
		let mut markdown = CodeMaker::default();
		let mut has_data = false;

		if let Some(_) = &self.summary {
			has_data = true;
			render_summary(&mut markdown, self);
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
			Some(format!("/** {} */", markdown.to_string()))
		} else {
			None
		}
	}
}

impl Documented for SymbolKind {
	fn docs(&self) -> Option<&Docs> {
		match self {
			SymbolKind::Type(t) => t.docs(),
			SymbolKind::Variable(v) => v.docs(),
			SymbolKind::Namespace(n) => n.docs(),
		}
	}

	fn render_docs(&self) -> String {
		match self {
			SymbolKind::Type(t) => {
				let mut markdown = CodeMaker::default();

				markdown.line("```wing");
				markdown.line(t.render_docs());
				markdown.line("```");

				if let Some(d) = t.docs() {
					if d.summary.is_some() {
						markdown.line("---");
					}

					render_summary(&mut markdown, d);
					render_docs(&mut markdown, d);
				}

				markdown.to_string().trim().to_string()
			}
			SymbolKind::Variable(v) => v.render_docs(),
			SymbolKind::Namespace(n) => n.render_docs(),
		}
	}
}

impl Documented for Namespace {
	fn render_docs(&self) -> String {
		format!("Module `{}`", self.name).to_string()
	}

	fn docs(&self) -> Option<&Docs> {
		None
	}
}

impl Documented for TypeRef {
	fn docs(&self) -> Option<&Docs> {
		match &**self {
			Type::Function(f) => Some(&f.docs),
			Type::Class(c) => Some(&c.docs),
			Type::Interface(i) => Some(&i.docs),
			Type::Struct(s) => Some(&s.docs),
			Type::Optional(t) => t.docs(),
			Type::Enum(e) => Some(&e.docs),

			Type::Anything
			| Type::Number
			| Type::String
			| Type::Duration
			| Type::Datetime
			| Type::Regex
			| Type::Boolean
			| Type::Void
			| Type::Json(_)
			| Type::Stringable
			| Type::MutJson
			| Type::Nil
			| Type::Inferred(_)
			| Type::Unresolved
			| Type::Array(_)
			| Type::MutArray(_)
			| Type::Map(_)
			| Type::MutMap(_)
			| Type::Set(_)
			| Type::MutSet(_) => None,
		}
	}

	fn render_docs(&self) -> String {
		if let Some(sig) = self.as_deep_function_sig() {
			return sig.render_docs();
		}

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
			| Type::Datetime
			| Type::Regex
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
			| Type::Stringable
			| Type::MutSet(_) => "".to_string(),
		}
	}
}

impl Documented for VariableInfo {
	fn docs(&self) -> Option<&Docs> {
		self.docs.as_ref()
	}

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

		let mut is_initializer = false;

		let modifiers_str = modifiers.join(" ");
		let name_str = if modifiers.is_empty() {
			self.name.name.clone()
		} else {
			if self.name.name == CLASS_INFLIGHT_INIT_NAME {
				is_initializer = true;
				"inflight new".to_string()
			} else if self.name.name == CLASS_INIT_NAME {
				is_initializer = true;
				"new".to_string()
			} else {
				format!("{} {}", modifiers_str, self.name)
			}
		};

		let mut markdown = CodeMaker::default();

		let mut docs = self.docs.as_ref().or_else(|| self.type_.docs());

		markdown.line("```wing");
		if let Some(sig) = self.type_.maybe_unwrap_option().as_function_sig() {
			if is_initializer {
				if let Some(d) = docs {
					if d.summary.is_none() {
						// Special case for constructors, just show the resulting type docs
						docs = sig.return_type.docs();
					}
				}
			}
			if matches!(self.kind, VariableKind::InstanceMember | VariableKind::StaticMember) {
				markdown.line(format!("{name_str}({}): {}", render_args(sig), sig.return_type));
			} else {
				markdown.line(format!("{name_str}: {}", self.type_));
			}
			markdown.line("```");
		} else {
			markdown.line(format!("{name_str}: "));
			let type_docs = self.type_.render_docs();
			if !type_docs.is_empty() {
				markdown.append(type_docs);
			} else {
				markdown.append(format!("{}", self.type_))
			}
			markdown.line("```");
		};

		if let Some(d) = docs {
			if d.summary.is_some() {
				markdown.line("---");
			}
			render_summary(&mut markdown, d);
			render_docs(&mut markdown, d);
		}

		markdown.to_string().trim().to_string()
	}
}

pub fn render_summary(markdown: &mut CodeMaker, docs: &Docs) {
	if let Some(s) = &docs.summary {
		markdown.line(fix_markdown_links(s));
	}
}

pub fn fix_markdown_links(s: &str) -> String {
	// Some JSII libraries use {@link URL LABEL} syntax for link, let's convert it to markdown syntax
	static LINK_REGEX: OnceLock<Regex> = OnceLock::new();
	LINK_REGEX
		.get_or_init(|| Regex::new(r"\{@link (\S+) ([^\}]+)\}").unwrap())
		.replace_all(s, |caps: &regex::Captures| format!("[{}]({})", &caps[2], &caps[1]))
		.to_string()
}

fn render_docs(markdown: &mut CodeMaker, docs: &Docs) {
	if let Some(s) = &docs.returns {
		markdown.empty_line();
		markdown.line("#### Returns");
		markdown.line(fix_markdown_links(s));
	}

	if let Some(s) = &docs.remarks {
		markdown.empty_line();
		markdown.line("#### Remarks");
		markdown.line(fix_markdown_links(s));
	}

	if let Some(s) = &docs.example {
		markdown.empty_line();
		markdown.line("#### Example");
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

fn render_args(f: &FunctionSignature) -> String {
	let mut args = vec![];

	for (param_idx, param) in f.parameters.iter().enumerate() {
		let param_type = param.typeref;
		let is_last = param_idx == f.parameters.len() - 1;

		let param_name = if param.name.is_empty() {
			format!("arg{}", param_idx)
		} else {
			param.name.clone()
		};
		let is_last_struct = is_last && param_type.maybe_unwrap_option().is_struct();
		let prefix = if param.variadic || is_last_struct { "..." } else { "" };

		args.push(format!("{prefix}{param_name}: {}", param.typeref));
	}

	args.join(", ")
}

impl Documented for FunctionSignature {
	fn docs(&self) -> Option<&Docs> {
		Some(&self.docs)
	}

	fn render_docs(&self) -> String {
		let phase = match self.phase {
			Phase::Inflight => "inflight ",
			Phase::Preflight | Phase::Independent => "",
		};

		format!("{phase}({}): {}", render_args(self), self.return_type)
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

	markdown.empty_line();
	markdown.open(format!("struct {}{extends} {{", s.name));

	markdown.line(render_classlike_members(s));

	markdown.close("}");

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

	markdown.open(format!("interface {}{extends} {{", i.name));

	markdown.line(render_classlike_members(i));

	markdown.close("}");

	markdown.to_string().trim().to_string()
}

fn render_enum(e: &Enum) -> String {
	let mut markdown = CodeMaker::default();

	markdown.open(format!("enum {} {{", e.name));

	if !e.values.is_empty() {
		for sym in e.values.keys() {
			markdown.line(format!("{sym},"));
		}
	}
	markdown.close("}");

	markdown.to_string().trim().to_string()
}

fn render_class(c: &Class) -> String {
	if c.name.name.starts_with(CLOSURE_CLASS_PREFIX) {
		if let Some(closure) = c.get_closure_method() {
			return closure.maybe_unwrap_option().render_docs();
		}
	}

	let mut markdown = CodeMaker::default();

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

	markdown.open(format!("class {}{}{} {{", c.name, extends, implements));

	markdown.line(render_classlike_members(c));

	markdown.close("}");

	markdown.to_string().trim().to_string()
}

fn render_classlike_members(classlike: &impl ClassLike) -> String {
	let mut field_markdown = CodeMaker::default();
	let mut method_markdown = CodeMaker::default();
	let classlike_phase = classlike.get_env().phase;

	let member_name_denylist = vec![CLASS_INIT_NAME, CLASS_INFLIGHT_INIT_NAME];

	let public_member_variables = classlike
		.get_env()
		.iter(true)
		.flat_map(|f| {
			if f.2.init {
				return None;
			}

			if f.2.access != AccessModifier::Public {
				return None;
			}

			if member_name_denylist.contains(&f.0.as_str()) {
				return None;
			}

			if let SymbolEnvKind::Type(t) = f.2.env.kind {
				if let Some(class) = t.as_class() {
					if let Some(fqn) = &class.fqn {
						if fqn.starts_with("constructs.") || is_construct_base(fqn) {
							return None;
						}
					}
				}
			}

			f.1.as_variable()
		})
		// Use the following ordering:
		// 1. optionals
		// 2. phase independent members
		// 3. phase matching classlike
		// 4. instance members
		// 5. fields
		// 6. methods
		.sorted_by(|a, b| {
			let a_is_optional = a.type_.is_option();
			let b_is_optional = b.type_.is_option();
			let a_is_independent = a.phase == Phase::Independent;
			let b_is_independent = b.phase == Phase::Independent;
			let a_is_classlike_phase = a.phase == classlike_phase;
			let b_is_classlike_phase = b.phase == classlike_phase;
			let a_is_instance = a.kind != VariableKind::StaticMember;
			let b_is_instance = b.kind != VariableKind::StaticMember;
			let a_is_field = !a.type_.maybe_unwrap_option().is_function_sig();
			let b_is_field = !b.type_.maybe_unwrap_option().is_function_sig();

			// 1. optionals
			if a_is_optional && !b_is_optional {
				return std::cmp::Ordering::Less;
			}
			if !a_is_optional && b_is_optional {
				return std::cmp::Ordering::Greater;
			}

			// 2. phase independent members
			if a_is_independent && !b_is_independent {
				return std::cmp::Ordering::Less;
			}
			if !a_is_independent && b_is_independent {
				return std::cmp::Ordering::Greater;
			}

			// 3. phase matching classlike
			if a_is_classlike_phase && !b_is_classlike_phase {
				return std::cmp::Ordering::Less;
			}
			if !a_is_classlike_phase && b_is_classlike_phase {
				return std::cmp::Ordering::Greater;
			}

			// 4. instance members
			if a_is_instance && !b_is_instance {
				return std::cmp::Ordering::Less;
			}
			if !a_is_instance && b_is_instance {
				return std::cmp::Ordering::Greater;
			}

			// 5. fields
			if a_is_field && !b_is_field {
				return std::cmp::Ordering::Less;
			}
			if !a_is_field && b_is_field {
				return std::cmp::Ordering::Greater;
			}

			// 6. methods
			std::cmp::Ordering::Equal
		})
		.collect_vec();

	for (idx, member) in public_member_variables.iter().enumerate() {
		if idx >= 6 {
			method_markdown.line("/* ... */");
			break;
		}

		let static_text = if matches!(member.kind, VariableKind::StaticMember) {
			"static "
		} else {
			""
		};
		let phase_text = if member.phase == classlike_phase {
			""
		} else {
			match member.phase {
				Phase::Inflight => "inflight ",
				Phase::Preflight => "preflight ",
				Phase::Independent => "",
			}
		};

		let member_type = member.type_;
		let option_text = if member_type.is_option() { "?" } else { "" };
		let member_name = &member.name.name;

		if let Some(member_sig) = member_type.maybe_unwrap_option().as_function_sig() {
			let arg_text = if member_sig.parameters.len() > 0 { "..." } else { "" };
			let text = format!(
				"{static_text}{phase_text}{member_name}{option_text}({arg_text}): {};",
				member_sig.return_type
			);
			method_markdown.line(text);
		} else {
			let text = format!(
				"{static_text}{phase_text}{member_name}{option_text}: {};",
				member_type.maybe_unwrap_option()
			);
			field_markdown.line(text);
		};
	}

	if field_markdown.is_empty() && method_markdown.is_empty() {
		return "// No public members".to_string();
	}

	let mut markdown = CodeMaker::default();

	if !field_markdown.is_empty() {
		markdown.add_code(field_markdown);
	}
	if !method_markdown.is_empty() {
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
