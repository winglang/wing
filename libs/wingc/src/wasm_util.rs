pub static WASM_RETURN_ERROR: u64 = 0;

/// Convert pointer and length into utf8 string represented by the bytes
pub unsafe fn ptr_to_string(ptr: u32, len: u32) -> String {
	let slice = std::slice::from_raw_parts(ptr as *const u8, len as usize);
	String::from_utf8_unchecked(slice.to_vec())
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
