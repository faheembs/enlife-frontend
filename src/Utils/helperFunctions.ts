import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";

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
  const token = localStorage.getItem("token");
  return token;
};

export const getUserData = () => {
  const user = localStorage.getItem("user");
  const userData = user !== null && JSON.parse(user);
  return userData;
};
