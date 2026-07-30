import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";

export default async function withSSRIsAdmin(context){
  const cookies = parseCookies(context);
  const token = cookies['unitokConarh.token'];
  let tokenDecoded;

  if(token) tokenDecoded = await jwtDecode(token);

  if (!tokenDecoded?.isAdmin) {
    return false;
  } else {
    return true;
  }
}