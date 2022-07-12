// compile with:
// csc /target:library /reference:Mono.CSharp.dll libwrr.cs

// this is loosely based on the work from:
// https://github.com/mono/mono/blob/main/mcs/tools/csharp/repl.cs

using Mono.CSharp;

using System;
using System.IO;
using System.Text;

namespace Monada
{
  static class Wing
  {
    static public int Execute(string program, string workdir)
    {
      var settings = new CompilerSettings() { Unsafe = true, StdLib = true };
      var printer = new ConsoleReportPrinter();
      var eval = new Evaluator(new CompilerContext(settings, printer));
      try
      {
        ExecuteSource(program, eval);
        return 0;
      }
      catch
      {
        Console.Error.WriteLine("Fatal Error in C# script", program);
        return 1;
      }
    }

    static void ExecuteSource(string file, Evaluator evaluator)
    {
      try
      {
        bool first = true;
        using (StreamReader r = File.OpenText(file))
        {
          ReadEvalPrintLoopWith(p =>
          {
            var line = r.ReadLine();
            if (first)
            {
              if (line.StartsWith("#!"))
                line = r.ReadLine();
              first = false;
            }
            return line;
          }, evaluator);
        }
      }
      catch (FileNotFoundException)
      {
        Console.Error.WriteLine("cs2001: Source file `{0}' not found", file);
        return;
      }
    }

    delegate string ReadLiner(bool primary);

    static void ReadEvalPrintLoopWith(ReadLiner readline, Evaluator evaluator)
    {
      string expr = null;
      for (; ; )
      {
        string input = readline(expr == null);
        if (input == null)
          return;

        if (input == "")
          continue;

        expr = expr == null ? input : expr + "\n" + input;
        expr = Evaluate(expr, evaluator);
      }
    }

    static string Evaluate(string input, Evaluator evaluator)
    {
      try
      {
        bool result_set;
        object result;
        input = evaluator.Evaluate(input, out result, out result_set);
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return null;
      }

      return input;
    }
  }
}
