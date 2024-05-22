import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { USER_AUTH_TOKEN_KEY, USER_SESSION_KEY } from "./constants";

interface ToastMessageParams {
  type?: NoticeType;
  content: string;
  duration?: number;
}

// Toast messages
export const toastMessage = ({
  type,
  content,
  duration,
}: ToastMessageParams): void => {
  message.open({
    type,
    content,
    duration,
  });
};

export const getToken = () => {
  const token = localStorage.getItem(USER_AUTH_TOKEN_KEY);
  return token;
};

export const getUserData = () => {
  const user = localStorage.getItem(USER_SESSION_KEY);
  const userData = user !== null && JSON.parse(user);
  return userData;
};
