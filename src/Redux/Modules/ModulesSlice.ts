import { createSlice } from "@reduxjs/toolkit";
import {  ModuleState } from "./types";
import { createModule } from "./modulesAction";

const initialState: ModuleState = {
  module: null,
  isLoading: false,
  error: null,
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createModule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createModule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.module = action.payload;
      })
      .addCase(createModule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      });
  },
});

export const moduleReducer = moduleSlice.reducer;
