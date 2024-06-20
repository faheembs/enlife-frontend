
export interface Feedback {
    _id: string,
    user: string,
    feedback_response: string,
    createdAt: string,
    updatedAt: string,
}
export interface FeedbackBody{
    userId: string;
    feedbackText?: string;
}
export interface ApiError {
    message: string;
  }

export interface FeedbackState {
    feedbackByUserID: Feedback | null;
    isLoading: boolean;
    error: string | null;
  }