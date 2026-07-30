import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import * as S from './styles';

import IconCloseRange from '/public/assets/x_close.svg';

export default function PwaRange() {
  const [removeRange, setRemoveRange] = useState<boolean>(true);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const { asPath } = useRouter();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const closeRange = () => {
    setRemoveRange(false)
  }

  const installPwa = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  if (asPath.split('/')[1] !== 'profile'){
    return null;
  }

  return(
  <>
    {removeRange &&
      <S.Container>
        <S.Text>
          <div> <button onClick={installPwa}>Adicionar aplicativo</button> a sua tela inicial</div>
          <IconCloseRange style={{marginLeft: '1.5rem', cursor: 'pointer'}} onClick={closeRange}/>
        </S.Text>
      </S.Container>
    }
  </>
  )
}