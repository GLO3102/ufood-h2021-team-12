import Cookies from "js-cookie";
export async function logout(token) {
  const response = await fetch(`http://ufoodapi.herokuapp.com/logout`, {
    method: "POST",
    headers: {
      authorization: token
    }
  });
  Cookies.remove("token");
  return response;
}
export default {
  logout
};
