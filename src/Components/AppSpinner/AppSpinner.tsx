import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { theme } from "../../Theme/theme";

interface AppSpinnerProps {
  color?: string;
  size?: number;
}

const AppSpinner = ({
  size = 24,
  color = theme.palette.primary.light,
}: AppSpinnerProps) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: size, color: color }} spin />
      }
    />
  );
};

export default AppSpinner;
