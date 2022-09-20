import { ComponentMeta } from "@storybook/react";
import { PropsWithChildren } from "react";

import { constructHubTreeToWingSchema } from "../stories/utils.js";

import { VscodeLayout } from "./VscodeLayout.js";

export default {
  title: "Layouts/Vscode",
} as ComponentMeta<typeof VscodeLayout>;

const Container = ({ children }: PropsWithChildren) => {
  return <div className="fixed top-0 left-0 h-full w-full">{children}</div>;
};

export const WithoutSchema = () => {
  return (
    <Container>
      <VscodeLayout schema={undefined} />
    </Container>
  );
};

export const WithSchema = () => {
  const schema = constructHubTreeToWingSchema();
  return (
    <Container>
      <VscodeLayout schema={schema} />
    </Container>
  );
};
