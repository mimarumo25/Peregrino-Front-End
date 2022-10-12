import jwt_decode from "jwt-decode";
// export const url = process.env.REACT_APP_NAME;
export const url = process.env.REACT_APP_NAME;

export const saveToken = (token) => {
  document.cookie = `TOKEN=${token}; max-Age=${86400}; path=/; samesite=strict`;
};

export const getToken = () => {
  const token = document.cookie.replace("TOKEN=", "");
  return token;
};

export const deleteToken = () => {
  document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //document.cookie = `TOKEN=${0
  //}; max-ege=${0}; path=/; 0`;
};
export const decodeToken = () => {
  const token = getToken();
  return jwt_decode(token);
};
export const headers = () => {

  const token =getToken();

  const config = { headers: {'x-access-token': token}};
  return config;
}


