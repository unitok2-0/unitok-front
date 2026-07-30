import { Container } from "./styles";



interface ProfileImageProps {
  img?: string;
  isEvent: boolean;
  name: string;
  niche: string;
}

export function ProfileImage({ img, isEvent, name, niche }: ProfileImageProps) {

  return (
    <Container isEvent={isEvent}>
      <div className="imageUser">
        <img
          src={img || 'https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png'}
          alt="Foto do Usuário"
        />
      </div>

      {isEvent &&
        <div style={{ fontSize: '1.25rem', fontWeight: '500', marginTop: '10px' }}>Conarh 2022</div>
      }
      {!isEvent &&
        <>
          <div className="userName">{name || 'Nome do expositor'}</div>
          <div className="userNiche">{niche || 'Nicho do expositor'}</div>
        </>
      }
    </Container>
  )
}