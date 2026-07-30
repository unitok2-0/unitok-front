import { Text } from "components/Typography";
import * as S from "./styles";
import { BsPlayCircle } from "react-icons/bs";

export type VideoPreviewButtonProps = {
  coverUrl: string;
  title: string;
  onClick: () => void;
};

export default function VideoPreviewButton(props: VideoPreviewButtonProps) {
  return (
    <S.Wrapper title="Clique para ir ao vídeo" onClick={props.onClick}>
      <img src={props.coverUrl} alt={props.title} />
      <S.GradientOverlay>
        <BsPlayCircle size={64} />
        <Text font="titleSm" as="span" color="white">
          {props.title}
        </Text>
      </S.GradientOverlay>
    </S.Wrapper>
  );
}
