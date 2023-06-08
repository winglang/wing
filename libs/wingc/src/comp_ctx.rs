use std::{
	backtrace::{Backtrace, BacktraceStatus},
	cell::RefCell,
};

use colored::Colorize;
use strum::{Display, EnumString};

use crate::diagnostic::{report_diagnostic, Diagnostic, WingSpan};

/// The different phases of compilation, used for tracking compilation context
/// for diagnostic purposes. Feel free to add new phases as needed.
/// Try to make these end with 'ing' (building, parsing, etc.) so they'll fit in
/// in the context of a diagnostic message.
/// See `CompilationContext::set` for more information.
#[derive(EnumString, Display, PartialEq, Clone, Copy)]
#[strum(serialize_all = "kebab-case")]
pub enum CompilationPhase {
	Compiling,
	Parsing,
	TypeChecking,
	Jsifying,
}

impl Default for CompilationPhase {
	fn default() -> Self {
		CompilationPhase::Compiling
	}
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

/// Macro used for explicit panics if the environment variable `WINGC_DEBUG_PANIC` is set.
/// This can be used if we want to conditionally panic in certain situations.
/// This is a macro and not a function so we can get the location of the caller
/// in the panic message.
#[macro_export]
macro_rules! dbg_panic {
	() => {{
		|| -> () {
			// Get environment variable to see if we should panic or not
			let Ok(dbg_panic) = std::env::var("WINGC_DEBUG_PANIC") else { return; };

			if dbg_panic == "1"
				|| dbg_panic == "true"
				|| (dbg_panic
					.parse::<$crate::comp_ctx::CompilationPhase>()
					.map(|p| p == $crate::comp_ctx::CompilationContext::get_phase())
					.unwrap_or(false))
			{
				panic!("User invoked panic");
			}
		}();
	}};
}

pub fn set_custom_panic_hook() {
	std::panic::set_hook(Box::new(|pi| {
		eprintln!(
			"Compiler bug when {} {} | {}\nPlease report this bug at https://docs.winglang.io/contributors/bugs",
			CompilationContext::get_phase(),
			CompilationContext::get_span(),
			pi.to_string().bold().white()
		);

		// Print backtrace if RUST_BACKTRACE=1
		let bt = Backtrace::capture();
		if bt.status() == BacktraceStatus::Captured {
			eprintln!("Backtrace:\n{}", bt);
		}

		report_diagnostic(Diagnostic {
    	message: format!(
				"Compiler bug during {}, please report with stack trace (run with RUST_BACKTRACE=1) at https://docs.winglang.io/contributors/bugs", 
				CompilationContext::get_phase()
			),
    	span: Some(CompilationContext::get_span()),
		})
	}));
}
