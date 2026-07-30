import { Container } from "./styles";



interface ProfileImageProps {
  img?: string;
  name: string;
  job?: string;
  company?: string;
}

export function ProfileImageContacts({ img, name, company, job }: ProfileImageProps) {

  return (
    <Container>
      <div className="imageUser">
        <img
          src={img || 'https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png'}
          alt="Foto do Usuário"
        />
      </div>

      <div className="userName">{name || 'Nome'}</div>
      <div className="userCompany">{company || 'Empresa'}</div>
      <div className="userJob">{job || 'Cargo'}</div>
    </Container>
  )
}