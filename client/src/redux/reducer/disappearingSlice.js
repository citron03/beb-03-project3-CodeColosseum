import { createSlice } from "@reduxjs/toolkit";

const disappearingSlice = createSlice({
  name: "disappearingNotification",
  initialState: {
    isVisible: false,
    text: "Text",
  },
  reducers: {
    showDisappearingNoti: (state, actions) => {    
        state.text = actions.payload;
        state.isVisible = true;
    },
    hideDisappearingNoti: (state) => {
        state.isVisible = false;
    },
  },
  extraReducers: {}
});

export const { showDisappearingNoti, hideDisappearingNoti } = disappearingSlice.actions;
export default disappearingSlice.reducer;