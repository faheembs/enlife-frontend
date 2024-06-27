/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Divider, Input, Layout, List, Popover, Typography } from "antd";
import {
  MessageOutlined,
  BellOutlined,
  CloseOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { theme } from "../../Theme/theme";
import { useAppDispatch, useAppSelector } from "../../Hooks/reduxHook";
import { getAllModulesByUserID } from "../../Redux/Modules/modulesAction";
import { getUserData, toastMessage } from "../../Utils/helperFunctions";
import { useLocation } from "react-router-dom";
import AppButton from "../Button/AppButton";
import {
  getFeedbackByUserID,
  postFeedback,
} from "../../Redux/Feedback/feedbackAction";

const { Header } = Layout;
const { TextArea } = Input;

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
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { modulesByUserId } = useAppSelector((state: any) => state.module);
  const { feedbackByUserID } = useAppSelector((state: any) => state.feedback);
  const handleVisibleChange = (visible: boolean) => {
    setPopoverVisible(visible);
  };
  const handleFeedbackVisibleChange = (visible: boolean) => {
    setFeedbackVisible(visible);
  };
  const user = getUserData();
  useEffect(() => {
    dispatch(getFeedbackByUserID({ userId: user.id }));
    dispatch(getAllModulesByUserID({ userId: user.id }));
    if (location.pathname === "/") {
      setPopoverVisible(true);
      const module5 =
        modulesByUserId &&
        modulesByUserId.find(
          (module: any) => module.moduleNumber === "Module 5"
        );
      if (module5 && feedbackByUserID == null) {
        setFeedbackVisible(true);
      }
    }
  }, [dispatch, location.pathname, user.id]);
  const onChange = (e: any) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async () => {
    if (feedback === "") {
      toastMessage({
        type: "error",
        content: "Please enter your feedback!",
        duration: 5,
      });
    } else {
      await dispatch(postFeedback({ userId: user.id, feedbackText: feedback }));
      setFeedbackVisible(false);
    }
  };

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

  const feedbackTitle = (
    <Typography.Text style={{ marginTop: "0px", width: "80px" }}>
      We appreciate your feedback!
    </Typography.Text>
  );
  const feedbackContent = (
    <>
      <TextArea
        maxLength={100}
        onChange={onChange}
        placeholder="Enter your feedback"
        style={{
          height: 120,
          margin: "20px 0px",
          resize: "none",
          borderRadius: "20px",
        }}
      />
      <span
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <AppButton text="Submit" onClick={handleFeedbackSubmit} size="small" />
      </span>
    </>
  );
  return (
    <Header
      style={{
        padding: "10px 0px",
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
            style={{ fontSize: 24, color: theme.palette.primary.light }}
          />
        </Popover>
        <Popover
          placement="bottom"
          title={feedbackTitle}
          content={feedbackContent}
          trigger="click"
          onVisibleChange={handleFeedbackVisibleChange}
          visible={feedbackVisible}
          style={{ width: "400px" }}
        >
          <MessageOutlined
            style={{ fontSize: 24, color: theme.palette.primary.light }}
          />
        </Popover>
      </div>
    </Header>
  );
};

export default AppHeader;
