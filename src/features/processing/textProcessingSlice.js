import { createSlice } from "@reduxjs/toolkit";

const textProcessingSlice = createSlice({
  name: "textProcessing",
  initialState: {
    currentTextProcessingDetail: null,
    modelId: null,
    processingId: null,
    docName: null,
    pathPresent: null,
  },
  reducers: {
    setCurrentTextProcessingDetail: (state, action) => {
      const { currentTextProcessingDetail } = action.payload;
      state.currentTextProcessingDetail = currentTextProcessingDetail;
    },
    setModelId: (state, action) => {
      const { modelId } = action.payload;
      state.modelId = modelId;
    },
    setProcessingId: (state, action) => {
      const { processingId } = action.payload;
      state.processingId = processingId;
    },
    setDocName: (state, action) => {
      const { docName } = action.payload;
      state.docName = docName;
    },
    setPathPresent: (state, action) => {
      const { pathPresent } = action.payload;
      state.pathPresent = pathPresent;
    },
  },
});

export const {
  setCurrentTextProcessingDetail,
  setModelId,
  setProcessingId,
  setDocName,
  setPathPresent,
} = textProcessingSlice.actions;
export const selectCurrentTextProcessingDetail = (state) =>
  state?.textProcessing?.currentTextProcessingDetail;
export const selectModelId = (state) => state?.textProcessing?.modelId;
export const selectProcessingId = (state) =>
  state?.textProcessing?.processingId;
export const selectDocName = (state) => state?.textProcessing?.docName;
export const selectPathPresent = (state) => state?.textProcessing?.pathPresent;
export default textProcessingSlice.reducer;
