import FooterConarh from 'components/Conarh2022/FooterConarh';
import { FirstScreen } from './steps/FirstScreen';
import { HaveAccount as IamVisit } from './steps/HaveAccount';
import { HaveActivateCard as ImACongressman } from './steps/HaveActivateCard';
import { LoginConarh } from './steps/login';
import { useState } from 'react'
import { Container, Content } from './styles'
import { Register } from './steps/Register';
import { SuccessRegister } from './steps/Success';
import Head from 'next/head';

export enum CurrentScreen {
  FIRST_SCREEN = "FIRST_SCREEN",
  HAVE_ACCOUNT = "HAVE_ACCOUNT",
  HAVE_ACTIVATE_CARD = "HAVE_ACTIVATE_CARD",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  SUCCESS = "SUCCESS"
}


interface CheckinContainerProps {
  exhibitorCode?: string;
}

export function CheckinContainer({ exhibitorCode }: CheckinContainerProps) {

  const [currentComponent, setCurrentComponent] = useState<CurrentScreen>(CurrentScreen.FIRST_SCREEN);


  return (
    <Container withoutPadding={currentComponent === CurrentScreen.LOGIN || currentComponent === CurrentScreen.REGISTER}>
      <Head>
        <title>Unitok | Checkin</title>
      </Head>
      {/* {currentComponent !== CurrentScreen.LOGIN || currentComponent !== CurrentScreen.REGISTER || currentComponent !== CurrentScreen.SUCCESS && (
        <div className="title">Conarh 2022</div>
      )} */}

      {currentComponent === CurrentScreen.FIRST_SCREEN && (
        <FirstScreen setCurrentComponent={setCurrentComponent} />
      )}

      {currentComponent === CurrentScreen.HAVE_ACCOUNT && (
        <IamVisit setCurrentComponent={setCurrentComponent} />
      )}

      {currentComponent === CurrentScreen.HAVE_ACTIVATE_CARD && (
        <ImACongressman setCurrentComponent={setCurrentComponent} />
      )}

      {currentComponent === CurrentScreen.LOGIN && (
        <LoginConarh exhibitorCode={exhibitorCode} setCurrentComponent={setCurrentComponent} />
      )}

      {currentComponent === CurrentScreen.REGISTER && (
        <Register exhibitorCode={exhibitorCode} setCurrentComponent={setCurrentComponent} />
      )}

      {currentComponent === CurrentScreen.SUCCESS && (
        <SuccessRegister />
      )}

      {/*  {currentComponent !== CurrentScreen.LOGIN || currentComponent !== CurrentScreen.REGISTER || currentComponent !== CurrentScreen.SUCCESS && (
        <FooterConarh activeFixed={false} styleProps={{ background: 'none' }} />
      )} */}

    </Container>

  )
}


