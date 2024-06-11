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
  const { modulesByUserId } = useAppSelector((state: any) => state.module);
  const handleVisibleChange = (visible: boolean) => {
    setPopoverVisible(visible);
  };
  const user = getUserData();
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
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
  console.log(filtered);
  console.log(complete);
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
            }}
          >
            {complete.includes(item) ? (
              <CheckCircleFilled
                style={{ color: "green", marginRight: "10px" }}
              />
            ) : (
              <span
                style={{
                  height: "10px",
                  width: "10px",
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
