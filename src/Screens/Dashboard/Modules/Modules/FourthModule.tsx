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
import { EditOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import {
  createOrUpdateModule,
  getAllModulesByUserID,
  getQuestionData,
  postQuestionAssessmentByModule,
  regenarateResponse,
} from "../../../../Redux/Modules/modulesAction";
import { useAppSelector } from "../../../../Hooks/reduxHook";
import AppSpinner from "../../../../Components/AppSpinner/AppSpinner";
import { theme } from "../../../../Theme/theme";
import "./modulesContent.css";

const { TextArea } = Input;

const FourthModule = ({ activeKey }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageIndex, setPageIndex] = useState(0);
  const [value, setValue] = useState<string | null>(null);
  const [textResponse, setTextResponse] = useState("");
  const [editResponse, setEditResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<any>(null);
  const [identityKeys, setIdentityKeys] = useState<any>([]);
  const [aiResponse, setAiResponse] = useState<any>([]);
  // const [module3Identity, setModule3Identity] = useState<any>(null);
  const [selectedIdentities, setSelectedIdentities] = useState<any>([]);
  const [identities, setIdentities] = useState<
    { id: number; name: string }[] | undefined
  >([]);
  const user = getUserData();
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
  }, [dispatch, user.id]);
  const { questionData, modulesByUserId, maxModules } = useAppSelector(
    (state: any) => state.module
  );
  // console.log(MODULES.FourthModule.length, "length", pageIndex);
  const currentModule = MODULES.FourthModule[pageIndex] || {};
  const questions = `${currentModule.question || ""} ${
    currentModule.caption || ""
  }`;
  // console.log("questions", questions);
  useEffect(() => {
    // console.log("page check", pageIndex, maxModules.lastQuestion - 1);
    // console.log("useeffect", question, questions);
    if (maxModules && maxModules.maxModuleNumber === 4) {
      const currentModules =
        MODULES.FourthModule[maxModules.lastQuestion - 1] || {};
      const question = `${currentModules.question || ""} ${
        currentModules.caption || ""
      }`;
      dispatch(
        getQuestionData({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fourthModule.label,
          question: question,
        })
      );
      if (maxModules.lastQuestion === 0) {
        setPageIndex(0);
      } else if (maxModules.lastQuestion === 4) {
        setPageIndex(maxModules.lastQuestion - 2);
      } else {
        setPageIndex(maxModules.lastQuestion - 1);
      }
    }
  }, [activeKey, maxModules]);
  const module3 =
    modulesByUserId &&
    modulesByUserId.length > 0 &&
    modulesByUserId.find((module: any) => module.moduleNumber === "Module 3");
  const module3Key = () => {
    if (module3) {
      const parsed = JSON.parse(module3.ai_evaluation.response_text);
      const [key, values]: [any, any] = Object.entries(parsed)[0];

      return values;
    }
  };

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
  // console.log(pageIndex, "page");
  useEffect(() => {
    if (pageIndex > 3) {
      setPageIndex(2);
    }
    if (questionData?.answers !== null) {
      setTextResponse(questionData?.answers);
    } else if (questionData?.scale_value !== null) {
      setValue(questionData.scale_value);
    }
  }, [questionData, pageIndex]);

  const onChange = (e: any) => {
    setTextResponse(e.target.value);
  };

  const onChangeOptions = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (currentModule.identities) {
      setIdentities(currentModule?.identities ?? []);
    }
  }, [currentModule.identities]);
  useEffect(() => {
    if (selectedIdentities.length > 0) {
      const [identitiesKey, identitiesValue]: [any, any] = Object.entries(
        selectedIdentities[0]
      )[0];
      setIdentityKeys(identitiesValue);
    }
  }, [selectedIdentities]);
  // console.log("selectedIdentities", selectedIdentities);
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
                questionID:
                  questionData.question_text === questions &&
                  (questionData?._id ?? false),
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
                questionID:
                  questionData.question_text === questions &&
                  (questionData?._id ?? false),
                question_text: questions,
                response_type: currentModule.type,
              },
              ai_evaluation: {
                response_text: selectedIdentities[0].trim(),
                response_html: selectedIdentities[0].trim(),
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
      if (
        pageIndex === MODULES.FourthModule.length - 1 &&
        selectedIdentities.length > 0
      ) {
        activeKey("5");
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
  const handleRetry = async () => {
    setLoading(true);
    const body = {
      moduleId: MODULES_LABEL.fourthModule.label,
      userId: user.id,
    };
    const response = await dispatch(postQuestionAssessmentByModule(body));
    setLoading(false);
    setPageIndex(3);
    setAiResponse(response?.payload);
    setLoading(false);
  };
  const handleRegenarateResponse = (res: any, index: number) => {
    dispatch(
      regenarateResponse({
        text: res,
        prompts: "Make it short and not more than 30 words",
      })
    ).then((res: any) => {
      setAiResponse((prev: any) => {
        const newState = [...prev];

        const targetItem = { ...newState[index] };

        if (Array.isArray(targetItem["Fitness journey plan name"])) {
          targetItem["Fitness journey plan name"] = [res.payload.trim()];
        } else {
          targetItem["Fitness journey plan name"] = res.payload.trim();
        }

        newState[index] = targetItem;

        // console.log("newState", newState);
        return newState;
      });
    });
  };
  // console.log("after", aiResponse);
  let data = aiResponse;
  // console.log("data", data);

  const renderItem = (item: any, index: number) => {
    let value: any = "";
    if (Array.isArray(item["Fitness journey plan name"])) {
      value = item["Fitness journey plan name"][0];
    } else {
      value = item["Fitness journey plan name"];
    }
    // console.log("item", item["Fitness journey plan name"][0]);
    const onChangeEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditResponse(e.target.value);
    };
    const handleEditClick = (index: number, values: string) => {
      setEditIndex(index);
      setEditResponse(values);
    };
    const handleSave = () => {
      setAiResponse((prev: any) => {
        const newState = prev;
        newState[editIndex] = {
          "Fitness journey plan name": [editResponse.trim()],
        };
        return newState;
      });
      setEditIndex(null);
      setEditResponse(null);
    };

    return (
      <List.Item
        actions={[
          editIndex === index ? (
            <SaveOutlined onClick={handleSave} />
          ) : (
            <EditOutlined onClick={() => handleEditClick(index, value)} />
          ),
          <ReloadOutlined
            onClick={() => handleRegenarateResponse(value, index)}
          />,
        ]}
        style={{
          display: "flex",
          padding: "10px",
          flexDirection: "row",
          border: "1px solid #f0f0f0",
          borderRadius: "5px",
          marginBottom: "20px",
          cursor: "pointer",
          boxShadow: identityKeys.includes(value[0])
            ? "rgb(0, 146, 255, 0.6) 1px 1px 16px"
            : "none",
        }}
      >
        {/* <Typography.Text style={{ width: "190px", fontWeight: "bold" }}>
          {key}
        </Typography.Text> */}
        {/* <ol style={{ width: "600px" }}> */}
        {/* {values.map((value: any, idx: any) => ( */}
        {/* <li> */}
        {editIndex === index ? (
          <TextArea
            // showCount
            value={editResponse}
            maxLength={1000}
            onChange={onChangeEdit}
            style={{
              height: 100,
              resize: "none",
              marginTop: "10px",
            }}
          />
        ) : (
          <Typography.Text
            onClick={() => handleIdentityChange(value)}
            style={{ width: "100%" }}
          >
            {value}
          </Typography.Text>
        )}
        {/* </li> */}
        {/* ))} */}
        {/* </ol> */}
      </List.Item>
    );
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
          ) : (
            <>
              {
                // assessmentResults &&
                // pageIndex === MODULES.FourthModule.length - 1 ? (
                //   <ReactHtmlString html={assessmentResults} />
                // )
                currentModule.identities || pageIndex === 3 ? (
                  <div
                    style={{
                      width: "100%",
                      maxHeight: 420,
                      borderWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                    }}
                  >
                    <Typography style={{ fontWeight: "600" }}>
                      Please select a Fitness Journey Plan
                    </Typography>
                    {aiResponse.length < 1 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 100,
                        }}
                      >
                        <Typography.Text
                          style={{ fontWeight: "bold", marginBottom: "30px" }}
                        >
                          Something went wrong! Please retry.
                        </Typography.Text>
                        <AppButton text="Regenerate" onClick={handleRetry} />
                      </div>
                    ) : (
                      <List
                        dataSource={data}
                        renderItem={renderItem}
                        style={{
                          background: theme.palette.primary.light,
                          padding: "20px",
                          width: "100%",
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      maxHeight: 420,
                      borderWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      // overflowY: "auto",
                    }}
                  >
                    <div>
                      <Typography>{currentModule.text}</Typography>
                      <br />
                      <Typography
                        className="question"
                        style={{ fontWeight: "600", padding: 20 }}
                      >
                        {currentModule.question}
                      </Typography>
                      <br />
                      {currentModule.caption && (
                        <Typography>{currentModule.caption}</Typography>
                      )}
                    </div>
                    {module3 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          // maxHeight: "2px",
                          marginBottom: "10px",
                        }}
                      >
                        <Typography
                          className="typo"
                          style={{ fontWeight: "bold" }}
                        >
                          Who do you want to be?
                        </Typography>
                        <Typography
                          className="typo"
                          style={{ marginLeft: "10px" }}
                        >
                          {module3 && module3Key()}
                        </Typography>
                      </div>
                    )}
                    {currentModule.type === "free-response" && (
                      <TextArea
                        showCount
                        value={textResponse}
                        maxLength={1000}
                        onChange={onChange}
                        placeholder="Type your response"
                        style={{
                          height: 200,
                          resize: "none",
                          marginTop: "10px",
                        }}
                      />
                    )}
                    {currentModule.type === "scale" && (
                      <Radio.Group
                        onChange={onChangeOptions}
                        value={value}
                        style={{ marginBottom: 50, marginTop: 50 }}
                      >
                        <Space
                          className="space"
                          // direction={windowWidth ? "vertical" : "horizontal"}
                        >
                          {currentModule?.options &&
                            currentModule.options.map((item: any) => (
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
        <Col span={4} xs={24} sm={4}>
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
            disabled={pageIndex === 0}
          />
        </Col>
        <Col span={4} xs={24} sm={8}>
          <DotPagination
            pageIndex={pageIndex}
            dataLength={MODULES.FourthModule.length}
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

export default FourthModule;
