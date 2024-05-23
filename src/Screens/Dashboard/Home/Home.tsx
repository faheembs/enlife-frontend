import React, { useEffect } from "react";
import { Row, Col, Typography } from "antd";
import {
  MODULES_SUMMARY,
  MODULES_SUMMARY_LABEL,
} from "../../../Utils/constants";
import ModulesCollapse from "../../../Components/CollapsedItem/ModulesCollapse";
import { theme } from "../../../Theme/theme";
import { getUserData } from "../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getAllModulesByUserID } from "../../../Redux/Modules/modulesAction";
// import "./home.css";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
  });

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
          sm={11}
          xs={24}
          className="moduleContainer"
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            // justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            height: 380,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            padding: 10,
            marginTop: "10px",
            margin: "5px",
          }}
        >
          <Typography.Title level={3}>Module 1 Summary</Typography.Title>
          <ModulesCollapse
            labels={MODULES_SUMMARY_LABEL}
            summaries={MODULES_SUMMARY}
          />
        </Col>
        <Col
          sm={11}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            justifyContent: "center",
            display: "flex",
            height: 380,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            padding: 10,
            marginTop: "10px",
            margin: "5px",
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
          sm={7}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            marginTop: "10px",
            margin: "5px",
          }}
        >
          Module 3
        </Col>
        <Col
          sm={7}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            marginTop: "10px",
            margin: "5px",
          }}
        >
          {" "}
          Module 4
        </Col>
        <Col
          sm={7}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            marginTop: "10px",
            margin: "5px",
          }}
        >
          Module 5
        </Col>
      </Row>
    </>
  );
};
export default Home;
