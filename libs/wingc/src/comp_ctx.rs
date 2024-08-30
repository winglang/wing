use std::{
	backtrace::{Backtrace, BacktraceStatus},
	cell::RefCell,
};

use strum::{Display, EnumString};

use crate::diagnostic::{report_diagnostic, Diagnostic, DiagnosticSeverity, WingSpan};

/// The different phases of compilation, used for tracking compilation context
/// for diagnostic purposes. Feel free to add new phases as needed.
/// Try to make these end with 'ing' (building, parsing, etc.) so they'll fit in
/// in the context of a diagnostic message.
/// See `CompilationContext::set` for more information.
#[derive(EnumString, Display, PartialEq, Clone, Copy, Debug, Default)]
#[strum(serialize_all = "kebab-case")]
pub enum CompilationPhase {
	#[default]
	Compiling,
	Parsing,
	TypeChecking,
	Lifting,
	Jsifying,
}

pub struct CompilationContext {
	/// Description of current compilation phase
	pub phase: CompilationPhase,

	/// Location in source we're currently processing
	pub span: WingSpan,
}

thread_local! {
	pub static COMPILATION_CONTEXT: RefCell<CompilationContext> = RefCell::new(CompilationContext {
		phase: CompilationPhase::default(),
		span: WingSpan::default(),
	});
}

impl CompilationContext {
	/// Set global information about the current compilation phase.
	/// This is used for diagnostics, specifically for custom panic messages.
	///
	/// # Arguments
	///
	/// * `phase` - Description of current compilation phase.
	/// * `span` - Location in source we're currently processing.
	pub fn set(phase: CompilationPhase, span: &WingSpan) {
		COMPILATION_CONTEXT.with(|c| {
			c.replace_with(|_| CompilationContext {
				phase,
				span: span.clone(),
			});
		});
	}

	pub fn get_phase() -> CompilationPhase {
		COMPILATION_CONTEXT.with(|c| c.borrow().phase)
	}

	fn get_span() -> WingSpan {
		COMPILATION_CONTEXT.with(|c| c.borrow().span.clone())
	}
}

pub fn set_custom_panic_hook() {
	std::panic::set_hook(Box::new(|info| {
		let bt = Backtrace::capture();
		if bt.status() == BacktraceStatus::Captured {
			eprintln!("Panic backtrace:\n{}", bt);
		} else {
			eprintln!("Panic message:\n{}", info.to_string());
		}

		report_diagnostic(Diagnostic {
			message: format!(
				"Compiler bug during {} ('{}'), please report at https://www.winglang.io/contributing/start-here/bugs",
				CompilationContext::get_phase(),
				info,
			),
			span: Some(CompilationContext::get_span()),
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		})
	}));
}
