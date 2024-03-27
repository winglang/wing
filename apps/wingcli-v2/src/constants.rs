use std::path::PathBuf;

use camino::Utf8PathBuf;
use home::home_dir;
use lazy_static::lazy_static;

pub const VERSION: &str = env!("CARGO_PKG_VERSION");

lazy_static! {
	pub static ref HOME_PATH: PathBuf = home_dir().expect("Could not find home directory");
	pub static ref WING_CACHE_DIR: Utf8PathBuf =
		Utf8PathBuf::from_path_buf(HOME_PATH.join(".wing").join("cache")).expect("invalid utf8");
	pub static ref WING_SDK_DIR: Utf8PathBuf = WING_CACHE_DIR.join("node_modules").join("@winglang").join("sdk");
}
