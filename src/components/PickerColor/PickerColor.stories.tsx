import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import PickerColor from ".";


export default {
  title: "PickerColor",
  component: PickerColor,
} as Meta;

export const Default: Story = () => {
  const [color, setColor] = useState("#FFBB55");

  return  (
    <>
      <HexColorPicker color={color} onChange={(hex) => {setColor(hex)}}/>
      <h2>{color}</h2>
    </>
    )
};
