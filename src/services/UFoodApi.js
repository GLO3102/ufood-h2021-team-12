export default {
  betterFetch
};

async function betterFetch(url, secure) {
  let secureText = "";
  if (!secure) {
    secureText = "unsecure/";
  }
  let error = null;
  let data = await fetch(
    "https://ufoodapi.herokuapp.com/" + secureText + url
  ).then(async response => {
    const response_data = await response.json();
    if (!response.ok) {
      error = (response_data && response_data.message) || response.statusText;
    } else {
      data = response_data;
      return data;
    }
  });
  if (error != null) {
    console.error(error);
  } else {
    return data;
  }
}
