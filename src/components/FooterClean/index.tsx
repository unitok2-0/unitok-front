import Link from 'next/link';
import * as S from './styles';

export function FooterClean() {
  return (
    <S.Footer>
      <Link href="/" passHref>

        <img
          src="/assets/powered-by-unitok.svg"
          alt="Powered by Unitok"
        />

      </Link>
    </S.Footer>
  );
}