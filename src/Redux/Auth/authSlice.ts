// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { loginUser, socialLogin } from "./authAction";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      });

    builder
      .addCase(socialLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(socialLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      });
  },
});

export const authReducer = authSlice.reducer;
