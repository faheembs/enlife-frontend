/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from "react";
import { Col, Row, Spin, Tabs } from "antd";
import type { TabsProps } from "antd";
import FirstModule from "./Modules/FirstModule";
import "./modules.css";
import SecondModule from "./Modules/SecondModule";
import ThirdModule from "./Modules/ThirdModule";
import { MODULES_LABEL } from "../../../Utils/constants";
import FourthModule from "./Modules/FourthModule";
import FifthModule from "./Modules/FifthModule";

const Modules: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: MODULES_LABEL.firstModule.key,
      label: MODULES_LABEL.firstModule.label,
      children: <FirstModule />,
    },
    {
      key: MODULES_LABEL.secondModule.key,
      label: MODULES_LABEL.secondModule.label,
      children: <SecondModule />,
    },
    {
      key: MODULES_LABEL.thirdModule.key,
      label: MODULES_LABEL.thirdModule.label,
      children: <ThirdModule />,
    },
    {
      key: MODULES_LABEL.fourthModule.key,
      label: MODULES_LABEL.fourthModule.label,
      children: <FourthModule />,
    },
    {
      key: MODULES_LABEL.fifthModule.key,
      label: MODULES_LABEL.fifthModule.label,
      children: <FifthModule />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
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
      <Row align="middle" justify={"center"} style={{ marginTop: 10 }}>
        <Col span={20}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            centered={true}
            onChange={onChange}
            tabPosition="top"
            tabBarStyle={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          />
        </Col>
      </Row>
    </Suspense>
  );
};

export default Modules;
