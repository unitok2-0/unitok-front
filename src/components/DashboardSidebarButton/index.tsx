import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

import { Container, ContainerIcon, Text } from "./styles";

export interface DashboardSidebarButtonProps
  extends ButtonHTMLAttributes<HTMLAnchorElement> {
  isSelected: boolean;
  icon: React.ReactElement;
  children?: ReactNode;
  href?: string;
  hasChevronRightIcon?: boolean;
  onClick?: () => void;
  isNew?: boolean;
}

export function DashboardSidebarButton({
  isSelected,
  icon,
  children,
  href,
  hasChevronRightIcon,
  onClick,
}: DashboardSidebarButtonProps) {
  const buttonProps = onClick
    ? { as: ("button" as unknown) as undefined, onClick }
    : {};

  const ButtonOrAnchor = (
    <Container {...buttonProps} isSelected={isSelected} onClick={onClick}>
      <ContainerIcon>
        {icon}
        <Text>{children}</Text>
      </ContainerIcon>

      {hasChevronRightIcon && (
        <RiArrowRightSLine className="ArrowIcon" size={20} />
      )}
    </Container>
  );

  if (onClick) return ButtonOrAnchor;

  return (
    <Link href={href || ""} passHref legacyBehavior>
      {ButtonOrAnchor}
    </Link>
  );
}
