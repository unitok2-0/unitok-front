import {
  Header,
  HeaderContainer,
  HeaderTitle,
} from "./styles";

import { useAuthConarh } from "contexts/AuthConarhContext";

import Logo from '../../../../public/assets/logo2.svg';
import Link from "next/link";
import { FiSettings } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";

export default function HeaderConarh() {
  const { signOut } = useAuthConarh();

  return (
    <Header>
      <HeaderContainer>

        <Link href='/'>

          <Logo className="logo" />

        </Link>

        <HeaderTitle>CONARH 2022</HeaderTitle>

        <div className='headerIcons'>
          <Link href="/expositor/profile" passHref legacyBehavior>
            <FiSettings style={{ cursor: 'pointer' }} />
          </Link>
          <MdOutlineLogout
            style={{ cursor: 'pointer' }}
            onClick={signOut}
          />
        </div>

      </HeaderContainer>
    </Header>
  );
}