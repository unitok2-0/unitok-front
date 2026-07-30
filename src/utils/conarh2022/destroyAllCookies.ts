import Router from "next/router";
import { destroyCookie } from "nookies";

export default async function destroyAllCookies() {
  destroyCookie(null, "unitokConarh.token", {
    path: "/",
  });
  destroyCookie(null, "unitok.token", {
    path: "/",
  });
  destroyCookie(null, "unitok.user.roles", {
    path: "/",
  });
  destroyCookie(null, "unitokConarh.user.roles", {
    path: "/",
  });
}