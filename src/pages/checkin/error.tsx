import { Container, ContainerError } from 'styles/pageStyles/conarh2022/checkin/error/styles';
import { VscError } from 'react-icons/vsc';

export default function ErrorQRCODE() {
  return(
    <ContainerError>
      <Container>
        <div><VscError size={60} color="#FF4C1C" style={{marginBottom: '5px'}}/></div>
        <div className="title">Internal Server Error!</div>
        <div className="description">
          Por favor, contate ao dono do stand <br /> para o mesmo falar com a equipe! <br />
          Agradecemos a sua compreensão
        </div>
      </Container>
    </ContainerError>
  )
}