pub unsafe fn ptr_to_string(ptr: u32, len: u32) -> String {
	let slice = std::slice::from_raw_parts(ptr as *const u8, len as usize);
	String::from_utf8_unchecked(slice.to_vec())
}

/// uses bitshift to combine pointer and length into a single value
pub fn combine_ptr_and_length(ptr: u32, len: u32) -> u64 {
	return ((ptr as u64) << (32 as u64)) | (len as u64);
}
