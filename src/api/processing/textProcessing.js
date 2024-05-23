import { axiosApi, textsApi } from "..";

export const getUserSrsUploads = async () => {
  return await axiosApi.get("/uploads/");
};

export const getUserTextPreprocessingEntries = async () => {
  return await textsApi.get("/processed-texts/");
};

export const performTextPreprocessing = async (
  user_upload_id,
  start_page,
  end_page
) => {
  return await textsApi.post("/process-text/", {
    user_upload_id,
    start_page,
    end_page,
  });
};
