// compile with:
// csc /target:library /reference:<path to Mono.CSharp.dll> wingpf.cs

using Mono.CSharp;

namespace Monada
{
  static class Wing
  {
    static public int Execute(string program, string workdir)
    {
      var settings = new CompilerSettings () { Unsafe = true, StdLib = true };
      var printer = new ConsoleReportPrinter ();
      var eval = new Evaluator (new CompilerContext (settings, printer));
      return eval.Run(program) ? 0 : 1;
    }
  }
}
