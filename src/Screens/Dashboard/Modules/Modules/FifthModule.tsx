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
import { EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
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
} from "../../../../Redux/Modules/modulesAction";
import { useAppSelector } from "../../../../Hooks/reduxHook";
import AppSpinner from "../../../../Components/AppSpinner/AppSpinner";

const { TextArea } = Input;

const FifthModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [selectedIdentities, setSelectedIdentities] = useState<any>([]);
  const [textResponse, setTextResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFAP, setSelectedFAP] = useState<any>();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [necessaryTasks, setNecessaryTasks] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<string>("");

  const currentModule = MODULES.FifthModule[pageIndex];

  const [identities, setIdentities] = useState<any>([]);

  const { questionData, modulesByUserId } = useAppSelector(
    (state: any) => state.module
  );

  const dispatch = useDispatch<AppDispatch>();
  const user: any = getUserData();

  const filteredModules =
    modulesByUserId &&
    modulesByUserId.filter(
      (module: any) => module.moduleNumber === MODULES_LABEL.fourthModule.label
    );
  useEffect(() => {
    dispatch(getAllModulesByUserID({ userId: user.id }));
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
  const questions = `${currentModule.question}${currentModule.caption}`;
  // useEffect(() => {
  //   if (currentModule) {
  //     setIdentities(currentModule?.identities ?? []);
  //   }
  // }, [currentModule, currentModule?.identities]);

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
        type: "error",
        content: "Assessment is completed",
        duration: 5,
      });
      setLoading(false);
      return;
    }

    if (
      ((currentModule.question && textResponse === "") ||
        (currentModule.question && textResponse) === null ||
        (currentModule.identities && value === null)) &&
      !currentModule.identities
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
            response_type: currentModule.type,
            answers: value === "Yes" ? textResponse : null,
            precursor_question: value,
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
  const renderItem = (item: any, index: number) => {
    const [key, values]: [any, any] = Object.entries(item)[0];
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
        }}
        onClick={() => handleFAPRecommendationChange(item)}
      >
        <Typography.Text style={{ width: "190px", fontWeight: "bold" }}>
          {key}
        </Typography.Text>
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
  const renderItem2 = () => {
    let item = JSON.parse(filteredModules[0].ai_evaluation.response_html);
    const [key, values]: [any, any] = Object.entries(item)[0];
    return (
      <List.Item
        style={{
          display: "flex",
          padding: "10px",
          flexDirection: "row",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        // onClick={() => handleIdentityChange(item)}
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
          height: "48px",
          width: "100%",
          boxShadow:
            selectedFAP === item ? "rgb(0 146 255 / 28%) 2px 2px 16px" : "none",
        }}
        // onClick={() => handleFAPChange(item)}
      >
        <Typography.Text style={{ fontSize: "13px" }}>{item}</Typography.Text>
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
            <div
              style={{
                width: "100%",
                height: 460,
                borderWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {currentModule.type !== "brief-description" ? (
                pageIndex === MODULES.FifthModule.length - 2 &&
                currentModule.type === "selection" ? (
                  <div>
                    <Typography.Text>
                      Please select one Task to start today!
                    </Typography.Text>
                    <List
                      grid={{ gutter: 16, column: 2 }}
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
                          }}
                          onClick={() => setSelectedTask(task)}
                        >
                          <Typography.Text>{task}</Typography.Text>
                        </List.Item>
                      )}
                    />
                  </div>
                ) : currentModule.type === "single" ? (
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
                      grid={{ gutter: 16, column: 3 }}
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
                      grid={{ gutter: 16, column: 2 }}
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
                ) : !currentModule.identities ? (
                  <div>
                    <Typography>{currentModule.text}</Typography>
                    <br />
                    <Typography style={{ fontWeight: "600", padding: 20 }}>
                      {currentModule.question}
                      {filteredModules && renderItem2()}
                    </Typography>
                    <br />
                    <Typography>{currentModule.caption}</Typography>
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
                        Please select a Immediate Fitness Action Plan
                      </Typography>
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
                        Please select an area of the Immediate Fitness Action
                        Plan you'd like to focus on:
                      </Typography>
                      <List
                        dataSource={selectedIdentities["30-day goal"]}
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
                      grid={{ gutter: 16, column: 2 }}
                      dataSource={necessaryTasks}
                      renderItem={(task: string) => (
                        <List.Item
                          actions={[
                            <EditOutlined
                              onClick={() => alert("Edit clicked")}
                            />,
                            <ReloadOutlined />,
                          ]}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                            border: "1px solid #f0f0f0",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            cursor: "pointer",
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

              {currentModule.type === "free-response" && (
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

              {currentModule.type === "precursor-question" && (
                <>
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
                  {value === "Yes" && (
                    <>
                      <Typography>{currentModule.q_conditional}</Typography>
                      <TextArea
                        showCount
                        maxLength={1000}
                        onChange={onChange}
                        placeholder="Type your response"
                        style={{ height: 300, resize: "none" }}
                      />
                    </>
                  )}
                </>
              )}
            </div>
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
            // disabled={pageIndex === MODULES.FifthModule.length - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FifthModule;
