import axios from 'axios';

const BASE_URL = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async () => {
  console.log("getting token..")
  const authParam = {
    grant_type: 'client_credentials',
    client_id: "d6fde6b0ca01413d8b06f0575e22c5ed",
    client_secret: "7d31cf24f6534583a0a35d511e74ed48",
  };

  try {
    const res = await axios.post(BASE_URL, new URLSearchParams(authParam).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    window.localStorage.setItem('token', res.data.access_token);
    console.log("get token success");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};