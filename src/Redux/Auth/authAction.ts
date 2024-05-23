import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  User,
  LoginCredentials,
  ApiError,
  SocialCredentials,
  RegisterCredentials,
} from "./types";
import { toastMessage } from "../../Utils/helperFunctions";
import { BASE_URL, ENDPOINTS } from "../../Utils/urls";
import { USER_AUTH_TOKEN_KEY, USER_SESSION_KEY } from "../../Utils/constants";

export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: ApiError }
>("auth/login", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
      method: "POST",
      // mode: 'no-cors',
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
      toastMessage({
        type: "error",
        content: "Login failed. Email or password not correct",
        duration: 5,
      });

      return rejectWithValue({
        message: "Login failed. Email or password not correct",
      });
    }
    localStorage.setItem(USER_AUTH_TOKEN_KEY, apiResponse.token?.token);
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(apiResponse.data));

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred during login" });
  }
});

export const socialLogin = createAsyncThunk<
  User,
  SocialCredentials,
  { rejectValue: ApiError }
>("auth/social", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.SOCIAL_LOGIN}`, {
      method: "POST",
      // mode: 'no-cors',
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
      toastMessage({
        type: "error",
        content: "Login failed. Email or password not correct",
        duration: 5,
      });

      return rejectWithValue({
        message: "Login failed. Email or password not correct",
      });
    }
    localStorage.setItem(USER_AUTH_TOKEN_KEY, apiResponse.token?.token);
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(apiResponse.data));

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred during login" });
  }
});

export const registerUser = createAsyncThunk<
  User,
  RegisterCredentials,
  { rejectValue: ApiError }
>("auth/register", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.REGISTER}`, {
      method: "POST",
      // mode: 'no-cors',
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
      toastMessage({
        type: "error",
        content: "Registeration failed. Email or password not correct",
        duration: 5,
      });

      return rejectWithValue({
        message: "Registeration failed. Email or password not correct",
      });
    }

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred during login" });
  }
});
