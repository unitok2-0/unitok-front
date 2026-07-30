import * as S from "./styles";

import iconsPattern from "utils/IconsPatterns";
import { Text } from "components/Typography";
import { AnchorHTMLAttributes } from "react";
import useDisclosure from "hooks/useDisclosure";
import { copyToClipboard } from "utils/copy-to-clipboard";
import { toast } from "react-toastify";

export type ProfileSocialButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  name: typeof iconsPattern[number]["value"];
  colorScheme?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  websiteName?: string;
  luminosity: number;
  buttonTitle?: string;
  hightlightButton?: boolean
};

export default function ProfileSocialButton(props: ProfileSocialButtonProps) {

  const { colorScheme, ...buttonProps } = props;
  const pattern = iconsPattern.find(
    (icon) => icon.value.toLocaleLowerCase() === props.name.toLocaleLowerCase()
  );

  function handleCopyPix() {
    copyToClipboard(props.href);
    toast.success("Chave pix copiada!");

  }

  if (!pattern) return null;
  return (
    <>
      {props.hightlightButton ? (
        <S.HighlitedButton
          color={colorScheme}
          as={props.name != 'PIX' ? "a" : 'button'}
          {...buttonProps}
          {...(buttonProps.disabled && {
            pointerEvents: "none",
            onClick: () => ({}),
          })}
        >
          <S.RoundIcon style={{ background: colorScheme, color: props.luminosity > 128 ? '#01302F' : 'white' }}>
            <pattern.icon size={16} />
          </S.RoundIcon>
          {props.websiteName ? (
            <Text as="span">{props.websiteName}</Text>
          ) : (
            <Text as="span">{props.buttonTitle || props.children || pattern.name}</Text>
          )}
        </S.HighlitedButton>
      ) :
        (
          <S.NormalButton
            as={props.name != 'PIX' ? "a" : 'button'}
            {...buttonProps}
            {...(buttonProps.disabled && {
              pointerEvents: "none",
              onClick: () => ({}),
            })}
          >
            <S.RoundIcon style={{ background: colorScheme, color: props.luminosity > 128 ? '#01302F' : 'white' }}>
              <pattern.icon size={16} />
            </S.RoundIcon>
            {props.websiteName ? (
              <Text as="span">{props.websiteName}</Text>
            ) : (
              <Text as="span">{props.buttonTitle || props.children || pattern.name}</Text>
            )}
          </S.NormalButton>
        )}

    </>
  );
}
