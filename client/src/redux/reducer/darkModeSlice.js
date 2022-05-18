import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
      isDarkMode: true,
  },
  reducers: {
    modeChange: (state) => {
        state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: {}
});

export const { modeChange } = darkModeSlice.actions;
export default darkModeSlice.reducer;