import { Meta, StoryObj } from "@storybook/react";

import { Table } from "./table.js";

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const columns = [
  { name: "id", type: "string" },
  { name: "date", type: "date" },
  { name: "age", type: "number" },
  { name: "active", type: "boolean" },
];

const rows = [
  {
    data: {
      id: "1",
      name: "foo",
      age: 10,
      active: true,
      date: "2021-01-01",
    },
  },
  {
    data: {
      id: "2",
      name: "bar",
      age: 20,
      active: false,
      date: "2022-02-02",
    },
  },
  {
    data: {
      id: "3",
      name: "baz",
      age: 30,
      active: true,
      date: "2023-03-03",
    },
  },
];

export const Default: Story = {
  args: {
    primaryKey: "id",
    columns,
    rows,
    disabled: false,
  },
};

export const EmptyTable: Story = {
  args: {
    primaryKey: "id",
    columns,
    rows: [],
    disabled: false,
  },
};

export const ReadonlyTable: Story = {
  args: {
    primaryKey: "id",
    columns,
    rows: [
      ...rows,
      {
        data: {
          id: "4",
          name: "bar",
          active: false,
        },
      },
      {
        data: {
          id: "5",
          name: "bar",
          active: false,
          date: "2022-02-02",
        },
      },
    ],
    readonly: true,
  },
};

export const TableWithErrors: Story = {
  args: {
    primaryKey: "id",
    columns,
    rows: [
      ...rows,
      {
        data: {
          id: "4",
          name: "bar",
          age: "asd",
          active: false,
          date: "2022-02-02",
        },
        error: "Invalid age",
      },
      {
        data: {
          id: "5",
          name: "baz",
          age: 30,
          active: true,
          date: "2023-03-03",
        },
      },
    ],
    disabled: false,
  },
};
