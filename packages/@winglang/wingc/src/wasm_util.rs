pub static WASM_RETURN_ERROR: u64 = 0;

/// Convert pointer and length into utf8 str represented by the bytes
pub unsafe fn ptr_to_str(ptr: u32, len: u32) -> &'static str {
	let slice = std::slice::from_raw_parts(ptr as *const u8, len as usize);
	std::str::from_utf8_unchecked(slice)
}

/// Convert String into a pointer (32 bit) and length (32 bit) combined into a single 64-bit value
pub unsafe fn string_to_combined_ptr(str: String) -> u64 {
	let leaked = str.into_bytes().leak();
	combine_ptr_and_length(leaked.as_ptr() as u32, leaked.len() as u32)
}

/// Uses bitshift to combine pointer and length into a single value
pub fn combine_ptr_and_length(ptr: u32, len: u32) -> u64 {
	return ((ptr as u64) << 32_u64) | (len as u64);
}

/// Convert pointer and length representing JSON string into deserialized object
pub fn parse_json_string<'a, TRequest>(ptr: u32, len: u32) -> Result<TRequest, u64>
where
	TRequest: serde::Deserialize<'a>,
{
	let parse_string = unsafe { ptr_to_str(ptr, len) };
	if let Ok(parsed) = serde_json::from_str(parse_string) {
		Ok(parsed)
	} else {
		Err(WASM_RETURN_ERROR)
	}
}

/// Wrapper for common pattern of exporting a function that uses JSON as the communication format between a WASM host and Rust
pub fn extern_json_fn<'a, TRequest, TResponse>(ptr: u32, len: u32, func: fn(TRequest) -> TResponse) -> u64
where
	TRequest: serde::Deserialize<'a>,
	TResponse: serde::Serialize,
{
	let parsed = parse_json_string::<TRequest>(ptr, len);
	if let Ok(parsed) = parsed {
		let result = func(parsed);

		if let Ok(json_string) = serde_json::to_string(&result) {
			unsafe { string_to_combined_ptr(json_string) }
		} else {
			WASM_RETURN_ERROR
		}
	} else {
		WASM_RETURN_ERROR
	}
}
