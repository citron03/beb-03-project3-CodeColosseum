import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
      isPopUp: false,
  },
  reducers: {
    mapPopUpControll: (state) => {
        state.isPopUp = !state.isPopUp;
    },
  },
  extraReducers: {}
});

export const { mapPopUpControll } = mapSlice.actions;
export default mapSlice.reducer;