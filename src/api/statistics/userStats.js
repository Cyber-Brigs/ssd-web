import { axiosApi } from "..";

export const getUserPlatformStats = async () => {
  return await axiosApi.get("/user/statistics/");
};
