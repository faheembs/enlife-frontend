import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import {
  Card,
  Col,
  Input,
  Radio,
  Space,
  Row,
  Typography,
  message,
  List,
} from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES, MODULES_LABEL } from "../../../../Utils/constants";
import { getUserData } from "../../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  createOrUpdateModule,
  getQuestionData,
  postQuestionAssessmentByModule,
} from "../../../../Redux/Modules/modulesAction";
import { useAppSelector } from "../../../../Hooks/reduxHook";
import AppSpinner from "../../../../Components/AppSpinner/AppSpinner";
import { theme } from "../../../../Theme/theme";

const { TextArea } = Input;

const FourthModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [value, setValue] = useState<string | null>(null);
  const [textResponse, setTextResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  // const [module3Identity, setModule3Identity] = useState<any>(null);
  const [selectedIdentities, setSelectedIdentities] = useState<any>([]);
  const [identities, setIdentities] = useState<
    { id: number; name: string }[] | undefined
  >([]);

  const { questionData } = useAppSelector((state: any) => state.module);
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();
  useEffect(() => {
    //  const res = dispatch(getAllModulesByUserID(user.id))
    // const filtered =  res.filter((module:any)=>(
    //   module.moduleNumber === MODULES_LABEL.thirdModule.label
    //  ))
    //  setModule3Identity(filtered)
    if (pageIndex === 0) {
      const nextQuestion = `${MODULES.FourthModule[0]?.question} ${MODULES.FourthModule[0]?.caption}`;
      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fourthModule.label,
          question: nextQuestion,
        })
      );
    }
  }, [dispatch, pageIndex, user.id]);
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

  const currentModule = MODULES.FourthModule[pageIndex];
  useEffect(() => {
    if (currentModule.identities) {
      setIdentities(currentModule?.identities ?? []);
    }
  }, [currentModule.identities]);
  const questions = `${currentModule.question} ${currentModule.caption}`;
  const handleNext = async () => {
    try {
      setLoading(true);
      if (currentModule.type !== "single-selection") {
        if (
          (currentModule.type !== "scale" && textResponse.trim() === "") ||
          (currentModule.type === "scale" && value === null)
        ) {
          message.warning("Response is required");
          return;
        }
      }
      await dispatch(
        selectedIdentities.length === 0
          ? createOrUpdateModule({
              userId: user.id,
              moduleNumber: MODULES_LABEL.fourthModule.label,
              questionnaires: {
                questionID: questionData?._id,
                question_text: questions,
                response_type: currentModule.type,
                ...(currentModule.type === "scale"
                  ? { scale_value: value }
                  : { answers: textResponse }),
              },
            })
          : createOrUpdateModule({
              userId: user.id,
              moduleNumber: MODULES_LABEL.fourthModule.label,
              questionnaires: {
                questionID: questionData?._id,
                question_text: questions,
                response_type: currentModule.type,
              },
              ai_evaluation: {
                response_text: JSON.stringify(selectedIdentities[0]),
                response_html: JSON.stringify(selectedIdentities[0]),
              },
            })
      );
      const nextQuestion = `${MODULES.FourthModule[pageIndex + 1]?.question} ${
        MODULES.FourthModule[pageIndex + 1]?.caption
      }`;
      setTextResponse("");
      setValue(null);

      await dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fourthModule.label,
          question: nextQuestion,
        })
      );
      if (pageIndex === MODULES.FourthModule.length - 2) {
        const body = {
          moduleId: MODULES_LABEL.fourthModule.label,
          userId: user.id,
        };
        const response = await dispatch(postQuestionAssessmentByModule(body));
        setAiResponse(response?.payload);
        setPageIndex(pageIndex + 1);
      }
      if (pageIndex < MODULES.FourthModule.length - 1) {
        setPageIndex(pageIndex + 1);
      }
    } catch (error) {
      console.error("Failed to process the next step:", error);
      message.error("An error occurred while processing your request");
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    if (pageIndex > 0) {
      const prevQuestion = `${MODULES.FourthModule[pageIndex - 1]?.question} ${
        MODULES.FourthModule[pageIndex - 1]?.caption
      }`;
      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fourthModule.label,
          question: prevQuestion,
        })
      );

      setPageIndex(pageIndex - 1);
      setValue(null);
      setTextResponse("");
    }
  };
  const handleIdentityChange = (item: any) => {
    if (identities) {
      const isSelected = selectedIdentities.includes(item);
      const newSelection = isSelected ? [] : [item];

      setSelectedIdentities(newSelection);
    }
  };
  const data = JSON.parse(aiResponse);
  const renderItem = (item: any, index: number) => {
    const [key, values]: [any, any] = Object.entries(item)[0];
    // console.log(key);
    // console.log(values);
    // console.log(selectedIdentities[0], key);
    return (
      <List.Item
        actions={[
          <EditOutlined onClick={() => alert("Edit clicked")} />,
          <ReloadOutlined />,
        ]}
        style={{
          display: "flex",
          padding: "10px",
          flexDirection: "row",
          border: "1px solid #f0f0f0",
          borderRadius: "5px",
          marginBottom: "20px",
          cursor: "pointer",
          // boxShadow:
          //   Object.keys(selectedIdentities[0])[0] === key
          //     ? "rgb(0 146 255 / 28%) 2px 2px 16px"
          //     : "none",
        }}
        onClick={() => handleIdentityChange(item)}
      >
        {/* <Typography.Text style={{ width: "190px", fontWeight: "bold" }}>
          {key}
        </Typography.Text> */}
        <ol style={{ width: "600px" }}>
          {values.map((value: any, idx: any) => (
            <li key={idx}>
              <Typography.Text>{value}</Typography.Text>
            </li>
          ))}
        </ol>
      </List.Item>
    );
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
          ) : (
            <>
              {
                // assessmentResults &&
                // pageIndex === MODULES.FourthModule.length - 1 ? (
                //   <ReactHtmlString html={assessmentResults} />
                // )
                currentModule.identities ? (
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
                      Please select a Fitness Journey Plan
                    </Typography>

                    <List
                      dataSource={data}
                      renderItem={renderItem}
                      style={{
                        background: theme.palette.primary.light,
                        padding: "20px",
                        width: "100%",
                      }}
                    />
                  </div>
                ) : (
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography style={{ fontWeight: "bold" }}>
                        Selected Fitness Identity :
                      </Typography>
                      <Typography style={{ marginLeft: "10px" }}>
                        {" "}
                        Nutrition Advocate
                      </Typography>
                    </div>
                    {currentModule.type === "free-response" && (
                      <TextArea
                        showCount
                        value={textResponse}
                        maxLength={1000}
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
                )
              }
            </>
          )}
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
