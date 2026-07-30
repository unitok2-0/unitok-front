import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { StepperContent, StepperLink, Label, Icon } from "./styles";
import { useRouter } from "next/router";

export type Link = {
  label: string;
  href: string;
  iconToShowOnMobile: React.ReactNode;
};

export interface StepperProps {
  activeIndex: number;
  lastUnlockedIndex?: number;
  links: Link[];
}

export function Stepper(props: StepperProps) {
  const router = useRouter();

  const lastUnlockedIndex =
    props.lastUnlockedIndex !== undefined
      ? props.lastUnlockedIndex
      : props.activeIndex;

  return (
    <StepperContent className="light-custom-scrollbar">
      {props.links.map((link, index) => (
        <React.Fragment key={link.label}>
          <StepperLink
            isActive={props.activeIndex === index}
            disabled={lastUnlockedIndex < index}
            onClick={() => router?.push?.(link.href)}
          >
            <Label>{link.label}</Label>
            <Icon aria-label={link.label} title={link.label}>
              {link.iconToShowOnMobile}
            </Icon>
          </StepperLink>

          {index < props.links.length - 1 && <FiChevronRight />}
        </React.Fragment>
      ))}
    </StepperContent>
  );
}
