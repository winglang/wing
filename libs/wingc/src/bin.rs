use clap::{Parser, Subcommand};
use wingc::compile;

#[derive(Parser, Debug)]
#[command(about = "Wing Programming Language CLI", long_about = None)]
struct CliArgs {
	#[command(subcommand)]
	command: Commands,
}

#[derive(Debug, Subcommand)]
enum Commands {
	/// Prints the version of the compiler and exits
	Version,

	/// Compile a Wing source file
	#[command(arg_required_else_help = true)]
	Compile {
		/// target to compile to (tf-aws, local, etc.)
		#[arg(required = true)]
		target: String,
		/// source file to compile
		#[arg(required = true)]
		source: String,
		/// output directory. defaults to a .out directory
		outdir: Option<String>,
	},

	/// Runs a Wing compiled executable
	#[command(arg_required_else_help = true)]
	Run {
		/// a wing executable to run
		#[arg(required = true)]
		executable: String,
	},
}

// there are two schools of thought when it comes to passing strings from native
// to WASM side: 1) a function is declared "extern" and native passes a byte arr
// to it, WASM side decodes and executes. 2) native side stores the strings into
// WASM's linear memory and WASM side accesses it after native call returns.
// Here we use option #2 because declaring an "extern" makes the binary useless
// in non-WASM environments.
const PATH_MAX: usize = 4096;
static mut EXECUTABLE_PATH_BUF: [u8; PATH_MAX] = [0; PATH_MAX];
static mut EXECUTABLE_PATH_LEN: usize = 0;
#[no_mangle]
pub fn get_executable_buf() -> *mut u8 {
	unsafe { EXECUTABLE_PATH_BUF.as_mut_ptr() }
}
#[no_mangle]
pub fn get_executable_len() -> usize {
	unsafe { EXECUTABLE_PATH_LEN }
}

pub fn main() {
	let args = CliArgs::parse();

	match args.command {
		Commands::Version => {
			println!("Wing Programming Language CLI");
			println!("Version: {}", env!("CARGO_PKG_VERSION"));
		}
		Commands::Compile { target, source, outdir } => {
			println!("Compiling for {}", target);
			compile(source.as_str(), outdir.as_deref());
		}
		Commands::Run { executable } => unsafe {
			println!("Running {}", executable);
			EXECUTABLE_PATH_LEN = executable.len();
			EXECUTABLE_PATH_BUF[..EXECUTABLE_PATH_LEN].copy_from_slice(executable.as_bytes());
			// when running in WASM mode, the host will call "get_executable_buf" and
			// "get_executable_len" to get the executable buffer and its size out of
			// WASM's linear memory. Then it will execute the executable.
		},
	}
}
