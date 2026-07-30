import axios from "axios";
import { BASE_URL_BACKEND } from "constants/values";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "unitok.token": token } = parseCookies(ctx);
  const { "unitokConarh.token": exhibitorToken } = parseCookies(ctx);

  // Server-side (getServerSideProps/getStaticProps) runs inside the Next.js
  // server process, which in containerized setups (e.g. Docker Compose) isn't
  // reachable at the same host as the public/browser-facing backend URL.
  // BACKEND_INTERNAL_URL lets that case point at the backend's internal
  // address while the browser keeps using NEXT_PUBLIC_BASE_URL_BACKEND.
  const baseURL = typeof window === "undefined"
    ? process.env.BACKEND_INTERNAL_URL || BASE_URL_BACKEND
    : BASE_URL_BACKEND;

  const api = axios.create({
    baseURL,
  });

  // api.interceptors.request.use(config => {
  //   console.log(config);

  //   return config;
  // })

  if (token) {
    api.defaults.headers["Authorization"] = `${token}`;
  } else if (exhibitorToken) {
    api.defaults.headers["Authorization"] = `${exhibitorToken}`;
  }


  return api;
}
