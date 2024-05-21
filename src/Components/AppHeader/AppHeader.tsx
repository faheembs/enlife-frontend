import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography } from "antd";
import { MessageOutlined, BellOutlined } from "@ant-design/icons";

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
      <Typography.Title level={3} style={{ marginLeft: "20px" }}>
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
        <BellOutlined style={{ fontSize: 32 }} />
        <MessageOutlined style={{ fontSize: 32 }} />
      </div>
    </Header>
  );
};

export default AppHeader;
