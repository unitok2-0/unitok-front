import React from "react";
import { CSSProp } from "styled-components";
import { Container, AvatarImage } from "./styles";

export interface AvatarProps {
  styleContainer?: CSSProp;
  imageUrl?: string | ArrayBuffer;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { imageUrl, styleContainer, size = 120 } = props;
  const image =
    imageUrl ||
    "https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png";
  return (
    <Container styleContainer={styleContainer}>
      <AvatarImage
        //@ts-ignore
        /* src={image}
        width={size}
        height={size}
        alt="Perfil"
        objectFit="cover" */
        img_url={image}
        size={size}
      />
    </Container>
  );
};

export default Avatar;
