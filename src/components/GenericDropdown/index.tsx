import { ButtonHTMLAttributes, useRef, useState } from "react";
import Image from "next/image";
import useClickOutside from "hooks/useClickOutside";

// import ChevronDownIcon from "assets/icons/chevron-down.svg";
import { BsChevronDown } from "react-icons/bs";

import * as S from "./styles";

export type GenericDropdownProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  shouldShowContent?: boolean;
  onClickOutside?: () => void;
  maxContentHeight?: string;
  minContentWidth?: string;
  contentInset?: S.ContentProps["inset"];
  isGroupView?: boolean;
  customStyles?: string;
};

export function GenericDropdown(props: GenericDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function toggleWrapper() {
    setIsOpen(!isOpen)
  }

  useClickOutside(wrapperRef, props.onClickOutside);

  return (
    <S.Wrapper ref={wrapperRef} isOpen={isOpen} onClick={toggleWrapper}>
      {props.header}
      <S.Content
        isGroupView={props.isGroupView}
        customStyles={props.customStyles}
        isOpen={isOpen}
        maxHeight={props.maxContentHeight}
        minWidth={props.minContentWidth}
        inset={props.contentInset}
        className="custom-scroll"
        onMouseLeave={!props.isGroupView ? () => setIsOpen(false) : () => setIsOpen(true)}
      >
        {props.children}
      </S.Content>
    </S.Wrapper>
  );
}

export type GenericDropdownHeaderProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLDivElement>;

export function GenericDropdownHeader(props: GenericDropdownHeaderProps) {
  const { children, ...headerProps } = props;

  return (
    <S.Header {...headerProps} role="button">
      <div>{children}</div>
      <BsChevronDown className="chevron" />
    </S.Header>
  );
}

export { Button as GenericDropdownButton } from "./styles";
