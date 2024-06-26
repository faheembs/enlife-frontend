import { createSlice } from "@reduxjs/toolkit";
import { ModuleState } from "./types";
import {
  createOrUpdateModule,
  getAllModulesByUserID,
  getMaxModulesByUserID,
  getModule1Evaluation,
  getQuestionData,
  postQuestionAssessmentByModule,
} from "./modulesAction";

const initialState: ModuleState = {
  module: null,
  questionData: null,
  modulesByUserId: null,
  module1_evaluation:null,
  maxModules:null,
  isLoading: false,
  error: null,
  assessmentResponse: null,
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
      })
      .addCase(getQuestionData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuestionData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questionData = action.payload;
      })
      .addCase(getQuestionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      })
      .addCase(getAllModulesByUserID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllModulesByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modulesByUserId = action.payload;
      })
      .addCase(getAllModulesByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      })
      .addCase(postQuestionAssessmentByModule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postQuestionAssessmentByModule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assessmentResponse = action.payload;
      })
      .addCase(postQuestionAssessmentByModule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      })
      .addCase(getMaxModulesByUserID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMaxModulesByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.maxModules = action.payload;
      })
      .addCase(getMaxModulesByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      }).addCase(getModule1Evaluation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getModule1Evaluation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.module1_evaluation = action.payload;
      })
      .addCase(getModule1Evaluation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An error occurred.";
      });
  },
});

export const moduleReducer = moduleSlice.reducer;
