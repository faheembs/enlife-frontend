/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from "react";
import { Divider, Layout, List, Popover, Typography, notification } from "antd";
import {
  MessageOutlined,
  BellOutlined,
  CloseOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { theme } from "../../Theme/theme";
import { useAppDispatch, useAppSelector } from "../../Hooks/reduxHook";
import { getAllModulesByUserID } from "../../Redux/Modules/modulesAction";
import { getUserData } from "../../Utils/helperFunctions";
import { useLocation } from "react-router-dom";

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
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { modulesByUserId } = useAppSelector((state: any) => state.module);
  const handleVisibleChange = (visible: boolean) => {
    setPopoverVisible(visible);
  };
  const user = getUserData();
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
    setPopoverVisible(true);
  }, []);
  const title = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text style={{ marginTop: "0px" }}>
          Welcome to enlife!
        </Typography.Text>
        <CloseOutlined onClick={() => handleVisibleChange(false)} />
      </div>
      <Divider />
    </>
  );
  const handleModuleClick = (moduleNumber: string) => {
    const currentIndex = completedModules.indexOf(moduleNumber);
    const newCompletedModules = [...completedModules];

    if (currentIndex === -1) {
      newCompletedModules.push(moduleNumber);
    } else {
      newCompletedModules.splice(currentIndex, 1);
    }

    setCompletedModules(newCompletedModules);
  };
  let complete: any[] = [];
  const filtered =
    modulesByUserId &&
    modulesByUserId.map((module: any) => complete.push(module.moduleNumber));
  let modules = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];
  const content = (
    <>
      <Typography.Text>Let's get the magic started</Typography.Text>
      <List
        dataSource={modules}
        renderItem={(item) => (
          <List.Item
            key={item}
            onClick={() => handleModuleClick(item)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              border: "none",
              padding: "5px 0px",
            }}
          >
            {complete.includes(item) ? (
              <CheckCircleFilled
                style={{ color: "green", marginRight: "10px" }}
              />
            ) : (
              <span
                style={{
                  height: "12px",
                  width: "12px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  border: "1px solid black",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              />
            )}
            {`Complete ${item}`}
          </List.Item>
        )}
      />
      <Divider />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography.Text
          onClick={() => setPopoverVisible(false)}
          style={{ textAlign: "center", cursor: "pointer" }}
        >
          Don't show this again
        </Typography.Text>
      </div>
    </>
  );

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
        <Popover
          placement="bottom"
          title={title}
          content={content}
          trigger="click"
          onVisibleChange={handleVisibleChange}
          visible={popoverVisible}
          style={{ width: "400px" }}
        >
          <BellOutlined
            style={{ fontSize: 32, color: theme.palette.primary.light }}
          />
        </Popover>
        <MessageOutlined
          style={{ fontSize: 32, color: theme.palette.primary.light }}
        />
      </div>
    </Header>
  );
};

export default AppHeader;
