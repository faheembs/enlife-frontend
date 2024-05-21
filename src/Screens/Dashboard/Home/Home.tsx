import React from "react";
import { Row, Col, Typography } from "antd";
import {
  MODULES_SUMMARY,
  MODULES_SUMMARY_LABEL,
} from "../../../Utils/constants";
import ModulesCollapse from "../../../Components/CollapsedItem/ModulesCollapse";
// import "./home.css";

const Home: React.FC = () => {
  return (
    <>
      <Row
        justify="space-evenly"
        align="middle"
        style={{
          marginBottom: 20,
        }}
      >
        <Col
          span={11}
          className="moduleContainer"
          style={{
            width: "100%",
            backgroundColor: "#fff",
            // justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            height: 380,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            padding: 10,
          }}
        >
          <Typography.Title level={3}>Module 1 Summary</Typography.Title>
          <ModulesCollapse
            labels={MODULES_SUMMARY_LABEL}
            summaries={MODULES_SUMMARY}
          />
        </Col>
        <Col
          span={11}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center",
            display: "flex",
            height: 380,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            padding: 10,
          }}
        >
          <div style={{ padding: 20 }}>
            <h4>Your fitness vision is: Detailed Definition of Vision</h4>
            <p>
              Explanation: Alignment with Fitness
              <br />
              Value 1: Explanation of hor • Complete Module 3 with this value.{" "}
              <br />• Complete Module 4• Alignment with Fitness Value 2:
              Explanation of hol Compiete Module 5 with this value. <br />•
              Alignment with Fitness Value 3: Explanation of hor with this
              value. 2/5 Mer, Ieting the crteria of a long term aim and
            </p>
          </div>
        </Col>
      </Row>
      <Row justify="space-evenly" align="middle">
        <Col
          span={7}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
          }}
        >
          Module 3
        </Col>
        <Col
          span={7}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
          }}
        >
          {" "}
          Module 4
        </Col>
        <Col
          span={7}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
          }}
        >
          Module 5
        </Col>
      </Row>
    </>
  );
};
export default Home;
