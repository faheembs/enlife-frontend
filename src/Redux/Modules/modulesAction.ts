import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiError,
  Module,
  ModuleBody,
  QuestionData,
  QuestionDataBody,
  UserId,
} from "./types";
import { BASE_URL, ENDPOINTS } from "../../Utils/urls";
import { toastMessage } from "../../Utils/helperFunctions";

export const createOrUpdateModule = createAsyncThunk<
  Module,
  ModuleBody,
  { rejectValue: ApiError }
>("module/create", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.CREATE_MODULE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.moduleNumber) {
      // toastMessage({
      //   type: "error",
      //   content: "Module creation failed",
      //   duration: 5,
      // });

      return rejectWithValue({
        message: "Module creation failed",
      });
    }
    toastMessage({
      type: "success",
      content: "Your response has been saved successfully",
      duration: 4,
    });
    return apiResponse;
  } catch (error) {
    return rejectWithValue({
      message: "An error occurred during module creation",
    });
  }
});

export const getQuestionData = createAsyncThunk<
  QuestionData,
  QuestionDataBody,
  { rejectValue: ApiError }
>("module/get-question", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_QUESTION_DATA}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.data) {
      return rejectWithValue({
        message: "Module creation failed",
      });
    }
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({
      message: "An error occurred during module creation",
    });
  }
});

export const getAllModulesByUserID = createAsyncThunk<
  Module,
  UserId,
  { rejectValue: ApiError }
>("module/userId", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.ALL_MODULES_BY_USER_ID}${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
      return rejectWithValue({
        message: "An error occurred",
      });
    }
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const getMaxModulesByUserID = createAsyncThunk<
  Module,
  UserId,
  { rejectValue: ApiError }
>("module/max", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.MAX_MODULES_BY_USER_ID}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
      return rejectWithValue({
        message: "An error occurred",
      });
    }
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
export const getModule1Evaluation = createAsyncThunk<
  Module,
  UserId,
  { rejectValue: ApiError }
>("module/module1", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.MODULE1_EVALUATION}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
      return rejectWithValue({
        message: "An error occurred",
      });
    }
    return apiResponse.coreValues;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const postQuestionAssessmentByModule = createAsyncThunk<
  Module,
  UserId,
  { rejectValue: ApiError }
>("module/assessment", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.MODULE_ASSESSMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      return rejectWithValue({
        message: "An error occurred",
      });
    }
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const postQuestionAssessmentModule3 = createAsyncThunk<
  Module,
  any,
  { rejectValue: ApiError }
>("module/assessment-for-module3", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.MODULE_ASSESSMENT_3}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      return rejectWithValue({
        message: "An error occurred",
      });
    }
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const regenarateResponse = createAsyncThunk<
  Module,
  any,
  { rejectValue: ApiError }
>("module/REGENARATE_RESPONSE", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.REGENARATE_RESPONSE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      return rejectWithValue({
        message: "An error occurred",
      });
    }
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const postQuestionAssessmentModule5 = createAsyncThunk<
  Module,
  unknown,
  { rejectValue: any }
>("module/assessment-for-module3", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.MODULE_ASSESSMENT_5}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      return rejectWithValue({
        message: "An error occurred",
      });
    }
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});