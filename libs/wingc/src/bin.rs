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
	/// Compile a Wing source file
	#[command(arg_required_else_help = true)]
	Compile {
		/// target to compile to. currently ignored.
		#[arg(required = true)]
		target: String,
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

pub fn main() {
	let args = CliArgs::parse();

	match args.command {
		Commands::Compile { target, outdir } => {
			compile(target.as_str(), outdir.as_deref());
		},
		Commands::Run { executable } => {
			println!("Running {}", executable);
		},
	}
}
