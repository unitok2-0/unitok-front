import { 
  Container, 
  ContainerText,
} from "./styles";

type ModalInformationProps = {
  text: string;
  styleContainerProp?: any;
}

export default function ModalInformation(props: ModalInformationProps) {
  return(
    <Container style={props.styleContainerProp}>
      <ContainerText>
        {props.text}
      </ContainerText>
    </Container>
  )
}