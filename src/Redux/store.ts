import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/authSlice";
import { moduleReducer } from "./Modules/ModulesSlice";
import { feedbackReducer } from "./Feedback/feedbackSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    module: moduleReducer,
    feedback: feedbackReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
