import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
      isVisible: false,
      account: {},
  },
  reducers: {
    setAccount: (state, actions) => {
        state.account = actions.payload;
    },
    showSignUp: (state) => {
        state.isVisible = true;
    },
    hideSignUp: (state) => {
        state.isVisible = false;
    },
  },
  extraReducers: {}
});

export const { setAccount, showSignUp, hideSignUp } = signupSlice.actions;
export default signupSlice.reducer;