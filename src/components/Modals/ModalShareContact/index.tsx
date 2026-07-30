import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading, Text } from "components/Typography";
import * as S from "./styles";
import iconsPattern from "utils/IconsPatterns";
import Button from "components/Buttons/ButtonPrimary";
import { useState } from "react";
import { copyToClipboard } from "utils/copy-to-clipboard";
import { toast } from "react-toastify";
import genererateShareLink from "utils/generateShareLink";

export type ShareProfileModalProps = MainModalProps & {
  phone: string;
  email: string;
};

const socialIcons = iconsPattern.filter((pattern) =>
  ["WHATSAPP", "EMAIL"].includes(pattern.value)
);

export default function ShareProfileModal(props: ShareProfileModalProps) {

  return (
    <Modal modalIsOpen={props.modalIsOpen} closeModal={props.closeModal}>
      <S.Wrapper>
        <S.LinksContainer>
          <Heading font="titleXs" color="primary">
            Compartilhar este contato
          </Heading>

          <S.LinksGrid>
            {socialIcons.map((pattern) => (
              <S.Link
                key={pattern.name}
                target="_blank"
                rel="noreferrer"
                href={genererateShareLink(
                  pattern.name.toLocaleLowerCase() as any,
                  props.phone,
                  props.email
                )}
              >
                <div>
                  <pattern.icon size="1.5rem" />
                </div>
                <span>
                  {pattern.name}
                </span>
              </S.Link>
            ))}
          </S.LinksGrid>
        </S.LinksContainer>
      </S.Wrapper>
    </Modal>
  );
}
