import React, { useState } from "react";
import { Button, Modal } from "antd";
import AppButton from "../Button/AppButton";

interface AppModalProps {
  status: boolean;
  title: string;
  descritpion: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const AppModal = ({
  title,
  descritpion,
  onCancel,
  onConfirm,
  status,
  isLoading = false,
}: AppModalProps) => {
  return (
    <Modal
      title={title}
      open={status}
      confirmLoading={isLoading}
      onCancel={onCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <AppButton
            borderColor={"red"}
            bgColor={"transparent"}
            textStyle={{ color: "red" }}
            onClick={onConfirm}
          >
            Confirm
          </AppButton>
        </>
      )}
    >
      <p>{descritpion}</p>
    </Modal>
  );
};

export default AppModal;
