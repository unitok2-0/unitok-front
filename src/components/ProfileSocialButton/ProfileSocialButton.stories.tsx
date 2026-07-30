import { Meta, Story } from "@storybook/react/types-6-0";

import ProfileSocialButton, { ProfileSocialButtonProps } from ".";

export default {
  title: "ProfileSocialButton",
  component: ProfileSocialButton,
  argTypes: {
    children: { type: "string" },
  },
  args: {
    name: "EMAIL",
  },
} as Meta<ProfileSocialButtonProps>;

export const Default: Story<ProfileSocialButtonProps> = (args) => (
  <ProfileSocialButton {...args} />
);

export const Disabled: Story<ProfileSocialButtonProps> = (args) => (
  <ProfileSocialButton {...args} />
);

Disabled.args = {
  disabled: true,
};

export const WithCustomColor: Story<ProfileSocialButtonProps> = (args) => (
  <ProfileSocialButton {...args} />
);

WithCustomColor.args = {
  colorScheme: "#FF62AD",
};

export const WithCustomName: Story<ProfileSocialButtonProps> = (args) => (
  <ProfileSocialButton {...args} />
);

WithCustomName.args = {
  children: "Custom name",
};
