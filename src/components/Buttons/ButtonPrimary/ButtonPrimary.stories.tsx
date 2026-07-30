import { Meta, Story } from "@storybook/react/types-6-0";
import ButtonPrimary, { ButtonPrimaryProp } from ".";
import { FiExternalLink, FiPlus } from "react-icons/fi";

export default {
  title: "ButtonPrimary",
  component: ButtonPrimary,
  parameters: {
    backgrounds: {
      values: [
        {
          name: "contrastMode",
          value: "#FF4C1C",
        },
      ],
    },
  },
  argTypes: {
    children: { type: "string" },
  },
} as Meta<ButtonPrimaryProp>;

export const Primary: Story<ButtonPrimaryProp> = (args) => (
  <ButtonPrimary {...args}>Call to action</ButtonPrimary>
);

export const Secondary: Story<ButtonPrimaryProp> = (args) => (
  <ButtonPrimary {...args} variant="secondary">
    Call to action
  </ButtonPrimary>
);

export const Tertiary: Story<ButtonPrimaryProp> = (args) => (
  <ButtonPrimary {...args} variant="tertiary">
    Call to action
  </ButtonPrimary>
);

export const FullWidth: Story<ButtonPrimaryProp> = (args) => (
  <ButtonPrimary {...args} fullWidth>
    Call to action
  </ButtonPrimary>
);

export const Loading: Story<ButtonPrimaryProp> = (args) => (
  <ButtonPrimary {...args} variant="primary" loading>
    Call to action
  </ButtonPrimary>
);

export const Disabled: Story<ButtonPrimaryProp> = (args) => (
  <ButtonPrimary {...args} variant="primary" disabled>
    Call to action
  </ButtonPrimary>
);

export const AsIconButton: Story<ButtonPrimaryProp> = (args) => (
  <ButtonPrimary {...args} variant="secondary" asIconButton>
    <FiPlus size={20} />
  </ButtonPrimary>
);

export const WithIcon: Story<ButtonPrimaryProp> = (args) => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <ButtonPrimary
      {...args}
      variant="primary"
      rightElement={<FiExternalLink />}
    >
      Call to action
    </ButtonPrimary>
    <ButtonPrimary
      {...args}
      variant="secondary"
      leftElement={<FiExternalLink />}
    >
      Call to action
    </ButtonPrimary>
    <ButtonPrimary
      {...args}
      variant="tertiary"
      rightElement={<FiExternalLink />}
    >
      Call to action
    </ButtonPrimary>
  </div>
);

export const ContrastMode: Story<ButtonPrimaryProp> = (args) => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <ButtonPrimary {...args} variant="primary" hasContrastMode>
      Call to action
    </ButtonPrimary>
    <ButtonPrimary {...args} variant="secondary" hasContrastMode>
      Call to action
    </ButtonPrimary>
    <ButtonPrimary {...args} variant="tertiary" hasContrastMode>
      Call to action
    </ButtonPrimary>
  </div>
);

ContrastMode.parameters = {
  backgrounds: { default: "contrastMode" },
};
