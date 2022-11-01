// this is adopted from: https://github.com/zaaack/debug-rs
// I removed all coloring for WASM and made "debugf" just "debug" instead.
// Interface is meant to be similar to https://www.npmjs.com/package/debug

// You can enable debug output by setting the environment variable "DEBUG"
// It supports namespaces, so you can do:
//   "DEBUG=foo,bar" to enable both "foo" and "bar"
//   "DEBUG=foo:*" to enable all namespaces starting with "foo"
//   "DEBUG=*,-bar" to enable all namespaces except "bar"

extern crate globset;
extern crate lazy_static;
use globset::{Glob, GlobMatcher};

lazy_static! {
	static ref DEBUG_PATTERNS: (Vec<GlobMatcher>, Vec<GlobMatcher>) = ::std::env::var("DEBUG")
		.unwrap_or(String::new())
		.as_str()
		.split(',')
		.fold((vec![], vec![]), |mut acc, s| {
			if s.len() > 1 && &s[0..1] == "-" {
				acc.1.push(Glob::new(&s[1..]).unwrap().compile_matcher());
			} else if s.len() > 0 {
				acc.0.push(Glob::new(s).unwrap().compile_matcher());
			}
			acc
		});
}

pub fn debug_meta(pkg: &str, file: &str, line: u32) {
	print!("{}:{}:L{} ", pkg, file, line);
}

pub fn is_debug(pkg_name: &str, file: &str) -> bool {
	let meta = format!("{}:{}", pkg_name, file);
	return !DEBUG_PATTERNS.1.iter().any(|g| g.is_match(&meta)) && DEBUG_PATTERNS.0.iter().any(|g| g.is_match(&meta));
}

#[macro_export]
macro_rules! debug {
    ( $( $x:expr ),+ ) => {
        {
            let pkg_name = env!("CARGO_PKG_NAME");
            let file = file!();
            if $crate::debug::is_debug(pkg_name, file) {
                $crate::debug::debug_meta(pkg_name, file, line!());
                let res = format!($($x),+);
                println!("{}", res);
            }
        }
    };
}

#[cfg(test)]
mod tests {
	#[test]
	fn it_works() {
		debug!("num: {}, str: {},", 8, "129");
		debug!("num: {:?}, str: {:?},", 129, "8");
	}
}
