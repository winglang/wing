import { Command } from "commander";
import {describe, test, expect } from "vitest";
import { CLICollector } from "./cli-collector";

describe("cli collector tests", () => {
  test("should retrieve command data correctly", async () => {
    // GIVEN
    const command = new MockCommand({
      options: { target: "sim" },
      args: []
    });

    // WHEN
    const collector = new CLICollector(command);
    const cliData = await collector.collect();
    
    // THEN
    expect(cliData).toBeDefined();
    expect(cliData.target).toEqual("sim");
  })
})


interface MockCommandProps {
  options: {[key: string]: any}
  args: string[]
}

class MockCommand extends Command {
  private fakeOptions: {[key: string]: any};

  constructor(props: MockCommandProps) {
    super();
    this.fakeOptions = props.options;
    this.args = props.args;
  }

  public opts(): any {
    return this.fakeOptions;
  }

}