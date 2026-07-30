import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "services/api";

type GoogleAssessmentResponse = {
  tokenProperties: {
    valid: boolean;
    hostname: "www.google.com";
    action: string;
    createTime: string;
  };
  score: number;
  reasons: string[];
  event: {
    token: string;
    siteKey: string;
    expectedAction: string;
  };
  name: string;
};

const ACCEPTABLE_RECAPTCHA_SCORE = 0.5;

export default async function verifyRecaptcha(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const projectApiKey = process.env.GOOGLE_API_KEY;
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
    const projectId = process.env.GOOGLE_PROJECT_ID;

    const googleAssessmentEndpoint = `https://recaptchaenterprise.googleapis.com/v1beta1/projects/${projectId}/assessments?key=${projectApiKey}`;
    try {
      const token = req.body.token;
      const expectedAction = req.body.action;

      const { data } = await api.post<GoogleAssessmentResponse>(
        googleAssessmentEndpoint,
        {
          event: {
            token,
            siteKey,
            expectedAction,
          },
        }
      );

      const isScoreAcceptable = data.score >= ACCEPTABLE_RECAPTCHA_SCORE;
      const status = isScoreAcceptable ? "GOOD" : "BAD";

      res.status(200).json({ status, score: data.score });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
