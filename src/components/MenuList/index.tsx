import { Component } from "react";
import { FixedSizeList as List } from "react-window";

interface MenuListProps {
  options: any;
  maxHeight?: any;
  getValue?: any;
  height?: number;
  children?: React.ReactNode;
}

export const MenuList: React.FC<MenuListProps> = ({
  children,
  getValue,
  maxHeight,
  options,
  height = 40,

}) => {

  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;
  return (
    <List
      width={'100%'}
      height={maxHeight}
      itemCount={options.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  )
}