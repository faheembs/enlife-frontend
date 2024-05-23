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
} from "../../../../Redux/Modules/modulesAction";
import { getUserData } from "../../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";

const { TextArea } = Input;

const FirstModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [textResponse, setTextResponse] = useState<any>("");
  const { questionData, modulesByUserId } = useAppSelector(
    (state: { module: any }) => state.module
  );
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();
  useEffect(() => {
    const text = questionData?.answers;
    setTextResponse(text);
  }, [questionData]);
  const onChange = (e: any) => {
    // console.log("Change:", e.target.value);
    setTextResponse(e.target.value);
  };

  const hasQuestionID =
    modulesByUserId &&
    modulesByUserId.questionnaires.find(
      (question: any) =>
        question.question_text === MODULES.FirstModules[pageIndex].question
    );

  const result = hasQuestionID ? hasQuestionID.questionID : false;
  const handleNext = () => {
    if (textResponse.trim() === "") {
      message.warning("Response is required");
      return;
    }
    dispatch(
      createOrUpdateModule({
        userId: user.id,
        moduleNumber: MODULES_LABEL.firstModule.label,
        questionnaires: {
          ...(result && { questionID: result }),
          question_text: MODULES.FirstModules[pageIndex].question,
          response_type: MODULES.FirstModules[pageIndex].type,
          answers: textResponse,
        },
      })
    );
    dispatch(
      getQuestionData({
        userId: user.id,
        moduleNumber: MODULES_LABEL.firstModule.label,
        question:
          MODULES.FirstModules[pageIndex === 0 ? 0 : pageIndex + 1].question,
      })
    );
    setTextResponse("");
    setPageIndex((prevIndex) =>
      Math.min(prevIndex + 1, MODULES.FirstModules.length - 1)
    );
  };
  // console.log("module", MODULES.FirstModules[pageIndex].text);

  const handleBack = () => {
    setTextResponse("");
    dispatch(
      getQuestionData({
        userId: user.id,
        moduleNumber: MODULES_LABEL.firstModule.label,
        question: MODULES.FirstModules[pageIndex - 1].question,
      })
    );

    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const currentModule = MODULES.FirstModules[pageIndex];

  return (
    <Container
      maxWidth="md"
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
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 420,
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
              <Typography>{currentModule.caption}</Typography>
            </div>
            <TextArea
              showCount
              value={textResponse ?? ""}
              maxLength={100}
              onChange={onChange}
              placeholder="Type your response"
              style={{ height: 200, resize: "none" }}
            />
          </div>
        </Card>
      </Row>
      <br />
      <Row justify={"space-between"} align={"middle"}>
        <Col span={4}>
          <AppButton
            text="Back"
            onClick={handleBack}
            style={{
              width: "100%",
              height: 44,
              backgroundColor: "#ffffff90",
              border: 0,
              boxShadow: "none",
              color: "#000",
            }}
            disabled={pageIndex === 0}
          />
        </Col>
        <Col span={8}>
          <DotPagination
            pageIndex={pageIndex}
            dataLength={MODULES.FirstModules.length}
          />
        </Col>
        <Col span={4}>
          <AppButton
            text="Next"
            onClick={handleNext}
            style={{
              width: "100%",
              height: 44,
              backgroundColor: "#ffffff90",
              border: 0,
              boxShadow: "none",
              color: "#000",
            }}
            disabled={pageIndex === MODULES.FirstModules.length - 1}
            // disabled={textResponse.trim() === ""}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FirstModule;
