use std::collections::BTreeMap;

use itertools::Itertools;

use crate::{
	ast::Phase,
	jsify::codemaker::CodeMaker,
	type_check::{
		jsii_importer::is_construct_base, Class, FunctionSignature, Interface, Namespace, Struct, SymbolKind, Type,
		TypeRef, VariableInfo,
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
	fn render_docs(&self) -> String;
}

impl Docs {
	pub(crate) fn with_summary(summary: &str) -> Docs {
		Docs {
			summary: Some(summary.to_string()),
			..Default::default()
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
			Type::Function(f) => render_function(f),
			Type::Class(c) => render_class(c),
			Type::Interface(i) => render_interface(i),
			Type::Struct(s) => render_struct(s),
			Type::Optional(t) => t.render_docs(),

			// primitive types don't have docs yet
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
			| Type::Array(_)
			| Type::MutArray(_)
			| Type::Map(_)
			| Type::MutMap(_)
			| Type::Set(_)
			| Type::MutSet(_)
			// TODO enums may have docs
			| Type::Enum(_) => "".to_string(),
		}
	}
}

impl Documented for VariableInfo {
	fn render_docs(&self) -> String {
		let mut modifiers = vec![];

		if self.is_member && self.is_static {
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

		let mut markdown = CodeMaker::default();
		markdown.line("```wing");
		markdown.line(format!("{modifiers_str} {}: {}", self.name, self.type_.to_string()));
		markdown.line("```");
		markdown.line("---");

		let type_docs = self.type_.render_docs();

		if !type_docs.is_empty() {
			markdown.line(type_docs);
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
		markdown.line("```wing");
		markdown.line(s);
		markdown.line("```");
	}

	markdown.empty_line();

	if let Some(_) = &docs.deprecated {
		markdown.line("@deprecated");
	}

	docs.custom.iter().for_each(|(k, v)| {
		// skip "@inflight" because it is already included in the type system
		if k == "inflight" {
			return;
		}
		if k == "macro" {
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

fn render_function(f: &FunctionSignature) -> String {
	let mut markdown = CodeMaker::default();

	if let Some(s) = &f.docs.summary {
		markdown.line(s);
	}

	if has_parameters_documentation(f) {
		markdown.empty_line();
		markdown.line("### Parameters");

		for p in &f.parameters {
			let summary = if let Some(s) = &p.docs.summary {
				format!(" - {}", s)
			} else {
				String::default()
			};

			markdown.line(format!(" - *{}*{}", p.name, summary));
		}
	}

	render_docs(&mut markdown, &f.docs);

	markdown.to_string().trim().to_string()
}

fn has_parameters_documentation(f: &FunctionSignature) -> bool {
	f.parameters.iter().any(|p| p.docs.summary.is_some())
}

fn render_struct(s: &Struct) -> String {
	let mut markdown = CodeMaker::default();

	markdown.line("```wing");
	markdown.line(format!("{}", s.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &s.docs.summary {
		markdown.line(s);
	}

	render_docs(&mut markdown, &s.docs);

	markdown.to_string().trim().to_string()
}

fn render_interface(i: &Interface) -> String {
	let mut markdown = CodeMaker::default();

	markdown.line("```wing");
	markdown.line(format!("{}", i.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &i.docs.summary {
		markdown.line(s);
	}

	render_docs(&mut markdown, &i.docs);

	markdown.to_string().trim().to_string()
}

fn render_class(c: &Class) -> String {
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

	// if let Some(initializer) = c.get_init() {
	// 	let rfn = initializer.render_docs();
	// 	markdown.line(rfn);
	// }

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
