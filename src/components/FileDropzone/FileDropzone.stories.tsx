import { Meta, Story } from "@storybook/react/types-6-0";
import FileDropzone from ".";

export default {
  title: "FileDropzone",
  component: FileDropzone,
} as Meta;

export const Default: Story = () => (
  <FileDropzone accept=".pdf" onFileChange={console.log} />
);
