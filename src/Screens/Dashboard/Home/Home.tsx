/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Row, Col, Typography, List } from "antd";
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
import { useAppSelector } from "../../../Hooks/reduxHook";
import ReactHtmlString from "../../../Components/ReactHtmlString/ReactHtmlString";
// import "./home.css";

interface Label {
  key: string;
  label: string;
}

interface Summary {
  explanationHeading: string;
  explanationText: string;
}

const Home: React.FC = () => {
  const [labels, setLabels] = useState<any>({});
  const [summaries, setSummaries] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const { modulesByUserId } = useAppSelector((state: any) => state.module);
  const user = getUserData();
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
  }, [dispatch, user.id]);
  const module1 =
    modulesByUserId &&
    modulesByUserId.length > 0 &&
    modulesByUserId.find((module: any) => module.moduleNumber === "Module 1");

  useEffect(() => {
    if (modulesByUserId && modulesByUserId.length > 0) {
      const formattedLabels: Record<string, Label> = {};
      const formattedSummaries: Record<string, Summary[]> = {};

      const module1 = modulesByUserId.find(
        (module: any) => module.moduleNumber === "Module 1"
      );

      if (
        module1 &&
        module1.ai_evaluation &&
        module1.ai_evaluation.response_text
      ) {
        const { response_text } = module1.ai_evaluation;
        if (response_text) {
          const coreValuesPattern =
            /Core Value (\d+):\s*([^\n\r]+?)\s*-\s*([^\n\r]+?)(?=\n|$)/g;

          let match;
          let i = 0;
          while (
            (match = coreValuesPattern.exec(response_text)) !== null &&
            i < 3
          ) {
            const [, valueNumber, heading, description, additionalInfo] = match;

            const label = `Core Value ${valueNumber}: ${heading.split(" ")[0]}`;
            formattedLabels[`label${i + 1}`] = { key: valueNumber, label };

            formattedSummaries[`ModuleSummary${i + 1}`] = [
              {
                explanationHeading: heading,
                explanationText: `${description} ${additionalInfo}`,
              },
            ];

            i++;
          }
        }
      }
      setLabels(formattedLabels);
      setSummaries(formattedSummaries);
    }
  }, [modulesByUserId]);

  const module2 =
    modulesByUserId &&
    modulesByUserId.find((module: any) => module.moduleNumber === "Module 2");
  const module3 =
    modulesByUserId &&
    modulesByUserId.find((module: any) => module.moduleNumber === "Module 3");
  const module4 =
    modulesByUserId &&
    modulesByUserId.find((module: any) => module.moduleNumber === "Module 4");
  const module5 =
    modulesByUserId &&
    modulesByUserId.find((module: any) => module.moduleNumber === "Module 5");

  let module4Values = null;

  let keys = null;
  let values = null;
  // console.log("3", JSON.parse(module3.ai_evaluation.response_html));
  if (module3 && module3.ai_evaluation.response_html) {
    const [key, value]: [any, any] = Object.entries(
      JSON.parse(module3.ai_evaluation.response_html)
    )[0];
    keys = key;
    values = value;
  }
  if (module4 && module4.ai_evaluation.response_text) {
    module4Values = module4.ai_evaluation.response_text;
  }

  const summary =
    module2 && module2.ai_evaluation.response_html
      ? module2.ai_evaluation.response_html
      : "";
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
          {/* {console.log(module1.ai_evaluation.response_text)} */}
          {module1 && module1.ai_evaluation.response_text && (
            <div style={{ overflowY: "auto", height: 299 }}>
              <ModulesCollapse />
            </div>
          )}
        </Col>
        <Col
          sm={11}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            height: 380,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            padding: 10,
            marginTop: "10px",
            margin: "5px",
          }}
        >
          <Typography.Title style={{ padding: "0px 20px" }} level={3}>
            Module 2 Summary
          </Typography.Title>
          {module2 && module2.ai_evaluation.response_html && (
            <div
              style={{ padding: "0px 20px", overflowY: "scroll", height: 270 }}
            >
              <ReactHtmlString html={summary ?? ""} />
            </div>
          )}
        </Col>
      </Row>
      <Row justify="space-evenly" align="middle">
        <Col
          sm={7}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            marginTop: "10px",
            margin: "5px",
          }}
        >
          <Typography.Title
            style={{
              padding: "0px 20px",
              justifyContent: "center",
              display: "flex",
            }}
            level={3}
          >
            Module 3 Summary
          </Typography.Title>
          {module3 && module3.ai_evaluation.response_html && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "3px 15px",
                }}
              >
                <span>Who do you want to be?</span>
                <Typography.Text
                  style={{
                    padding: "10px 0px",
                    justifyContent: "flex-start",
                    // alignItems: "center",
                    display: "flex",
                    fontWeight: "bold",
                  }}
                >
                  {keys}
                </Typography.Text>
              </div>
              {/* <List
                dataSource={values}
                renderItem={(item: any, index: number) => {
                  return (
                    <List.Item
                      style={{
                        display: "flex",
                        padding: "10px",
                        flexDirection: "row",
                        border: "none",
                      }}
                      key={index}
                    >
                      <ul style={{ width: "600px" }}>
                        <li>
                          <Typography.Text>{item}</Typography.Text>
                        </li>
                      </ul>
                    </List.Item>
                  );
                }}
              /> */}
              <Typography.Text
                style={{
                  padding: "0px 10px",
                  justifyContent: "flex-start",
                  display: "flex",
                  overflowY: "auto",
                  maxHeight: 170,
                }}
              >
                {values}
              </Typography.Text>
            </>
          )}
        </Col>
        <Col
          sm={7}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            marginTop: "10px",
            margin: "5px",
          }}
        >
          <Typography.Title
            style={{
              padding: "0px 20px",
              justifyContent: "center",
              // alignItems: "center",
              display: "flex",
            }}
            level={3}
          >
            Module 4 Summary
          </Typography.Title>
          {module4 && module4.ai_evaluation.response_text && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "space-between",
                  justifyContent: "center",
                  padding: "3px 15px",
                }}
              >
                <span>Your selected Fitness Journey Plan:</span>
              </div>
              {/* <List
                dataSource={module4Values}
                renderItem={(item: any, index: number) => {
                  return (
                    <List.Item
                      style={{
                        display: "flex",
                        padding: "10px",
                        flexDirection: "row",
                        border: "none",
                      }}
                      key={index}
                    > */}
              <ul
                style={{
                  overflowY: "auto",
                  maxHeight: 170,
                }}
              >
                <li>
                  <Typography.Text>{module4Values}</Typography.Text>
                </li>
              </ul>
              {/* </List.Item> */}
              {/* ); */}
              {/* }} */}
              {/* /> */}
            </>
          )}
        </Col>
        <Col
          sm={7}
          xs={24}
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,

            height: 320,
            borderRadius: 20,
            boxShadow: "#9e9e9e73 0px 2px 4px 2px",
            marginTop: "10px",
            margin: "5px",
          }}
        >
          <Typography.Title
            style={{
              padding: "0px 20px",
              justifyContent: "center",
              // alignItems: "center",
              display: "flex",
            }}
            level={3}
          >
            Module 5 Summary
          </Typography.Title>
          {module5 && module5.ai_evaluation.response_text && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "space-between",
                  justifyContent: "center",
                  padding: "3px 15px",
                }}
              >
                <span>You selected this Task to start today:</span>
                {module5 && module5.ai_evaluation.response_text && (
                  <List
                    dataSource={[module5.ai_evaluation.response_text]}
                    renderItem={(item: any) => (
                      <List.Item
                        style={{
                          display: "flex",
                          padding: "10px",
                          flexDirection: "row",
                          border: "none",
                        }}
                      >
                        <ul style={{ width: "600px" }}>
                          <li>
                            <Typography.Text>{item}</Typography.Text>
                          </li>
                        </ul>
                      </List.Item>
                    )}
                  />
                )}
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
export default Home;
