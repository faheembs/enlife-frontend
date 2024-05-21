import React, { Suspense } from "react";
import { Layout, Spin, theme } from "antd";
import AppSidebar from "../Components/AppSidebar/AppSidebar";
import AppHeader from "../Components/AppHeader/AppHeader";

const { Content } = Layout;

const AdminLayout: React.FC<{
  children: React.ReactNode;
  screenName: string;
}> = ({ children, screenName }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar />
      <Layout>
        <AppHeader colorBgContainer={"#e7e7e7"} screenName={screenName} />
        <Content
          style={{
            paddingTop: 20,
            height: "100%",
            background: "#e7e7e7",
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
            {children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
