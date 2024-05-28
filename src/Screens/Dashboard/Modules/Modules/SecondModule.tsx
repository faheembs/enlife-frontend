import React, { useEffect, useState } from "react";
import { Container, List, ListItem } from "@mui/material";
import { Card, Col, Input, Row, Typography, message } from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES, MODULES_LABEL } from "../../../../Utils/constants";
import { useAppSelector } from "../../../../Hooks/reduxHook";
import { AppDispatch } from "../../../../Redux/store";
import { useDispatch } from "react-redux";
import { getUserData } from "../../../../Utils/helperFunctions";
import {
  createOrUpdateModule,
  getQuestionData,
} from "../../../../Redux/Modules/modulesAction";

const { TextArea } = Input;

const SecondModule = () => {
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
    setTextResponse(e.target.value);
  };

  const question = `${MODULES.SecondModule[1].text} ${MODULES.SecondModule[1].question} ${MODULES.SecondModule[1].caption}`;
  const moduleData = modulesByUserId?.find(
    (module: any) => module.moduleNumber === MODULES_LABEL.fourthModule.label
  );

  const hasQuestionID = moduleData?.questionnaires.find(
    (questions: any) => questions.question_text === question
  );

  const result = hasQuestionID ? hasQuestionID.questionID : false;

  const handleNext = () => {
    if (pageIndex === 0) {
      // setTextResponse("");
      setPageIndex((prevIndex) =>
        Math.min(prevIndex + 1, MODULES.SecondModule.length - 1)
      );
      console.log("if");
    } else {
      if (textResponse?.trim() === "") {
        message.warning("Response is required");
        return;
      }
      dispatch(
        createOrUpdateModule({
          userId: user.id,
          moduleNumber: MODULES_LABEL.secondModule.label,
          questionnaires: {
            ...(result && { questionID: result }),
            question_text: question,
            response_type: MODULES.SecondModule[1].type,
            answers: textResponse,
          },
        })
      );
      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.secondModule.label,
          question: question,
        })
      );
      // setTextResponse("");
      setPageIndex((prevIndex) =>
        Math.min(prevIndex + 1, MODULES.SecondModule.length - 1)
      );
      console.log("else");
    }
  };
  // console.log("module", MODULES.SecondModule[pageIndex].text);

  const handleBack = () => {
    // setTextResponse("");
    dispatch(
      getQuestionData({
        userId: user.id,
        moduleNumber: MODULES_LABEL.secondModule.label,
        question: question,
      })
    );

    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentModule = MODULES.SecondModule[pageIndex];

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
            {currentModule.explaination ? (
              <div>
                <Typography style={{ fontWeight: "600" }}>
                  {currentModule.vision ?? ""}
                </Typography>
                <br />
                <List sx={{ listStyleType: "disc", paddingLeft: 5 }}>
                  {currentModule.explaination.map((m) => (
                    <ListItem sx={{ display: "list-item" }}> {m}</ListItem>
                  ))}
                </List>
                <br />
                <Typography>{currentModule.meaningFulness ?? ""}</Typography>
              </div>
            ) : (
              <>
                <div>
                  <Typography>{currentModule.text}</Typography>
                  <br />
                  <Typography style={{ fontWeight: "600", padding: 20 }}>
                    {currentModule.question}
                  </Typography>
                  <br />
                  <Typography>{currentModule.caption}</Typography>
                </div>
                <TextArea
                  showCount
                  value={textResponse}
                  maxLength={100}
                  onChange={onChange}
                  placeholder="Type your response"
                  style={{ height: 200, resize: "none" }}
                />
              </>
            )}
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
            dataLength={MODULES.SecondModule.length}
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
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SecondModule;
