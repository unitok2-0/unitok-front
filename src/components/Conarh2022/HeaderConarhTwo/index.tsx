import Logo from '../../../../public/assets/logo2.svg';
import ChevronDown from '../../../../public/assets/chevron-down-red.svg';
import Link from "next/link";

import { Header, HeaderContainer } from "../HeaderConarhTwo/styles";
import { useAuthConarh } from 'contexts/AuthConarhContext';
import ProfileImageAndButtons from '../ProfileImageAndButtons';
import { MdOutlineLogout } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

export default function HeaderConarhTwo() {
  const { user, signOut } = useAuthConarh();

  return (
    <Header>
      <HeaderContainer>
        <div className="divisionItensHeader">
          <Logo className="logo" />

          <div className="previousVisitPanel">
            <Link
              href={user?.isAdmin ? "/conarh2022/visits-event" : "/expositor/dashboard"}
              passHref
              legacyBehavior>
              <div>
                <ChevronDown className="chevronIcon" />
                <span className="textLink">{/*Voltar para o painel de visitas ::after content*/}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className='headerIcons'>
          <Link href="/expositor/profile" passHref legacyBehavior>
            <FiSettings style={{ cursor: 'pointer' }} />
          </Link>
          <MdOutlineLogout
            style={{ cursor: 'pointer' }}
            onClick={signOut}
          />
        </div>

        <ProfileImageAndButtons
          src={user?.image}
        />
      </HeaderContainer>
    </Header>
  );
}

function updateUser(form: { userImage: string; }) {
  throw new Error('Function not implemented.');
}
