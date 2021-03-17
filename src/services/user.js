export async function getAUser(){
  const URL = `https://ufoodapi.herokuapp.com/unsecure/users?limit=20`;
  const response = await fetch(URL);
  const listUsers = await response.json();
  return listUsers.items[1];
}


export default{
  getAUser
}
