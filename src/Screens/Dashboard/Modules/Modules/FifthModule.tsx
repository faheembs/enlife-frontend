import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import {
  Card,
  Radio,
  Col,
  Input,
  Row,
  Typography,
  Space,
  List,
  message,
} from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES, MODULES_LABEL } from "../../../../Utils/constants";
import { RadioChangeEvent } from "antd/lib";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { toastMessage } from "../../../../Utils/helperFunctions";
import ReactHtmlString from "../../../../Components/ReactHtmlString/ReactHtmlString";
import { theme } from "../../../../Theme/theme";
import { getUserData, toastMessage } from "../../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import {
  createOrUpdateModule,
  getQuestionData,
  postQuestionAssessmentByModule,
} from "../../../../Redux/Modules/modulesAction";
import { useAppSelector } from "../../../../Hooks/reduxHook";

const { TextArea } = Input;

const FifthModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [selectedIdentities, setSelectedIdentities] = useState<any>([]);
  const [textResponse, setTextResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFAP, setSelectedFAP] = useState<any>([]);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  const currentModule = MODULES.FifthModule[pageIndex];

  const [identities, setIdentities] = useState<
    { id: number; name: string }[] | undefined
  >([]);

  const { questionData } = useAppSelector((state: any) => state.module);

  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();

  useEffect(() => {
    if (pageIndex === 0) {
      const nextQuestion = `${MODULES.FifthModule[0]?.text} ${MODULES.FifthModule[0]?.question} ${MODULES.FifthModule[0]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fifthModule.label,
          question: nextQuestion,
        })
      );
    }
  }, [pageIndex]);

  useEffect(() => {
    if (questionData?.answers !== null) {
      setTextResponse(questionData?.answers);
    }
  }, [questionData]);
  const questions = `${currentModule.text} ${currentModule.question} ${currentModule.caption}`;
  useEffect(() => {
    if (currentModule) {
      setIdentities(currentModule?.identities ?? []);
    }
  }, [currentModule, currentModule?.identities]);

  const onChange = (e: any) => {
    setTextResponse(e.target.value);
  };

  const handleDelete = (id: any) => {
    if (identities && identities.length > 0) {
      setIdentities(identities.filter((identity: any) => identity.id !== id));
    }
  };

  const handleFAPRecommendationChange = (item: any) => {
    if (identities) {
      // Toggle selection: deselect if the item is already selected, otherwise select it
      setSelectedIdentities(selectedIdentities === item ? null : item);
    }
  };

  const handleFAPChange = (item: any) => {
    setSelectedFAP(selectedFAP === item ? null : item);
  };

  // const handleIdentityChange = (item: any) => {
  //   if (identities) {
  //     const identityItem =
  //       !selectedIdentities.includes(item)
  //         ? [...selectedIdentities, item]
  //         : selectedIdentities.filter((t: any) => t !== item);

  //     if (identityItem.length >= 3 && !identityItem.includes(item)) {
  //       toastMessage({
  //         type: "error",
  //         content: "Selection Limit Reached",
  //         duration: 5,
  //       });
  //       return;
  //     }
  //     setSelectedIdentities(identityItem);
  //   }
  // };

  const handleNext = () => {
    setLoading(true);

    if (pageIndex === MODULES.FifthModule.length - 1) {
      toastMessage({
        type: "error",
        content: "Assessment is completed",
        duration: 5,
      });
      setLoading(false);
      return;
    }

    if (pageIndex === MODULES.FifthModule.length - 2) {
      const body = {
        moduleId: MODULES_LABEL.fifthModule.label,
        userId: user.id,
      };
      dispatch(postQuestionAssessmentByModule(body)).then((response) => {
        setLoading(false);
        setAssessmentResults(response?.payload);
      });
      setPageIndex(pageIndex + 1);
      return;
    }

    if (textResponse === "" || textResponse === null) {
      message.warning("Response is required");
      return;
    }

    dispatch(
      createOrUpdateModule({
        userId: user.id,
        moduleNumber: MODULES_LABEL.fifthModule.label,
        questionnaires: {
          questionID: questionData?._id ?? false,
          question_text: questions,
          response_type: currentModule.type,
          answers: textResponse,
        },
      })
    );

    if (pageIndex < MODULES.FifthModule.length - 1) {
      setPageIndex(pageIndex + 1);

      const nextQuestion = `${MODULES.FifthModule[pageIndex + 1]?.text} ${
        MODULES.FifthModule[pageIndex + 1]?.question
      } ${MODULES.FifthModule[pageIndex + 1]?.caption}`;

      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fifthModule.label,
          question: nextQuestion,
        })
      );

      setTextResponse("");
      setLoading(false);
    }
  };

  const handleBack = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const onChangeOptions = (e: RadioChangeEvent) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const renderItem = (item: any, index: number) => (
    <List.Item
      actions={[
        <EditOutlined onClick={() => alert("Edit clicked")} />,
        <DeleteOutlined onClick={() => handleDelete(item.id)} />,
      ]}
      style={{
        padding: "10px",
        border: "1px solid #f0f0f0",
        borderRadius: "5px",
        marginBottom: "20px",
        cursor: "pointer",
        boxShadow:
          selectedIdentities === item
            ? "rgb(0 146 255 / 28%) 2px 2px 16px"
            : "none",
      }}
      onClick={() => handleFAPRecommendationChange(item)}
    >
      <ReactHtmlString html={item.name} />
    </List.Item>
  );

  const renderRecommendations = (item: any, index: number) => (
    <List.Item
      style={{
        padding: "10px",
        border: "1px solid #f0f0f0",
        borderRadius: "5px",
        marginBottom: "20px",
        cursor: "pointer",
        boxShadow:
          selectedFAP === item ? "rgb(0 146 255 / 28%) 2px 2px 16px" : "none",
      }}
      onClick={() => handleFAPChange(item)}
    >
      {item}
    </List.Item>
  );

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
            {!currentModule.identities && (
              <div>
                <Typography>{currentModule.text}</Typography>
                <br />
                <Typography style={{ fontWeight: "600", padding: 20 }}>
                  {currentModule.question}
                </Typography>
                <br />
                <Typography>{currentModule.caption}</Typography>
              </div>
            )}
            {currentModule.type === "free-response" && (
              <TextArea
                showCount
                maxLength={100}
                onChange={onChange}
                placeholder="Type your response"
                style={{ height: 200, resize: "none" }}
              />
            )}

            {currentModule.type === "free-response" && (
              <TextArea
                showCount
                maxLength={100}
                onChange={onChange}
                placeholder="Type your response"
                style={{ height: 200, resize: "none" }}
              />
            )}
            {currentModule.type === "precursor-question" && (
              <Radio.Group
                onChange={onChangeOptions}
                value={value}
                style={{ marginBottom: 100 }}
              >
                <Space direction="horizontal">
                  {currentModule?.options &&
                    currentModule.options.map((item) => (
                      <Radio value={item}>{item}</Radio>
                    ))}
                </Space>
              </Radio.Group>
            )}
            {currentModule.type === "precursor-question" && value === "Yes" && (
              <>
                <Typography>{currentModule.q_conditional}</Typography>
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={onChange}
                  placeholder="Type your response"
                  style={{ height: 200, resize: "none" }}
                />
              </>
            )}

            {currentModule.identities &&
              (selectedIdentities === null ||
                selectedIdentities.length === 0) && (
                <div
                  style={{
                    width: "100%",
                    height: 420,
                    borderWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography style={{ fontWeight: "600" }}>
                    Please select a Immediate Fitness Action Plan
                  </Typography>

                  <List
                    dataSource={identities}
                    renderItem={renderItem}
                    style={{
                      background: theme.palette.primary.light,
                      padding: "20px",
                      width: "100%",
                    }}
                  />
                </div>
              )}

            {selectedIdentities &&
              selectedIdentities.length !== 0 &&
              selectedIdentities !== null && (
                <div>
                  <Typography>
                    Please select an area of the Immediate Fitness Action Plan
                    you'd like to focus on:
                  </Typography>
                  <List
                    dataSource={selectedIdentities?.name?.split("<br/>")}
                    renderItem={renderRecommendations}
                    style={{
                      background: theme.palette.primary.light,
                      padding: "20px",
                      width: "100%",
                    }}
                  />
                  <AppButton
                    text="Change Selection"
                    onClick={() => setSelectedIdentities(null)}
                    style={{
                      width: "100%",
                      height: 44,
                      backgroundColor: "#ffffff90",
                      border: 0,
                      boxShadow: "none",
                      color: "#000",
                    }}
                  />
                </div>
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
            dataLength={MODULES.FifthModule.length}
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
            disabled={pageIndex === MODULES.FifthModule.length - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FifthModule;
