/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Button,
} from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES, MODULES_LABEL } from "../../../../Utils/constants";
import { RadioChangeEvent } from "antd/lib";
import { EditOutlined, SaveOutlined, ReloadOutlined } from "@ant-design/icons";
// import { toastMessage } from "../../../../Utils/helperFunctions";
import ReactHtmlString from "../../../../Components/ReactHtmlString/ReactHtmlString";
import { theme } from "../../../../Theme/theme";
import { getUserData, toastMessage } from "../../../../Utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import {
  createOrUpdateModule,
  getAllModulesByUserID,
  getQuestionData,
  postQuestionAssessmentByModule,
  postQuestionAssessmentModule5,
  regenarateResponse,
} from "../../../../Redux/Modules/modulesAction";
import { useAppSelector } from "../../../../Hooks/reduxHook";
import AppSpinner from "../../../../Components/AppSpinner/AppSpinner";
import "./modulesContent.css";

const { TextArea } = Input;

const FifthModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [selectedIdentities, setSelectedIdentities] = useState<any>([]);
  const [textResponse, setTextResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFAP, setSelectedFAP] = useState<any>();
  const [inputVisible, setInputVisible] = useState(false);
  const [editResponse, setEditResponse] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [necessaryTasks, setNecessaryTasks] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<string>("");

  const currentModule = MODULES.FifthModule[pageIndex];
  const questions = `${currentModule?.question}${currentModule?.caption}`;

  const [identities, setIdentities] = useState<any>([]);

  const dispatch = useDispatch<AppDispatch>();
  const user: any = getUserData();

  const { questionData, modulesByUserId, maxModules } = useAppSelector(
    (state: any) => state.module
  );

  useEffect(() => {
    if (maxModules && maxModules.maxModuleNumber === 5) {
      setPageIndex(0);
    }
  }, [maxModules]);

  const filteredModules =
    modulesByUserId &&
    modulesByUserId.filter(
      (module: any) => module.moduleNumber === MODULES_LABEL.fourthModule.label
    );
  // console.log(
  //   "filteredModules",
  //   filteredModules[0].ai_evaluation.response_html
  // );
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
  }, []);
  useEffect(() => {
    // dispatch(getAllModulesByUserID({ userId: user.id }));
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
  console.log("selectedIdentities", selectedIdentities);
  const handleFAPChange = (item: any) => {
    setSelectedFAP(selectedFAP === item ? null : item);
  };
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !necessaryTasks.includes(inputValue)) {
      setNecessaryTasks([...necessaryTasks, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleNext = async () => {
    setLoading(true);

    if (pageIndex === MODULES.FifthModule.length) {
      setLoading(false);
      toastMessage({
        type: "success",
        content: "Assessment is completed",
        duration: 5,
      });
      setLoading(false);
      return;
    }

    if (
      ((currentModule?.question && textResponse === "") ||
        (currentModule?.question && textResponse) === null ||
        (currentModule?.identities && value === null)) &&
      !currentModule?.identities
    ) {
      message.warning("Response is required");
      setLoading(false);
      return;
    }
    if (pageIndex === MODULES.FifthModule.length - 5) {
      await dispatch(
        createOrUpdateModule({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fifthModule.label,
          questionnaires: {
            questionID: questionData?._id ?? false,
            question_text: questions,
            response_type: currentModule?.type,
            answers: value === "Yes" ? textResponse : null,
            precursor_question: value,
          },
        })
      );
    }
    if (pageIndex === MODULES.FifthModule.length - 2) {
      await dispatch(
        createOrUpdateModule({
          userId: user.id,
          moduleNumber: MODULES_LABEL.fifthModule.label,
          questionnaires: {
            questionID: questionData?._id ?? false,
            question_text: questions,
            response_type: currentModule?.type,
          },
          ai_evaluation: {
            response_text: selectedTask,
            response_html: selectedTask,
          },
        })
      );
    }

    const body = {
      userId: user.id,
      selectedPlan: selectedFAP && selectedFAP,
    };
    if (pageIndex !== MODULES.FifthModule.length - 3) {
      const response = await dispatch(postQuestionAssessmentModule5(body));
      if (response.payload) {
        if (pageIndex === MODULES.FifthModule.length - 4) {
          setNecessaryTasks(JSON.parse(response.payload));
        } else {
          setIdentities(response.payload);
        }
      }
    }
    setLoading(false);
    // AI
    // }

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
    setPageIndex((prevIndex) => Math.max(prevIndex - 2, 0));
  };

  const onChangeOptions = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  // const renderItem = (item: any, index: number) => (
  //   <List.Item
  //     actions={[
  //       <EditOutlined onClick={() => alert("Edit clicked")} />,
  //       <DeleteOutlined onClick={() => handleDelete(item.id)} />,
  //     ]}
  //     style={{
  //       padding: "10px",
  //       border: "1px solid #f0f0f0",
  //       borderRadius: "5px",
  //       marginBottom: "20px",
  //       cursor: "pointer",
  //       boxShadow:
  //         selectedIdentities === item
  //           ? "rgb(0 146 255 / 28%) 2px 2px 16px"
  //           : "none",
  //     }}
  //     onClick={() => handleFAPRecommendationChange(item)}
  //   >
  //     <ReactHtmlString html={JSON.stringify(item)} />
  //   </List.Item>
  // );
  // console.log("identities", identities);
  const handleRegenarateResponse = (res: any, index: number) => {
    // console.log(res[0]);

    dispatch(
      regenarateResponse({
        text: res,
        prompts: `These will be 3 so separate them with ". " and there should be only 3 dont use ""`,
      })
    ).then((res: any) => {
      setIdentities((prev: any) => {
        const newState = JSON.parse(prev);
        newState[index] = { "30-day goal": res.payload.trim().split(". ") };
        return JSON.stringify(newState);
      });
      // return console.log(res.payload.trim().split(". "));
    });
  };
  // console.log("after identities", JSON.parse(identities));

  const renderItem = (item: any, index: number) => {
    const [key, values]: [any, any] = Object.entries(item)[0];
    const onChangeEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditResponse(e.target.value);
    };
    const handleEditClick = (index: number, values: string) => {
      setEditIndex(index);
      setEditResponse(values);
    };
    const handleSave = () => {
      setIdentities((prev: any) => {
        const newState = JSON.parse(prev);
        newState[editIndex] = { "30-day goal": editResponse.split(",") };
        return JSON.stringify(newState);
      });
      setEditIndex(null);
      setEditResponse(null);
    };
    return (
      <>
        <List.Item
          actions={[
            editIndex === index ? (
              <SaveOutlined onClick={handleSave} />
            ) : (
              <EditOutlined onClick={() => handleEditClick(index, values)} />
            ),
            <ReloadOutlined
              onClick={() => handleRegenarateResponse(values, index)}
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
          }}
        >
          {" "}
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
            <>
              <Typography.Text style={{ width: "70px", fontWeight: "bold" }}>
                {`Method ${index + 1}`}
              </Typography.Text>
              <ol
                onClick={() => handleFAPRecommendationChange(item)}
                style={{ width: "600px" }}
              >
                {values.slice(0, 3).map((value: any, idx: any) => (
                  <li key={idx}>
                    <Typography.Text>{value}</Typography.Text>
                  </li>
                ))}
              </ol>
            </>
          )}
        </List.Item>
      </>
    );
  };

  const renderItem2 = () => {
    if (filteredModules.length > 0) {
      const responseHtml = filteredModules[0]?.ai_evaluation?.response_html;
      if (responseHtml) {
        try {
          const item = JSON.parse(
            responseHtml
              .trim()
              .replace(/'/g, '"')
              .replace(/(\w+):/g, '"$1":')
          );
          const [value]: any = Object.values(item);

          return (
            <List.Item
              style={{
                display: "flex",
                padding: "10px 0px",
                flexDirection: "row",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {/* <ol style={{ width: "600px" }}> */}
              {/* {item &&
                  Object.values(item).map((values: any, idx: any) => ( */}
              {/* <li> */}
              <Typography.Text>{value}</Typography.Text>
              {/* </li> */}
              {/* ))} */}
              {/* </ol> */}
            </List.Item>
          );
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    }
    return "";
  };
  // console.log(renderItem2());
  const renderRecommendations = (item: any, index: number) => {
    return (
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
  };
  const renderRecommendationsForSummary = (item: any, index: number) => {
    return (
      <List.Item
        actions={[<EditOutlined onClick={() => alert("Edit clicked")} />]}
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "15px",
          // marginBottom: "20px",
          cursor: "pointer",
          height: "103px",
          // width: "100%",
          boxShadow:
            selectedFAP === item ? "rgb(0 146 255 / 28%) 2px 2px 16px" : "none",
          marginRight: "10px",
          justifyContent: "flex-end",
        }}
        // onClick={() => handleFAPChange(item)}
      >
        <Typography.Text style={{ fontSize: "13px" }}>{item}</Typography.Text>
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
            <div
              style={{
                width: "100%",
                maxHeight: 490,
                borderWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflowY: "auto",
              }}
            >
              {currentModule?.type !== "brief-description" ? (
                pageIndex === MODULES.FifthModule.length - 2 &&
                currentModule?.type === "selection" ? (
                  <div>
                    <Typography.Text>
                      Please select one Task to start today!
                    </Typography.Text>
                    <List
                      grid={{ column: 2 }}
                      dataSource={necessaryTasks}
                      style={{ marginTop: "45px" }}
                      renderItem={(task: string) => (
                        <List.Item
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                            border: "1px solid #f0f0f0",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            boxShadow:
                              selectedTask === task
                                ? "rgb(0 146 255 / 28%) 2px 2px 16px"
                                : "none",
                            marginRight: "10px",
                          }}
                          onClick={() => setSelectedTask(task)}
                        >
                          <Typography.Text>{task}</Typography.Text>
                        </List.Item>
                      )}
                    />
                  </div>
                ) : currentModule?.type === "single" ? (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography.Text
                        style={{ fontSize: "18px", textAlign: "center" }}
                      >
                        Congratulations on completing Module 5
                      </Typography.Text>
                      <Typography.Text
                        style={{ fontSize: "16px", textAlign: "center" }}
                      >
                        Here is your summary:
                      </Typography.Text>
                    </div>
                    <List
                      grid={{
                        xs: 1,
                        sm: 3,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                      }}
                      dataSource={selectedIdentities["30-day goal"]}
                      renderItem={renderRecommendationsForSummary}
                      style={{
                        background: theme.palette.primary.light,
                        // padding: "20px",
                        // width: "100%",
                        // display: "flex",
                        // flexDirection: "row",
                      }}
                    />
                    <List
                      grid={{
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 2,
                        xxl: 2,
                      }}
                      dataSource={necessaryTasks}
                      style={{ marginTop: "15px" }}
                      renderItem={(task: string) => (
                        <List.Item
                          actions={[
                            <EditOutlined
                              onClick={() => alert("Edit clicked")}
                            />,
                          ]}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            height: "68px",
                            justifyContent: "space-between",
                            padding: "5px",
                            border: "1px solid #f0f0f0",
                            borderRadius: "15px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            boxShadow:
                              selectedTask === task
                                ? "rgb(0 146 255 / 28%) 2px 2px 16px"
                                : "none",
                            marginRight: "10px",
                          }}
                          // onClick={() => setSelectedTask(task)}
                        >
                          <Typography.Text style={{ fontSize: "13px" }}>
                            {task}
                          </Typography.Text>
                        </List.Item>
                      )}
                    />
                  </div>
                ) : !currentModule?.identities ? (
                  <div>
                    <Typography>{currentModule?.text}</Typography>
                    <br />
                    <Typography style={{ fontWeight: "600", padding: 20 }}>
                      {currentModule?.question}
                      {renderItem2()}
                    </Typography>
                    <br />
                    <Typography>{currentModule?.caption}</Typography>
                  </div>
                ) : selectedIdentities === null ||
                  selectedIdentities.length === 0 ? (
                  identities.length > 0 && (
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
                        Please select a Immediate Action Plan
                      </Typography>
                      <Typography.Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <Typography.Text style={{ marginRight: 12 }}>
                          Goal :
                        </Typography.Text>
                        {renderItem2()}
                      </Typography.Text>
                      <List
                        dataSource={JSON.parse(identities)}
                        renderItem={renderItem}
                        style={{
                          background: theme.palette.primary.light,
                          padding: "20px",
                          width: "100%",
                        }}
                      />
                    </div>
                  )
                ) : (
                  selectedIdentities.length !== 0 &&
                  selectedIdentities !== null && (
                    <div>
                      <Typography>
                        Please select an area of the Immediate Action Plan you'd
                        like to focus on:
                      </Typography>
                      <List
                        dataSource={selectedIdentities["30-day goal"].slice(
                          0,
                          4
                        )}
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
                  )
                )
              ) : (
                <div>
                  <Typography.Text
                    style={{ display: "flex", paddingBottom: "10px" }}
                  >
                    Please identify all tasks necessary to complete your 30 day
                    goal:
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px 0px",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedFAP}
                  </Typography.Text>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <List
                      grid={{ column: 2 }}
                      dataSource={necessaryTasks.slice(0, 4)}
                      renderItem={(task: string) => (
                        <List.Item
                          actions={[
                            <EditOutlined
                              onClick={() => alert("Edit clicked")}
                            />,
                            <ReloadOutlined />,
                          ]}
                          // className="question"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                            border: "1px solid #f0f0f0",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            marginRight: "10px",
                            // boxShadow:
                            //   selectedTask === task
                            //     ? "rgb(0 146 255 / 28%) 2px 2px 16px"
                            //     : "none",
                          }}
                        >
                          <Typography.Text style={{ fontSize: "13px" }}>
                            {task}
                          </Typography.Text>
                          <Space>
                            {/* <Button icon={<EditOutlined />} />
                              <Button icon={<ReloadOutlined />} /> */}
                          </Space>
                        </List.Item>
                      )}
                    />
                    {inputVisible && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Input
                          type="text"
                          size="large"
                          style={{
                            width: 200,
                          }}
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputConfirm}
                          onPressEnter={handleInputConfirm}
                        />
                      </div>
                    )}
                    {!inputVisible && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button size="large" onClick={showInput}>
                          + Add Your Own
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentModule?.type === "free-response" && (
                <>
                  <TextArea
                    showCount
                    maxLength={100}
                    onChange={onChange}
                    placeholder="Type your response"
                    style={{ height: 200, resize: "none" }}
                  />
                  <TextArea
                    showCount
                    maxLength={100}
                    onChange={onChange}
                    placeholder="Type your response"
                    style={{ height: 200, resize: "none" }}
                  />
                </>
              )}

              {currentModule?.type === "precursor-question" && (
                <div>
                  <Radio.Group
                    onChange={onChangeOptions}
                    value={value}
                    style={{ marginBottom: 50 }}
                  >
                    <Space direction="horizontal">
                      {currentModule?.options &&
                        currentModule?.options.map((item) => (
                          <Radio key={item} value={item}>
                            {item}
                          </Radio>
                        ))}
                    </Space>
                  </Radio.Group>
                  {value === "Yes" && (
                    <div style={{ marginRight: "5px" }}>
                      <Typography>{currentModule?.q_conditional}</Typography>
                      <TextArea
                        showCount
                        maxLength={1000}
                        onChange={onChange}
                        placeholder="Type your response"
                        style={{
                          height: 200,
                          resize: "none",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </Row>
      <br />
      <Row justify={"space-between"} align={"middle"}>
        <Col span={4} xs={24} sm={4}>
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
            disabled={pageIndex === 0}
          />
        </Col>
        <Col span={4} xs={24} sm={8}>
          <DotPagination
            pageIndex={pageIndex}
            dataLength={MODULES.FifthModule.length}
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
            // disabled={pageIndex === MODULES.FifthModule.length - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FifthModule;
