import React, { useState } from "react";
import { theme as customTheme } from "../../Theme/theme";
import { Images, LOADING_TIMOUT_DELAY } from "../../Utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import AppModal from "../AppModal/AppModal";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
  subMenu?: MenuItem[];
}
const AppSidebar: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { t } = useTranslation("translation", { keyPrefix: "logout" });
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogout, setLogout] = useState(false);

  const menuItems: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined style={{ fontSize: 24 }} />,
      label: "Home",
      path: "/",
    },
    {
      key: "2",
      icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
      label: "Modules",
      path: "/modules",
    },
  ];

  const bottomMenu: MenuItem[] = [
    {
      key: "3",
      icon: <UserOutlined style={{ fontSize: 24 }} />,
      label: "Profile",
      path: "/profile",
    },
    {
      key: "4",
      icon: <SettingOutlined style={{ fontSize: 24 }} />,
      label: "Settings",
      path: "/settings",
    },
    {
      key: "5",
      icon: <LogoutOutlined style={{ fontSize: 24 }} />,
      label: "Logout",
      path: "/logout",
    },
  ];

  const handleNavigate = (path: string) => {
    if (path === "/logout") {
      handleLogoutModal(true);

      return;
    }
    navigate(path);
  };

  const handleLogoutModal = (status: boolean) => {
    setLogout(status);
  };

  const handleLogout = () => {
    handleLogoutModal(false);
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, LOADING_TIMOUT_DELAY);
  };

  const selectedKey =
    menuItems.find((item) => item.path === location.pathname)?.key ||
    bottomMenu.find((item) => item.path === location.pathname)?.key;

  return (
    <Sider
      style={{
        backgroundColor: customTheme.palette.primary.main,
      }}
      width={220}
      collapsedWidth={100}
      collapsed={false}
    >
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            src={Images.logo}
            alt="logo"
            style={{
              objectFit: "contain",
              marginLeft: "27px",
              marginTop: 12,
              marginBottom: 30,
            }}
            width={160}
            height={160}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={[selectedKey || "1"]}
            mode="inline"
            style={{ backgroundColor: customTheme.palette.primary.main }}
          >
            {menuItems.map((item) => {
              return (
                <Menu.Item
                  style={{
                    marginBottom: 10,
                    height: 44,
                    color:
                      selectedKey === item.key
                        ? customTheme.palette.primary.main
                        : customTheme.palette.primary.light,
                    backgroundColor:
                      selectedKey === item.key
                        ? customTheme.palette.primary.light
                        : customTheme.palette.primary.main,
                  }}
                  onClick={() => handleNavigate(item.path)}
                  key={item.key}
                >
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {item.icon}
                    <Typography
                      style={{
                        marginLeft: 10,
                        color:
                          selectedKey === item.key
                            ? customTheme.palette.primary.main
                            : customTheme.palette.primary.light,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </div>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            backgroundColor: customTheme.palette.primary.main,
            alignItems: "flex-end",
          }}
        >
          {bottomMenu.map((item) => {
            return (
              <Menu.Item
                style={{
                  marginBottom: 10,
                  height: 44,
                  color:
                    selectedKey === item.key
                      ? customTheme.palette.primary.main
                      : customTheme.palette.primary.light,
                  backgroundColor:
                    selectedKey === item.key
                      ? customTheme.palette.primary.light
                      : customTheme.palette.primary.main,
                }}
                onClick={() => handleNavigate(item.path)}
                key={item.key}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {item.icon}
                  <Typography
                    style={{
                      marginLeft: 10,
                      color:
                        selectedKey === item.key
                          ? customTheme.palette.primary.main
                          : customTheme.palette.primary.light,
                    }}
                  >
                    {item.label}
                  </Typography>
                </div>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      <AppModal
        title={t("title")}
        descritpion={t("description")}
        status={isLogout}
        onCancel={() => handleLogoutModal(false)}
        onConfirm={() => handleLogout()}
      />
    </Sider>
  );
};

export default AppSidebar;
