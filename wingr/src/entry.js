(() => {
  const fs = require("fs");
  const vm = require("vm");
  const path = require("path");

  const { Command } = require("commander");
  const program = new Command();
  program
    .name("wingr")
    .description("Wing Runtime CLI")
    .version("0.0.0-dev.0")
    .argument("<input>", "input to run/compile")
    .option("-c, --context <directory>", "input run context", ".")
    .action((input, options) => {
      const ext = path.extname(input);
      if (ext === ".w") {
        const inputSource = WingCompiler.compile(input, options.context);
        console.debug("Running JS:\n", inputSource);
        vm.runInThisContext(inputSource);
        process.exit(0);
      }
      if (ext === ".js") {
        const inputSource = fs.readFileSync(input, "utf8");
        vm.runInThisContext(inputSource);
        process.exit(0);
      }
    })
    .parse();
})();
