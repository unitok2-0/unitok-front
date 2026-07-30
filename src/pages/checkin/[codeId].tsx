import { GetServerSideProps } from "next";
import { getExhibitorInformation } from "services/exhibitor";
import { isMakeChecked, makeCheckin } from "services/user";
import { toast } from "react-toastify";
import {
  ButtonSuccess,
  Container,
  ContainerCheckin,
  WarningText,
} from "styles/pageStyles/conarh2022/checkin/styles";
import { parseCookies, setCookie } from "nookies";
import { useState } from "react";
import { useAuth } from "contexts/AuthContext";

import FooterConarh from "components/Conarh2022/FooterConarh";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import getTokenId from "utils/conarh2022/getTokenID";
import PromocodeModal from "components/PromocodeModal";
import GiftCardModal from "components/GiftCardModal";
import { ContainerProfile } from '../../styles/pageStyles/conarh2022/checkin/styles';
import { ProfileImage } from '../../styles/pageStyles/conarh2022/visits-stand/styles';
import { BsCheckCircleFill } from "react-icons/bs";

interface IExhibitor {
  _id: string;
  name: string;
  niche: string;
  image: string;
  company_name: string;
}

interface ICheckinProps {
  codeId: string;
  isChecked: boolean;
  exhibitor: IExhibitor;
  checkins_counter: string | null;

}

export default function CheckIn({ exhibitor, isChecked, checkins_counter }: ICheckinProps) {
  const [buttonSuccess, setButtonSuccess] = useState(isChecked);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [giftModalIsOpen, setGiftModalIsOpen] = useState(false);

  /*   useEffect(() => {
      if (checkins_counter === null || checkins_counter === '0' || checkins_counter === '3' || checkins_counter === '6') {
        setModalIsOpen(true);
      }
  
      if (checkins_counter === '1' || checkins_counter === '4') {
        setGiftModalIsOpen(true);
      }
  
      if (checkins_counter === '6') {
        setCookie(null, "userCheckinsCount", "0", { path: '/', maxAge: 60 * 60, });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) */

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  function handleCloseGiftModal() {
    setGiftModalIsOpen(false)
  }

  const createCheckin = async () => {
    try {
      setIsLoading(true);
      const response = await makeCheckin({ userId: user._id, exhibitorId: exhibitor?._id });
      if (response.makeCheckin) {
        setButtonSuccess(true);
        const currentCheckin = checkins_counter === null ? "1" : String(Number(checkins_counter) + 1)
        setCookie(null, "userCheckinsCount", currentCheckin, { path: '/', maxAge: 60 * 60, })
        toast.success('Check-in realizado com sucesso!');

        if (checkins_counter === "1" || checkins_counter === "3" || checkins_counter === "5") {
          setGiftModalIsOpen(true);
        }

        if (checkins_counter === "2" || checkins_counter === "4") {
          setGiftModalIsOpen(true);
        }

        if (checkins_counter === "5") {
          setCookie(null, "userCheckinsCount", "1", { path: '/', maxAge: 60 * 60, });
        }

      } else {
        toast.error('Você já realizou um check-in neste estande, volte em uma hora!');
      }
    } catch (err) {
      const { error } = err
      toast.error(error)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      <GiftCardModal
        modalIsOpen={giftModalIsOpen}
        closeModal={handleCloseGiftModal}
      />
      <ContainerCheckin>
        <Container>

          <div className="title">Conarh 2022</div>

          <ContainerProfile>
            <ProfileImage img_src={exhibitor.image} />
            <div className="userName">{exhibitor?.company_name || 'Nome do expositor'}</div>
            <div className="userNiche">{exhibitor?.niche || 'Nicho do expositor'}</div>
          </ContainerProfile>

          {!buttonSuccess &&
            <ButtonPrimary
              textButton="Fazer check-in nesse stand"
              styleProp={{
                maxWidth: '24rem',
                width: '100%',
                fontSize: '0.938rem',
                height: '2.5rem',
                border: '1px solid #FF4C1C',
              }}
              loading={isLoading}
              onClick={createCheckin}
            />
          }
          {buttonSuccess && !isChecked &&
            <div style={{ maxWidth: '24rem', width: '100%' }}>
              <ButtonPrimary
                onClick={createCheckin}
                styleProp={ButtonSuccess}
                disabled={buttonSuccess}
              >
                <BsCheckCircleFill color="white" className="iconCheckin" /> Feito!
              </ButtonPrimary>
            </div>
          }
          {buttonSuccess && isChecked &&
            <div style={{ maxWidth: '24rem', width: '100%' }}>
              <ButtonPrimary
                onClick={createCheckin}
                styleProp={ButtonSuccess}
                disabled={buttonSuccess}
              >
                <BsCheckCircleFill color="white" className="iconCheckin" /> Feito!
              </ButtonPrimary>
              <WarningText>Você já fez login nesse stand, volte em uma hora!</WarningText>
            </div>
          }


        </Container>
        <FooterConarh activeFixed={false} styleProps={{ backgroundColor: "#efefef" }} />
      </ContainerCheckin>

      <PromocodeModal
        closeModal={handleCloseModal}
        modalIsOpen={modalIsOpen}
        discount_value={50}
        promocode="conarh2022"
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps =
  async (context) => {
    const { codeId } = context.query;
    const { ['unitok.token']: token } = parseCookies(context);

    if (!token) {
      setCookie(context, "standCodeId", String(codeId), { path: '/', maxAge: 60 * 60, })
      return {
        redirect: {
          destination: '/checkin',
          permanent: false,
        }
      }
    }

    const exhibitor = await getExhibitorInformation(null, codeId.toString());

    if (exhibitor.status === 400) {
      return {
        redirect: {
          destination: '/checkin/error',
          permanent: false,
        }
      }
    }

    const objectExhibitor = {
      _id: exhibitor?._doc._id,
      image: exhibitor?._doc.image,
      name: exhibitor?._doc.name,
      company_name: exhibitor?._doc.company_name,
      niche: exhibitor?._doc.niche,
    }

    const userId = await getTokenId(context, 'unitok.token');
    const response = await isMakeChecked({ userId, exhibitorId: objectExhibitor._id });


    const { ['userCheckinsCount']: checkins_count } = parseCookies(context);

    const checkins_counter = checkins_count ? checkins_count : null;

    return {
      props: {
        codeId,
        checkins_counter,
        exhibitor: objectExhibitor,
        isChecked: response.userAlreadyMakeCheckin || false,
      }
    }
  }
