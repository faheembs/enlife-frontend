import React, { Suspense } from "react";
import { Layout, Spin, theme } from "antd";
import AppSidebar from "../Components/AppSidebar/AppSidebar";
import AppHeader from "../Components/AppHeader/AppHeader";
import { Images } from "../Utils/constants";
import { Box } from "@mui/material";

const { Content } = Layout;

const AdminLayout: React.FC<{
  children: React.ReactNode;
  screenName: string;
}> = ({ children, screenName }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <AppSidebar />
      <Layout style={{ backgroundColor: "transparent" }}>
        <AppHeader colorBgContainer={"transparent"} screenName={screenName} />
        <Content
          style={{
            paddingTop: 20,
            height: "100%",
            // background: "#e7e7e7",
            backgroundColor: "transparent",
          }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin size="large" />
              </div>
            }
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${Images.bckImg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                filter: "blur(8px)",
                zIndex: -1,
              }}
            />
            {children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
