import { createSlice } from "@reduxjs/toolkit";

const similarityResultSlice = createSlice({
  name: "similarityResult",
  initialState: {
    currentSimilarityResult: null,
  },
  reducers: {
    setCurrentSimilarityResult: (state, action) => {
      const { currentSimilarityResult } = action.payload;
      state.currentSimilarityResult = currentSimilarityResult;
    },
  },
});

export const { setCurrentSimilarityResult } = similarityResultSlice.actions;
export const selectCurrentSimilarityResult = (state) =>
  state?.similarityResult?.currentSimilarityResult;
export default similarityResultSlice.reducer;
