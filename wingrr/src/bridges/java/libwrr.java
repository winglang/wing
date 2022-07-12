// compile with:
// javac libwrr.java

import jdk.jshell.*;
import java.io.FileReader;
import java.io.BufferedReader;

public class libwrr {
  public static void main(String[] args) {
    if (args.length < 1) {
      System.out.println("no program specified.");
      System.exit(1);
    }
    if (args.length < 2) {
      System.out.println("no working directory specified.");
      System.exit(1);
    }
    try (JShell js = JShell.create()) {
      try (BufferedReader br = new BufferedReader(new FileReader(args[0]))) {
        for (String line; (line = br.readLine()) != null;) {
          if (line == "")
            break;
          js.eval(line);
        }
      }
    } catch (Exception ex) {
      System.out.println(ex.getMessage());
    }
  }
}
