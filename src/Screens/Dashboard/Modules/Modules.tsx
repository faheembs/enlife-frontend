/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense, useEffect, useState } from "react";
import { Col, Row, Spin, Tabs } from "antd";
import type { TabsProps } from "antd";
import FirstModule from "./Modules/FirstModule";
import "./modules.css";
import SecondModule from "./Modules/SecondModule";
import ThirdModule from "./Modules/ThirdModule";
import { MODULES_LABEL } from "../../../Utils/constants";
import FourthModule from "./Modules/FourthModule";
import FifthModule from "./Modules/FifthModule";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getAllModulesByUserID } from "../../../Redux/Modules/modulesAction";
import { getUserData } from "../../../Utils/helperFunctions";
import { useAppSelector } from "../../../Hooks/reduxHook";

const Modules: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
  }, [dispatch, user.id]);
  const { maxModules } = useAppSelector(
    (state: { module: any }) => state.module
  );
  const [activeModule, setActiveModule] = useState("1");
  // console.log("maxModules-----", maxModules.lastQuestion);
  // console.log("activeModule-------", activeModule);
  useEffect(() => {
    if (maxModules !== null) {
      console.log(maxModules.maxModuleNumber);
      setActiveModule(maxModules.maxModuleNumber.toString());
    }
  }, [maxModules]);
  const items: TabsProps["items"] = [
    {
      key: MODULES_LABEL.firstModule.key,
      label: MODULES_LABEL.firstModule.label,
      children: <FirstModule activeKey={setActiveModule} />,
    },
    {
      key: MODULES_LABEL.secondModule.key,
      label: MODULES_LABEL.secondModule.label,
      children: <SecondModule activeKey={setActiveModule} />,
    },
    {
      key: MODULES_LABEL.thirdModule.key,
      label: MODULES_LABEL.thirdModule.label,
      children: <ThirdModule activeKey={setActiveModule} />,
    },
    {
      key: MODULES_LABEL.fourthModule.key,
      label: MODULES_LABEL.fourthModule.label,
      children: <FourthModule activeKey={setActiveModule} />,
    },
    {
      key: MODULES_LABEL.fifthModule.key,
      label: MODULES_LABEL.fifthModule.label,
      children: <FifthModule />,
    },
  ];

  const onChange = (key: string) => {
    console.log("key", key);
    setActiveModule(key);
  };

  return (
    <Suspense
      fallback={
        false && (
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
        )
      }
    >
      <Row align="middle" justify={"center"}>
        <Col span={20}>
          <Tabs
            defaultActiveKey={activeModule}
            activeKey={activeModule}
            items={items}
            centered={true}
            onChange={onChange}
            tabPosition="top"
            tabBarStyle={{
              borderTop: "1px solid #fff",
              borderBottom: "1px solid #fff",
            }}
          />
        </Col>
      </Row>
    </Suspense>
  );
};

export default Modules;
