import { userAxios } from "..";

export const createUserAccount = async (
  username,
  email,
  password,
  password_confirmation
) => {
  return await userAxios.post("/register/", {
    username,
    email,
    password,
    password_confirmation,
  });
};

export const requestToken = async (username, password) => {
  return await userAxios.post("/login/", {
    username,
    password,
  });
};
