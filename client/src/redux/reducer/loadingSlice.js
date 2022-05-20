import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
      isLoading: false,
      text: "Loading..."
  },
  reducers: {
    onLoading: (state, actions) => {
        if(actions.payload){
          state.text = actions.payload;
        }
        state.isLoading = true;
    },
    offLoading: (state) => {
        state.text = "Loading..."
        state.isLoading = false;
    }
  },
  extraReducers: {}
});

export const { onLoading, offLoading } = loadingSlice.actions;
export default loadingSlice.reducer;