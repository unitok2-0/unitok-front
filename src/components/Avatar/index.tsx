import React from "react";
import { CSSProp } from "styled-components";
import { resolveImageUrl } from "../../constants/functions";
import { Container, AvatarImage } from "./styles";

export interface AvatarProps {
  styleContainer?: CSSProp;
  imageUrl?: string | ArrayBuffer;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { imageUrl, styleContainer, size = 120 } = props;
  const image = resolveImageUrl(typeof imageUrl === "string" ? imageUrl : undefined);
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
