import React from "react";
import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps } from "antd/lib/button";
import { theme } from "../../Theme/theme";
import AppSpinner from "../AppSpinner/AppSpinner";

interface ButtonProps extends AntButtonProps {
  textStyle?: React.CSSProperties;
  text?: string;
  preset?: "primary" | "secondary";
  disabled?: boolean;
  error?: boolean;
  onClick?: () => void;
  loading?: boolean;
  size?: "small" | "middle" | "large";
  bgColor?: string;
  borderColor?: string;
  color?: string;
  spinnerColor?: string;
}

const AppButton: React.FC<ButtonProps> = ({
  textStyle: textStyleOverride,
  preset = "primary",
  text,
  children,
  disabled,
  error,
  onClick,
  loading,
  size = "middle",
  bgColor = theme.palette.primary.main,
  borderColor = "none",
  color = theme.palette.primary.light,
  spinnerColor = theme.palette.primary.light,
  ...rest
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: color,
    boxShadow: "none",
    borderColor: borderColor,
    ...textStyleOverride,
  };

  return (
    <AntButton
      type="primary"
      size={size}
      disabled={disabled}
      style={buttonStyle}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <AppSpinner color={spinnerColor} />
      ) : (
        children || text || "Button Text"
      )}
    </AntButton>
  );
};

export default AppButton;
