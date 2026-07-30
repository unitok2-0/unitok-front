import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { api } from "services/api";

type HandleReCaptchaVerifyReturn = {
  status: "GOOD" | "BAD";
  score: number;
};

export function useRecaptcha(action: string = "homepage") {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    (async () => {
      if (!executeRecaptcha) {
        console.info("Recaptcha not yet available");
        return;
      }

      const token = await executeRecaptcha(action);
      setToken(token);
    })();
  }, [executeRecaptcha, action]);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!token) return;

    const { data } = await axios.post<HandleReCaptchaVerifyReturn>(
      "/api/verify-recaptcha",
      { token, action }
    );

    return data;
  }, [token, action]);

  return { handleReCaptchaVerify };
}
