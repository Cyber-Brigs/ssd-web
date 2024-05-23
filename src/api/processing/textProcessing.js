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

export const performModelTraining = async (type, text_processing_id) => {
  return await textsApi.post(`/${type}-model-topics/`, {
    text_processing_id,
  });
};

export const completeModelTraining = async (type, model_id, selected_topics) => {
  return await textsApi.patch(`/${type}-select-topics/${model_id}/`, {
    selected_topics: parseInt(selected_topics),
  });
};