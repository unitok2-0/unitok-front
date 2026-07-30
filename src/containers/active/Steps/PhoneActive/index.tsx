import React, { createRef, KeyboardEvent, useCallback, useEffect, useMemo, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { sendTokenPhone } from "services/user";
import { Colors } from "styles/Colors";

import { Title, FormInputsCode, Text } from "../../styles";

type PhoneActiveProps = {
  setValue: any;
  register: any;
  phoneNumber: string;
  clearErrors: any;
  onPressActiveCard: () => void;
  teamsUser: any;
};

const PhoneActive: React.FC<PhoneActiveProps> = ({
  register,
  phoneNumber,
  clearErrors,
  setValue,
  teamsUser,
  onPressActiveCard = () => { },
}) => {
  const [seconds, setSeconds] = useState(10);
  const nextInput = (element, nextInputId?: string, selfElement?: string) => {
    const selfElementInput = document.getElementById(selfElement) as any;
    if (selfElementInput && selfElementInput?.value?.length > 1) {
      selfElementInput.value = selfElementInput?.value?.substr(1, 2) || "";
    }
    // const isTeamsUser = teamsUser !== {} ? true : false
    const isTeamsUser = Object.keys(teamsUser ?? {}).length > 0 ? true : false

    if (selfElement === 'code5') {
      document.getElementById('activeCardButton').focus()
      onPressActiveCard()
    }
    if (!nextInputId) return

    if (element.target.value.length >= 1) {
      document.getElementById(nextInputId)?.focus();
    }

    if (element.target.value.length > 1) {
      document.getElementById(nextInputId)?.focus();
      setValue(element?.target?.id, element.target.value.substr(1, 2));
    }
  };

  const clearInput = (
    element: KeyboardEvent<HTMLInputElement>,
    previousInputId?: string,
    selfInputId?: string
  ) => {
    if (element?.key === "Enter") {
      onPressActiveCard();
    }

    if (element?.key === 'Backspace' && previousInputId && selfInputId) {
      /*   const previousinput = document.getElementById(previousInputId) as any
      const selfinput = document.getElementById(selfInputId) as any

      if (!selfinput.value) {
        previousinput?.focus()
        previousinput.value = ''
      } */
      const input1 = document.getElementById('code1') as any
      const input2 = document.getElementById('code2') as any
      const input3 = document.getElementById('code3') as any
      const input4 = document.getElementById('code4') as any
      const input5 = document.getElementById('code5') as any

      input1.value = ''
      input2.value = ''
      input3.value = ''
      input4.value = ''
      input5.value = ''
      input1.focus()
    }
  };

  const phoneFormated = useMemo(() => {
    let contry = phoneNumber?.slice(0, 2);
    let phone = phoneNumber?.slice(2);
    phone = phone?.replace(/\D/g, ""); //Remove tudo o que não é dígito
    phone = phone?.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    phone = phone?.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return `+${contry} ${phone}`;
  }, [phoneNumber]);

  const input1 = createRef<HTMLInputElement>();
  const input2 = createRef<HTMLInputElement>();
  const input3 = createRef<HTMLInputElement>();
  const input4 = createRef<HTMLInputElement>();
  const input5 = createRef<HTMLInputElement>();

  function clearInputs() {
    input1.current.value = "";
    input2.current.value = "";
    input3.current.value = "";
    input4.current.value = "";
    input5.current.value = "";
    input1.current.focus();
  }

  const resendVoice = useCallback(() => {
    const smsCounter = setTimeout(() => {
      setSeconds((seconds: number) => {
        let secondsAtt = seconds
        if (seconds > 0) {
          secondsAtt = seconds - 1
          resendVoice()
        } else {
          clearInterval(smsCounter);
          setSeconds(0);
        }
        return secondsAtt
      });
    }, 2000);
  }, [])

  useEffect(() => {
    resendVoice()
  }, []);

  return (
    <FormInputsCode teamsUser={teamsUser}>
      <Title>Ativar cartão</Title>
      <Text>
        {`Insira abaixo o código de ativação `}
        {`que enviamos para o número:`}
        <br />
        {`${phoneFormated}`}
      </Text>
      <Text></Text>
      <section>
        <input
          autoFocus
          id="code1"
          name="code1"
          type="number"
          {...register("code1")}
          onFocus={() => clearErrors("code1")}
          onChange={(e) => nextInput(e, "code2")}
        // ref={input1}
        />

        <input
          type="number"
          id="code2"
          name="code2"
          {...register("code2")}
          onFocus={() => clearErrors("code2")}
          onChange={(e) => nextInput(e, "code3")}
          onKeyDown={(e) => {
            clearInput(e, "code1", "code2");
            // if (e.key === 'Backspace') {
            //   clearInputs()
            // }
          }}
        // ref={input2}
        />

        <input
          type="number"
          id="code3"
          name="code3"
          {...register("code3")}
          onFocus={() => clearErrors("code3")}
          onChange={(e) => nextInput(e, "code4")}
          onKeyDown={(e) => {
            clearInput(e, "code2", "code3");
            // if (e.key === 'Backspace') {
            //   clearInputs()
            // }
          }}
        // ref={input3}
        />

        <input
          type="number"
          id="code4"
          name="code4"
          {...register("code4")}
          onFocus={() => clearErrors("code4")}
          onKeyDown={(e) => {
            clearInput(e, "code3", "code4");
            // if (e.key === 'Backspace') {
            //   clearInputs()
            // }
          }}
          onChange={(e) => nextInput(e, "code5")}
        // ref={input4}
        />

        <input
          type="number"
          id="code5"
          name="code5"
          {...register("code5")}
          onFocus={() => clearErrors("code5")}
          onKeyDown={(e) => {
            clearInput(e, "code4", "code5");
            // if (e.key === 'Backspace') {
            //   clearInputs()
            // }
          }}
          onChange={(e) => nextInput(e, undefined, "code5")}
        // ref={input5}
        />
      </section>
      {seconds === 0 && (
        <button
          className="buttonTotalVoice"
          onClick={() => {
            sendTokenPhone(phoneNumber, "VOICE")
            setSeconds(10)
          }}
        >
          <BsTelephoneFill color={teamsUser ? "#383D3B" : Colors.white} size={14} />
          <span>Nao recebi o token, me ligue.</span>
        </button>
      )}
    </FormInputsCode>
  );
};

export default PhoneActive;
