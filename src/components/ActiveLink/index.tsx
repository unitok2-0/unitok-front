import Link, { LinkProps } from "next/link";
import { useRouter } from 'next/dist/client/router';

import { TextLink, Button } from './styles'
import { CSSProp } from "styled-components";

interface ActiveLinkProps extends LinkProps {
  textLink: string;
  styleText?: CSSProp;
  isActiveProp?: boolean,
  isButton?: boolean,
  onClickButton?: () => void
}

export function ActiveLink({
  textLink,
  isButton,
  styleText,
  isActiveProp,
  onClickButton,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const isActive = isButton ? !!isActiveProp : asPath === rest.href

  return <>
    {
      isButton ?
        <Button
          type="button"
          styleTextProp={styleText}
          active={isActive}
          onClick={() => onClickButton()}
        >
          {textLink}
        </Button>
        :
        <Link {...rest} legacyBehavior>
          <TextLink styleTextProp={styleText} active={isActive}>{textLink}</TextLink>
        </Link>
    }
  </>;
}