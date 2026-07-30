import { Meta, Story } from "@storybook/react/types-6-0";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { useState } from "react";
import Drawer, { DrawerComponentProps } from ".";

export default {
  title: "Drawer",
  component: Drawer,
} as Meta<DrawerComponentProps>;

export const Default: Story<DrawerComponentProps> = (args) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <ButtonPrimary
        textButton="Open drawer"
        onClick={() => setIsVisible(true)}
      />
      <Drawer visible={isVisible} setVisible={setIsVisible}>
        Content
      </Drawer>
    </>
  );
};
