import { userAxios } from "..";

export const createUserAccount = async (
  first_name,
  last_name,
  username,
  email,
  password
) => {
  return await userAxios.post("/register/", {
    first_name,
    last_name,
    username,
    email,
    password
  });
};

export const requestToken = async (username, password) => {
  return await userAxios.post("/login/", {
    username,
    password,
  });
};
