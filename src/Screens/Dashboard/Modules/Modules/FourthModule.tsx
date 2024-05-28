import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Card, Col, Input, Radio, Space, Row, Typography, message } from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES, MODULES_LABEL } from "../../../../Utils/constants";
import { getUserData } from "../../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import {
  createOrUpdateModule,
  getQuestionData,
} from "../../../../Redux/Modules/modulesAction";
import { useAppSelector } from "../../../../Hooks/reduxHook";

const { TextArea } = Input;

const FourthModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [value, setValue] = useState<string | null>(null);
  const [textResponse, setTextResponse] = useState("");
  const { questionData, modulesByUserId } = useAppSelector(
    (state: any) => state.module
  );
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();
  console.log(questionData);
  useEffect(() => {
    if (questionData?.answers !== null) {
      setTextResponse(questionData?.answers);
    } else if (questionData?.scale_value !== null) {
      setValue(questionData.scale_value);
    }
  }, [questionData]);

  const onChange = (e: any) => {
    setTextResponse(e.target.value);
  };

  const onChangeOptions = (e: any) => {
    setValue(e.target.value);
  };
  console.log("modules", modulesByUserId);
  const currentModule = MODULES.FourthModule[pageIndex];
  const questions = `${currentModule.text} ${currentModule.question} ${currentModule.caption}`;
  // console.log(
  //   "modulesByUserId",
  //   modulesByUserId.map((modules: any) =>
  //     modules.questionnaires.map(
  //       (question: any) => question.question_text === questions
  //     )
  //   )
  // );
  // console.log("ques", questions);
  const moduleData = modulesByUserId?.find(
    (module: any) => module.moduleNumber === MODULES_LABEL.fourthModule.label
  );

  const hasQuestionID = moduleData?.questionnaires.find(
    (question: any) => question.question_text === questions
  );

  const result = hasQuestionID ? hasQuestionID.questionID : false;
  // console.log("result", result);
  const handleNext = () => {
    if (
      (currentModule.type !== "scale" && textResponse.trim() === "") ||
      (currentModule.type === "scale" && value === null)
    ) {
      message.warning("Response is required");
      return;
    }

    dispatch(
      createOrUpdateModule({
        userId: user.id,
        moduleNumber: MODULES_LABEL.fourthModule.label,
        questionnaires: {
          ...(result && { questionID: result }),
          question_text: questions,
          response_type: currentModule.type,
          ...(currentModule.type === "scale"
            ? { scale_value: value }
            : { answers: textResponse }),
        },
      })
    );

    if (pageIndex < MODULES.FourthModule.length - 1) {
      setPageIndex(pageIndex + 1);
    }

    const nextQuestion = `${MODULES.FourthModule[pageIndex + 1]?.text} ${
      MODULES.FourthModule[pageIndex + 1]?.question
    } ${MODULES.FourthModule[pageIndex + 1]?.caption}`;

    dispatch(
      getQuestionData({
        userId: user.id,
        moduleNumber: MODULES_LABEL.fourthModule.label,
        question: nextQuestion,
      })
    );

    setTextResponse("");
    setValue(null);
  };

  const handleBack = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);

      const prevQuestion = `${MODULES.FourthModule[pageIndex - 1]?.text} ${
        MODULES.FourthModule[pageIndex - 1]?.question
      } ${MODULES.FourthModule[pageIndex - 1]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fourthModule.label,
          question: prevQuestion,
        })
      );

      setTextResponse("");
      setValue(null);
    }
  };

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
              <Typography style={{ fontWeight: "600", padding: 20 }}>
                {currentModule.question}
              </Typography>
              <br />
              {currentModule.caption && (
                <Typography>{currentModule.caption}</Typography>
              )}
            </div>
            {currentModule.type === "free-response" && (
              <TextArea
                showCount
                value={textResponse}
                maxLength={100}
                onChange={onChange}
                placeholder="Type your response"
                style={{ height: 200, resize: "none" }}
              />
            )}
            {currentModule.type === "scale" && (
              <Radio.Group
                onChange={onChangeOptions}
                value={value}
                style={{ marginBottom: 50 }}
              >
                <Space direction="horizontal">
                  {currentModule?.options &&
                    currentModule.options.map((item) => (
                      <Radio key={item} value={item}>
                        {item}
                      </Radio>
                    ))}
                </Space>
              </Radio.Group>
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
            dataLength={MODULES.FourthModule.length}
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

export default FourthModule;
