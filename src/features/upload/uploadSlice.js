import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    currentUploadDetail: null,
  },
  reducers: {
    setCurrentUploadDetail: (state, action) => {
      const { currentUploadDetail } = action.payload;
      state.currentUploadDetail = currentUploadDetail;
    },
  },
});

export const { setCurrentUploadDetail } = uploadSlice.actions;
export const selectCurrentUploadDetail = (state) =>
  state?.upload?.currentUploadDetail;
export default uploadSlice.reducer;
