import React from "react";
import { Layout, Typography } from "antd";
import { MessageOutlined, BellOutlined } from "@ant-design/icons";
import { theme } from "../../Theme/theme";

const { Header } = Layout;

interface AppHeaderProps {
  children?: any;
  colorBgContainer: any;
  screenName: any;
}
const AppHeader = ({
  children,
  colorBgContainer,
  screenName,
}: AppHeaderProps) => {
  return (
    <Header
      style={{
        padding: "50px 0px",
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography.Title
        level={3}
        style={{ marginLeft: "20px", color: theme.palette.primary.light }}
      >
        {screenName === "Modules" ? "" : screenName}
      </Typography.Title>
      <div
        style={{
          width: 160,
          justifyContent: "space-evenly",
          alignItems: "center",
          display: "flex",
        }}
      >
        <BellOutlined
          style={{ fontSize: 32, color: theme.palette.primary.light }}
        />
        <MessageOutlined
          style={{ fontSize: 32, color: theme.palette.primary.light }}
        />
      </div>
    </Header>
  );
};

export default AppHeader;
