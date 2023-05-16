use itertools::Itertools;
use lsp_types::{Range, Url};

use crate::diagnostic::Diagnostics;

lazy_static! {
	static ref NOTIFICATION_TYPE_LOG: Vec<u8> = "window/logMessage".to_string().into_bytes();
	static ref NOTIFICATION_TYPE_DIAGNOSTIC: Vec<u8> = "textDocument/publishDiagnostics".to_string().into_bytes();
}

#[cfg(target_arch = "wasm32")]
extern "C" {
	pub fn send_notification(
		notification_type: *const u8,
		notification_type_length: u32,
		data: *const u8,
		data_length: u32,
	);
}

/// Sends a notification to the client, not part of the typical request/response cycle.
/// On wasm32, this is expected to be implemented by whatever is consuming wingc.
/// On other targets, this panics.
#[cfg(not(target_arch = "wasm32"))]
pub unsafe fn send_notification(
	notification_type: *const u8,
	notification_type_length: u32,
	data: *const u8,
	data_length: u32,
) {
	let notification_type = std::str::from_utf8(std::slice::from_raw_parts(
		notification_type,
		notification_type_length as usize,
	))
	.unwrap();
	let data = std::str::from_utf8(std::slice::from_raw_parts(data, data_length as usize)).unwrap();
	panic!(
		"send_notification called on non-wasm32 target: {} {}",
		notification_type, data
	);
}

pub fn send_diagnostics(uri: &Url, diagnostics: &Diagnostics) {
	let final_diags = diagnostics
		.iter()
		.filter(|item| item.span.is_some())
		.map(|item| {
			let span = item.span.as_ref().unwrap();
			let start_position = span.start.into();
			let end_position = span.end.into();
			lsp_types::Diagnostic::new_simple(Range::new(start_position, end_position), item.message.clone())
		})
		.collect_vec();

	let notification = serde_json::json!({
		"uri": uri,
		"diagnostics": final_diags,
	});

	unsafe {
		let json = serde_json::to_string(&notification).unwrap();
		let notif_type = NOTIFICATION_TYPE_DIAGNOSTIC.clone().leak();
		send_notification(
			notif_type.as_ptr(),
			notif_type.len() as u32,
			json.as_ptr(),
			json.len() as u32,
		);
	}
}
