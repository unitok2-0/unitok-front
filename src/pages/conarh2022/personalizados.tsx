import { FooterUnitok } from "components/FooterUnitok";
import { CustomCard } from "containers/customCards";
import Link from "next/link";

import * as S from "../../styles/pageStyles/conarh2022/personalizados/styles";

export default function Personalizados() {
  return <>
    <S.Container>
      <S.ClipPath />

      <S.Header>
        <Link href="/">

          <img src="/assets/unitok.svg" alt="" />

        </Link>
        <label className="title">EMPRESAS</label>
      </S.Header>

      <S.Content>
        <div className="card-container">
          <img
            src="/images/conarh2022/cards/Unitok_cartoes_CONARH14_13.png"
            alt=""
          />
        </div>
        <CustomCard />
      </S.Content>
    </S.Container>
    <FooterUnitok />
  </>;
}
