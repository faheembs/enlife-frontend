import { FeedbackState } from './types';
import { createSlice } from "@reduxjs/toolkit";
import { getFeedbackByUserID } from "./feedbackAction";

const initialState: FeedbackState = {
  feedbackByUserID: null,
  isLoading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbackByUserID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedbackByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbackByUserID = action.payload;
      })
      .addCase(getFeedbackByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      });
  },
});

export const feedbackReducer = feedbackSlice.reducer;
