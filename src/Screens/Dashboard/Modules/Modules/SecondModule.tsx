import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Card, Col, Input, Row, Typography, message } from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES, MODULES_LABEL } from "../../../../Utils/constants";
import { useAppSelector } from "../../../../Hooks/reduxHook";
import {
  createOrUpdateModule,
  getQuestionData,
  postQuestionAssessmentByModule,
} from "../../../../Redux/Modules/modulesAction";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { getUserData, toastMessage } from "../../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import AppSpinner from "../../../../Components/AppSpinner/AppSpinner";
import { theme } from "../../../../Theme/theme";
import ReactHtmlString from "../../../../Components/ReactHtmlString/ReactHtmlString";
import "./modulesContent.css";

const { TextArea } = Input;

const SecondModule = ({ activeKey }: any) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [textResponse, setTextResponse] = useState("");
  const { questionData } = useAppSelector((state: any) => state.module);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();
  console.log(MODULES.SecondModule.length, "length", pageIndex);
  const { maxModules } = useAppSelector(
    (state: { module: any }) => state.module
  );
  console.log("questionData", questionData);
  useEffect(() => {
    setTextResponse("");
    if (pageIndex === 0) {
      const nextQuestion = `${MODULES.SecondModule[0]?.text} ${MODULES.SecondModule[0]?.question} ${MODULES.SecondModule[0]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.secondModule.label,
          question: nextQuestion,
        })
      );
    }
  }, [dispatch, pageIndex, user.id]);
  useEffect(() => {
    if (maxModules && maxModules.maxModuleNumber === 2) {
      if (maxModules.lastQuestion === 6) {
        setPageIndex(maxModules.lastQuestion - 1);
      } else {
        setPageIndex(maxModules.lastQuestion);
      }
    } else if (maxModules) {
      activeKey(maxModules.maxModuleNumber);
    }
  }, [activeKey, maxModules]);

  const currentModule = MODULES.SecondModule[pageIndex];
  const questions = `${currentModule.text} ${currentModule.question} ${currentModule.caption}`;
  useEffect(() => {
    setTextResponse("");
    if (MODULES.SecondModule[3].question === currentModule.question) {
      if (questionData?.answers !== null) {
        const answer = questionData?.answers.split(",");
        setPart1(answer[0] || "");
        setPart2(answer[1] || "");
      }
    } else {
      if (
        questionData?.answers !== null &&
        questionData?.question_text === questions
      ) {
        setTextResponse(questionData?.answers);
      }
    }
  }, [questionData]);
  useEffect(() => {
    if (part1 !== "" && part2 !== "") setTextResponse(`${part1},${part2}`);
  }, [part1, part2]);

  const handlePart1Change = (e: any) => {
    setPart1(e.target.value);
  };

  const handlePart2Change = (e: any) => {
    setPart2(e.target.value);
  };

  const onChange = (e: any) => {
    setTextResponse(e.target.value);
  };

  const handleNext = () => {
    setLoading(true);

    if (pageIndex === MODULES.SecondModule.length - 1) {
      activeKey("3");
      toastMessage({
        type: "success",
        content: "Assessment is completed",
        duration: 5,
      });
      setLoading(false);
      return;
    }

    if (textResponse === "" || textResponse === null) {
      message.warning("Response is required");
      setLoading(false);
      return;
    }

    dispatch(
      createOrUpdateModule({
        userId: user.id,
        moduleNumber: MODULES_LABEL.secondModule.label,
        questionnaires: {
          questionID:
            questionData.question_text === questions &&
            (questionData?._id ?? false),
          question_text: questions,
          response_type: currentModule.type,
          answers: textResponse,
        },
      })
    );
    if (pageIndex === MODULES.SecondModule.length - 2) {
      const body = {
        moduleId: MODULES_LABEL.secondModule.label,
        userId: user.id,
      };
      dispatch(postQuestionAssessmentByModule(body)).then((response) => {
        setLoading(false);
        setAssessmentResults(response?.payload);
      });
      setPageIndex(pageIndex + 1);
      return;
    }
    setLoading(false);
    if (pageIndex < MODULES.SecondModule.length - 1) {
      setPageIndex(pageIndex + 1);
      setLoading(false);
      const nextQuestion = `${MODULES.SecondModule[pageIndex + 1]?.text} ${
        MODULES.SecondModule[pageIndex + 1]?.question
      } ${MODULES.SecondModule[pageIndex + 1]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.secondModule.label,
          question: nextQuestion,
        })
      );

      setTextResponse("");
      setPart1("");
      setPart2("");
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (pageIndex > 0) {
      const prevQuestion = `${MODULES.SecondModule[pageIndex - 1]?.text} ${
        MODULES.SecondModule[pageIndex - 1]?.question
      } ${MODULES.SecondModule[pageIndex - 1]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.secondModule.label,
          question: prevQuestion,
        })
      );

      setAssessmentResults(null);
      setPageIndex(pageIndex - 1);
      setTextResponse("");
      setPart1("");
      setPart2("");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 2,
        paddingBottom: 5,
      }}
    >
      <Row>
        <Card
          className="cardStyles"
          style={{
            width: "100%",
            height: 490,
            // padding: 12,
            borderRadius: 12,
          }}
        >
          {loading ? (
            <Col
              xs={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 420,
              }}
            >
              <AppSpinner color={theme.palette.primary.dark} size={120} />
            </Col>
          ) : assessmentResults &&
            pageIndex === MODULES.SecondModule.length - 1 ? (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <EditOutlined
                    style={{ marginRight: "0.55rem", fontSize: 24 }}
                    onClick={() => alert("Edit clicked")}
                  />
                  <ReloadOutlined
                    style={{ fontSize: 24 }}
                    onClick={() => alert("item.id")}
                  />
                </div>
              </div>
              <div style={{ maxHeight: 420, overflowY: "auto" }}>
                <ReactHtmlString html={assessmentResults} />
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                maxHeight: 420,
                borderWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography>{currentModule.text}</Typography>
                <br />
                <Typography style={{ fontWeight: "600", padding: 5 }}>
                  {currentModule.question}
                </Typography>
                <br />
                {currentModule.caption && (
                  <Typography>{currentModule.caption}</Typography>
                )}
              </div>
              {currentModule.question.includes(
                "I am here (on this earth) to ____________, because I want to _________."
              ) ? (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Col xs={11}>
                    <Typography.Title level={5}>
                      I am here (on this earth) to
                    </Typography.Title>
                    <TextArea
                      showCount
                      value={part1 ?? ""}
                      maxLength={1000}
                      onChange={handlePart1Change}
                      placeholder="Type your response"
                      style={{
                        height: 200,
                        resize: "none",
                      }}
                    />
                  </Col>
                  <Col xs={11}>
                    <Typography.Title level={5}>
                      because I want to
                    </Typography.Title>
                    <TextArea
                      showCount
                      value={part2 ?? ""}
                      maxLength={1000}
                      onChange={handlePart2Change}
                      placeholder="Type your response"
                      style={{ height: 200, resize: "none" }}
                    />
                  </Col>
                </div>
              ) : (
                <TextArea
                  showCount
                  value={textResponse ?? ""}
                  maxLength={1000}
                  onChange={onChange}
                  placeholder="Type your response"
                  style={{ height: 200, resize: "none" }}
                />
              )}
            </div>
          )}
        </Card>
      </Row>
      <br />
      <Row justify={"space-between"} align={"middle"}>
        <Col span={4} xs={24} sm={4}>
          {pageIndex > 0 && (
            <AppButton
              text="Back"
              onClick={handleBack}
              className="buttons"
              style={{
                width: "100%",
                height: 44,
                backgroundColor: "#ffffff90",
                border: 0,
                boxShadow: "none",
                color: "#000",
              }}
              // disabled={
              //   pageIndex === 0 || pageIndex === MODULES.SecondModule.length - 1
              // }
            />
          )}
        </Col>
        <Col span={8} xs={24} sm={8}>
          <DotPagination
            pageIndex={pageIndex}
            dataLength={MODULES.SecondModule.length}
          />
        </Col>
        <Col span={4} xs={24} sm={4}>
          <AppButton
            text="Next"
            onClick={handleNext}
            className="buttons"
            style={{
              width: "100%",
              height: 44,
              backgroundColor: "#ffffff90",
              border: 0,
              boxShadow: "none",
              color: "#000",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SecondModule;
