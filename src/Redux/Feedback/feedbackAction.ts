import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError, Feedback, FeedbackBody } from "./types";
import { BASE_URL, ENDPOINTS } from "../../Utils/urls";
import { getToken, toastMessage } from "../../Utils/helperFunctions";

const token = getToken()
export const postFeedback = createAsyncThunk<
  Feedback,
  FeedbackBody,
  { rejectValue: ApiError }
>("feedback/post", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.POST_FEEDBACK}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
if(response.status === 409){
    toastMessage({
        type: "success",
        content: "You have already submitted your feedback!",
        duration: 5,
      });
}
    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: "Error while posting feedback!",
        duration: 5,
      });

      return rejectWithValue({
        message: "Error while posting feedback!",
      });
    }
    toastMessage({
        type: "success",
        content: "Feedback submitted successfully!",
        duration: 5,
      });
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred while posting feedback!" });
  }
});

export const getFeedbackByUserID = createAsyncThunk<
  Feedback,
  FeedbackBody,
  { rejectValue: ApiError }
>("feedback/post", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_FEEBACK_BY_USER_ID}/${body.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });


    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
    //   toastMessage({
    //     type: "error",
    //     content: "Error while posting feedback!",
    //     duration: 5,
    //   });

      return rejectWithValue({
        message: "Error while posting feedback!",
      });
    }
    return apiResponse.feedbacks;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred while posting feedback!" });
  }
});