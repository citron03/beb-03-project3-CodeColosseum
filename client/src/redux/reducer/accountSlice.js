import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAccount = createAsyncThunk("account/getAddress", async () => {
    if (window.klaytn !== 'undefined') {
        if (window.klaytn.isKaikas) {
            const accounts = await window
                .klaytn
                .enable()
            return accounts[0];
        }
    } else {
        // 없음
        alert("No Kaikas!");
        return "";
    }
});

const accountSlice = createSlice({
  name: "account",
  initialState: {
      nickname: "",
      account: "",
      error: ""
  },
  reducers: {
    logout: (state, action) => {
        state.account = "";
    },
    changeNickName: (state, action) => {
        state.nickname = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchAccount.pending, (state, action) => {
            state.account = "";
            state.nickname = "";
        })
        .addCase(fetchAccount.fulfilled, (state, action) => {
            state.account = action.payload;
            state.nickname = action.payload.slice(action.payload.length - 4);
        })
        .addCase(fetchAccount.rejected, (state, action) => {
            state.account = "";
            state.nickname = "";
            state.error = action.error;
        })
  },
});

export const { logout, changeNickName } = accountSlice.actions;
export default accountSlice.reducer;