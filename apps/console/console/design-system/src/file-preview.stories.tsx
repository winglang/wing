import { Meta, StoryObj } from "@storybook/react";

import { FilePreview } from "./file-preview.js";

const meta = {
  title: "Design System/FilePreview",
  component: FilePreview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof FilePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filename: "test.txt",
    content: "Hello world!",
  },
};

const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
</svg>
`;

export const ImagePreview: Story = {
  args: {
    filename: "test.svg",
    content: window.btoa(testSvg),
    className: "w-32",
  },
};

export const VideoPreview: Story = {
  args: {
    filename: "test.mp4",
    content: "",
  },
};

export const AudioPreview: Story = {
  args: {
    filename: "test.mp3",
    content: "",
  },
};

export const PdfPreview: Story = {
  args: {
    filename: "test.pdf",
    content: "",
  },
};

export const UnsuportedPreview: Story = {
  args: {
    filename: "test.unsupported",
    content: "Unsupported file type",
  },
};
