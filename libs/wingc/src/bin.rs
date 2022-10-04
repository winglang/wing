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

pub fn main() {
	let args = CliArgs::parse();

	match args.command {
		Commands::Compile { target, source, outdir } => {
			println!("Compiling for {}", target);
			compile(source.as_str(), outdir.as_deref());
		}
		Commands::Run { executable } => {
			println!("Running {}", executable);
		}
	}
}
