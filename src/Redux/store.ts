import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/authSlice";
import { moduleReducer } from "./Modules/ModulesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    module: moduleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
