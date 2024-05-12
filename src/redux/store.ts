import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registrationSlice from "./slices/registrationSlice";

const rootReducer = combineReducers({
  login: registrationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
