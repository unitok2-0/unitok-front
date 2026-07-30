import { Meta, Story } from "@storybook/react/types-6-0";
import Avatar, { AvatarProps } from ".";

export default { title: "Avatar", component: Avatar } as Meta<AvatarProps>;

export const Deafault: Story<AvatarProps> = (args) => <Avatar {...args} />;
