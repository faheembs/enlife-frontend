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
import { getUserData, toastMessage } from "../../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import AppSpinner from "../../../../Components/AppSpinner/AppSpinner";
import { theme } from "../../../../Theme/theme";
import ReactHtmlString from "../../../../Components/ReactHtmlString/ReactHtmlString";
import "./modulesContent.css";
const { TextArea } = Input;

const FirstModule = ({ activeKey }: any) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [textResponse, setTextResponse] = useState("");
  const { questionData } = useAppSelector((state: any) => state.module);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();

  useEffect(() => {
    if (pageIndex === 0) {
      const nextQuestion = `${MODULES.FirstModules[0]?.text} ${MODULES.FirstModules[0]?.question} ${MODULES.FirstModules[0]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.firstModule.label,
          question: nextQuestion,
        })
      );
    }
  }, [pageIndex]);

  useEffect(() => {
    if (questionData && questionData?.answers !== null) {
      setTextResponse(questionData?.answers);
    }
  }, [questionData]);

  const onChange = (e: any) => {
    setTextResponse(e.target.value);
  };
  const currentModule = MODULES.FirstModules[pageIndex];
  const questions = `${currentModule.text} ${currentModule.question} ${currentModule.caption}`;
  const handleNext = async () => {
    setLoading(true);

    if (pageIndex === MODULES.FirstModules.length - 1) {
      activeKey("2");
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

    if (pageIndex === MODULES.FirstModules.length - 2) {
      const body = {
        moduleId: MODULES_LABEL.firstModule.label,
        userId: user.id,
      };
      await dispatch(
        createOrUpdateModule({
          userId: user.id,
          moduleNumber: MODULES_LABEL.firstModule.label,
          questionnaires: {
            questionID:
              questionData?.question_text === questions
                ? questionData?._id
                : false,
            question_text: questions,
            response_type: currentModule.type,
            answers: textResponse,
          },
        })
      );
      dispatch(postQuestionAssessmentByModule(body)).then((response) => {
        setLoading(false);
        setAssessmentResults(response?.payload);
      });
      setPageIndex(pageIndex + 1);
      return;
    }

    dispatch(
      createOrUpdateModule({
        userId: user.id,
        moduleNumber: MODULES_LABEL.firstModule.label,
        questionnaires: {
          questionID:
            questionData?.question_text === questions
              ? questionData?._id
              : false,
          question_text: questions,
          response_type: currentModule.type,
          answers: textResponse,
        },
      })
    );
    setLoading(false);

    if (pageIndex < MODULES.FirstModules.length - 1) {
      setPageIndex(pageIndex + 1);
      setLoading(false);

      const nextQuestion = `${MODULES.FirstModules[pageIndex + 1]?.text} ${
        MODULES.FirstModules[pageIndex + 1]?.question
      } ${MODULES.FirstModules[pageIndex + 1]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.firstModule.label,
          question: nextQuestion,
        })
      );

      setTextResponse("");
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (pageIndex > 0) {
      const prevQuestion = `${MODULES.FirstModules[pageIndex - 1]?.text} ${
        MODULES.FirstModules[pageIndex - 1]?.question
      } ${MODULES.FirstModules[pageIndex - 1]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.firstModule.label,
          question: prevQuestion,
        })
      );

      setAssessmentResults(null);
      setPageIndex(pageIndex - 1);
      setTextResponse("");
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
            pageIndex === MODULES.FirstModules.length - 1 ? (
            <div style={{ maxHeight: 420, overflowX: "auto" }}>
              <ReactHtmlString html={assessmentResults} />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                maxHeight: 450,
                borderWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflowX: "auto",
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
              <TextArea
                // showCount
                value={textResponse ?? ""}
                maxLength={1000}
                onChange={onChange}
                placeholder="Type your response"
                style={{ height: 200, resize: "none" }}
              />
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
              className="buttons"
              onClick={handleBack}
              style={{
                width: "100%",
                height: 44,
                backgroundColor: "#ffffff90",
                border: 0,
                boxShadow: "none",
                color: "#000",
              }}
              // disabled={
              //   pageIndex === 0 || pageIndex === MODULES.FirstModules.length - 1
              // }
            />
          )}
        </Col>
        <Col span={4} xs={24} sm={8}>
          <DotPagination
            pageIndex={pageIndex}
            dataLength={MODULES.FirstModules.length}
          />
        </Col>
        <Col span={4} xs={24} sm={4}>
          <AppButton
            text="Next"
            className="buttons"
            onClick={handleNext}
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

export default FirstModule;
