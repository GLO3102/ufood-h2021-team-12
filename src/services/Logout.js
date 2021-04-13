export async function logout(token) {
  const response = await fetch(`http://ufoodapi.herokuapp.com/logout`, {
    method: "POST",
    headers: {
      authorization: token
    }
  });
  return response;
}
export default {
  logout
};
