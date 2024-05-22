import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError, Module, ModuleBody } from "./types";
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
      toastMessage({
        type: "error",
        content: "Module creation failed",
        duration: 5,
      });

      return rejectWithValue({
        message: "Module creation failed",
      });
    }

    return apiResponse;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred during module creation" });
  }
});