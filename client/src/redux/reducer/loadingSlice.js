import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
      isLoading: false,
      text: "로딩중입니다."
  },
  reducers: {
    onLoading: (state, actions) => {
        if(actions.payload){
          state.text = actions.payload;
        }
        state.isLoading = true;
    },
    offLoading: (state) => {
        state.text = "로딩중입니다."
        state.isLoading = false;
    }
  },
  extraReducers: {}
});

export const { onLoading, offLoading } = loadingSlice.actions;
export default loadingSlice.reducer;