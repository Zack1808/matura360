import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  isLoggedIn: boolean;
  user: {
    userName: string;
    email: string;
    uid: string;
  } | null;
  isLoading: boolean;
}

const initialState: StateType = {
  isLoggedIn: false,
  user: null,
  isLoading: true,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
});

export default registrationSlice.reducer;
