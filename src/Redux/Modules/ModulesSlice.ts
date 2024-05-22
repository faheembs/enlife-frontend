import { createSlice } from "@reduxjs/toolkit";
import {  ModuleState } from "./types";
import { createOrUpdateModule } from "./modulesAction";

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
      .addCase(createOrUpdateModule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrUpdateModule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.module = action.payload;
      })
      .addCase(createOrUpdateModule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      });
  },
});

export const moduleReducer = moduleSlice.reducer;
