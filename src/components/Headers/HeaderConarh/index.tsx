import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "./styles";


export function HeaderConarh() {

  const router = useRouter()
  return (
    <Container>
      <div className="d-flex">
        <img src="/assets/abrh_logo.svg" alt="ABRH" />

        <span className="event-name">CONARH 2022</span>
      </div>
      <img
        className="unitok-logo"
        src="/assets/unitok_logos-institucional.svg"
        alt="Unitok"
        onClick={() => { router.replace('/') }}
        title="Ir para unitok.com"
      />
    </Container>
  )
}