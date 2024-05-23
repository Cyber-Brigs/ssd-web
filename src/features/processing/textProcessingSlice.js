import { createSlice } from "@reduxjs/toolkit";

const textProcessingSlice = createSlice({
  name: "textProcessing",
  initialState: {
    currentTextProcessingDetail: null,
  },
  reducers: {
    setCurrentTextProcessingDetail: (state, action) => {
      const { currentTextProcessingDetail } = action.payload;
      state.currentTextProcessingDetail = currentTextProcessingDetail;
    },
  },
});

export const { setCurrentTextProcessingDetail } = textProcessingSlice.actions;
export const selectCurrentTextProcessingDetail = (state) =>
  state?.textProcessing?.currentTextProcessingDetail;
export default textProcessingSlice.reducer;
