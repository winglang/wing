import { render, screen, fireEvent } from "@testing-library/react";
import { it, expect, describe } from "vitest";

import { TreeItem } from "./tree-item.js";
import { TreeView } from "./tree-view.js";

it("should render items as closed by default", () => {
  render(
    <TreeView aria-label="tree">
      <TreeItem itemId="1" data-testid="1">
        <TreeItem itemId="1.1" data-testid="1.1" />
      </TreeItem>
      <TreeItem itemId="2" data-testid="2" />
    </TreeView>,
  );

  expect(screen.getByTestId("1").getAttribute("aria-expanded")).toBe("false");
  expect(screen.getByTestId("1.1").getAttribute("aria-expanded")).toBeNull();
  expect(screen.getByTestId("2").getAttribute("aria-expanded")).toBeNull();
});

describe("arrow right key", () => {
  it("should expand the node if it's closed", () => {
    render(
      <TreeView aria-label="tree">
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
        </TreeItem>
        <TreeItem itemId="2" data-testid="2" />
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });

    expect(screen.getByTestId("1").getAttribute("aria-expanded")).toBe("true");
  });

  it("should focus on the first child if the node is expanded", () => {
    render(
      <TreeView
        aria-label="tree"
        defaultExpandedItems={["1"]}
        defaultSelectedItems={["1"]}
      >
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
        </TreeItem>
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });

    expect(screen.getByTestId("1").getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement?.getAttribute("data-testid")).toBe("1.1");
  });

  it("should do nothing if the node is a leaf", () => {
    render(
      <TreeView
        aria-label="tree"
        defaultExpandedItems={["1"]}
        defaultSelectedItems={["1.1"]}
      >
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
        </TreeItem>
        <TreeItem itemId="2" data-testid="2" />
      </TreeView>,
    );

    screen.getByTestId("1.1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });

    expect(screen.getByTestId("1").getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement?.getAttribute("data-testid")).toBe("1.1");
  });
});

describe("arrow left key", () => {
  it("should close the node if it's expanded", () => {
    render(
      <TreeView
        aria-label="tree"
        defaultExpandedItems={["1"]}
        defaultSelectedItems={["1"]}
      >
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
        </TreeItem>
        <TreeItem itemId="2" data-testid="2" />
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });

    expect(screen.getByTestId("1").getAttribute("aria-expanded")).toBe("false");
  });

  it("should navigate to the parent if the node is closed", () => {
    render(
      <TreeView
        aria-label="tree"
        defaultExpandedItems={["1"]}
        defaultSelectedItems={["1.2"]}
      >
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
          <TreeItem itemId="1.2" data-testid="1.2">
            <TreeItem itemId="1.2.1" data-testid="1.2.1" />
          </TreeItem>
        </TreeItem>
      </TreeView>,
    );

    screen.getByTestId("1.2").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("1");
  });

  it("should do nothing if the node is closed and there's no parent", async () => {
    render(
      <TreeView aria-label="tree" defaultSelectedItems={["1"]}>
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
        </TreeItem>
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });

    expect(screen.getByTestId("1").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByTestId("1").getAttribute("aria-expanded")).toBe("false");
  });
});

describe("arrow up key", () => {
  it("should do nothing if the selected item is the first item visible", () => {
    render(
      <TreeView aria-label="tree" defaultSelectedItems={["1"]}>
        <TreeItem itemId="1" data-testid="1" />
        <TreeItem itemId="2" data-testid="2" />
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("1");
  });

  it("should navigate to the item above", () => {
    render(
      <TreeView
        aria-label="tree"
        defaultExpandedItems={["1"]}
        defaultSelectedItems={["3"]}
      >
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
        </TreeItem>
        <TreeItem itemId="2" data-testid="2">
          <TreeItem itemId="2.1" data-testid="2.1" />
        </TreeItem>
        <TreeItem itemId="3" data-testid="3" />
      </TreeView>,
    );

    screen.getByTestId("3").focus();
    fireEvent.keyDown(screen.getByTestId("3"), { key: "ArrowUp" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("2");

    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("1.1");
  });
});

describe("arrow down key", () => {
  it("should do nothing if the selected item is the last item visible", () => {
    render(
      <TreeView aria-label="tree" defaultSelectedItems={["2"]}>
        <TreeItem itemId="1" data-testid="1" />
        <TreeItem itemId="2" data-testid="2" />
      </TreeView>,
    );

    screen.getByTestId("2").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("2");
  });

  it("should select the item below", () => {
    render(
      <TreeView
        aria-label="tree"
        defaultExpandedItems={["1"]}
        defaultSelectedItems={["1.1"]}
      >
        <TreeItem itemId="1" data-testid="1">
          <TreeItem itemId="1.1" data-testid="1.1" />
        </TreeItem>
        <TreeItem itemId="2" data-testid="2">
          <TreeItem itemId="2.1" data-testid="2.1" />
        </TreeItem>
        <TreeItem itemId="3" data-testid="3" />
      </TreeView>,
    );

    screen.getByTestId("1.1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("2");

    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("3");
  });
});

describe("enter key", () => {
  it("should select the focused node", () => {
    render(
      <TreeView aria-label="tree" defaultSelectedItems={["1"]}>
        <TreeItem itemId="1" data-testid="1" />
        <TreeItem itemId="2" data-testid="2" />
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "Enter" });

    expect(screen.getByTestId("1").getAttribute("aria-selected")).toBe("false");
    expect(screen.getByTestId("2").getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" });
    fireEvent.keyDown(document.activeElement!, { key: "Enter" });

    expect(screen.getByTestId("1").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByTestId("2").getAttribute("aria-selected")).toBe("false");
  });
});

describe("home key", () => {
  it("should navigate to the first node", () => {
    render(
      <TreeView aria-label="tree" defaultSelectedItems={["3"]}>
        <TreeItem itemId="1" data-testid="1" />
        <TreeItem itemId="2" data-testid="2" />
        <TreeItem itemId="3" data-testid="3" />
      </TreeView>,
    );

    screen.getByTestId("3").focus();
    fireEvent.keyDown(document.activeElement!, { key: "Home" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("1");
  });
});

describe("end key", () => {
  it("should navigate to the last node", () => {
    render(
      <TreeView aria-label="tree" defaultSelectedItems={["1"]}>
        <TreeItem itemId="1" data-testid="1" />
        <TreeItem itemId="2" data-testid="2" />
        <TreeItem itemId="3" data-testid="3" />
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "End" });

    expect(document.activeElement?.getAttribute("data-testid")).toBe("3");
  });
});

describe("enter key", () => {
  it("should select the current node", () => {
    render(
      <TreeView aria-label="tree" defaultSelectedItems={["1"]}>
        <TreeItem itemId="1" data-testid="1" />
        <TreeItem itemId="2" data-testid="2" />
        <TreeItem itemId="3" data-testid="3" />
      </TreeView>,
    );

    screen.getByTestId("1").focus();
    fireEvent.keyDown(document.activeElement!, { key: "Enter" });

    expect(screen.getByTestId("1").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByTestId("2").getAttribute("aria-selected")).toBe("false");
    expect(screen.getByTestId("3").getAttribute("aria-selected")).toBe("false");

    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "Enter" });
    expect(screen.getByTestId("1").getAttribute("aria-selected")).toBe("false");
    expect(screen.getByTestId("2").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByTestId("3").getAttribute("aria-selected")).toBe("false");
  });
});
