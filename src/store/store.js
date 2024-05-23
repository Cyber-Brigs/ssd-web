import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "../features/user/userSlice";
import uploadSlice from "../features/upload/uploadSlice";
import textProcessingSlice from "../features/processing/textProcessingSlice";
import similarityResultSlice from "../features/result/similarityResultSlice";
const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  // your apps' top-level reducers
  user: userSlice,
  upload: uploadSlice,
  textProcessing: textProcessingSlice,
  similarityResult: similarityResultSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
