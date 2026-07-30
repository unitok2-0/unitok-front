import { Story, Meta } from "@storybook/react/types-6-0";
import ProfileImageDropzone, { ProfileImageDropzoneProps } from ".";

export default {
  title: "ProfileImageDropzone",
  component: ProfileImageDropzone,
  args: {
    onFileAdded: console.log,
    onRemove: () => console.log("Remove photo callback"),
    displayImageSrc: "https://picsum.photos/200/300",
  },
} as Meta<ProfileImageDropzoneProps>;

export const Default: Story<ProfileImageDropzoneProps> = (args) => (
  <ProfileImageDropzone  {...args} />
);
