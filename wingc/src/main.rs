use wingc::compiler;

fn main() {
    let output = compiler::run();
    println!("{}", output);
}
