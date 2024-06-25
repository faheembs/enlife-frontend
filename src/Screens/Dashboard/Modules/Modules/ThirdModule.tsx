import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Input,
  Select,
  Button,
  List,
} from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES, MODULES_LABEL } from "../../../../Utils/constants";
import { getUserData, toastMessage } from "../../../../Utils/helperFunctions";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { theme } from "../../../../Theme/theme";
import {
  createOrUpdateModule,
  getQuestionData,
  postQuestionAssessmentModule3,
} from "../../../../Redux/Modules/modulesAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import { useAppSelector } from "../../../../Hooks/reduxHook";
import "./modulesContent.css";
const { Option } = Select;

const ThirdModule = ({ activeKey }: any) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState<any>([]);
  const [selectedIdentities, setSelectedIdentities] = useState<any>([]);
  const [identityKeys, setIdentityKeys] = useState<any>(null);
  const [customRoles, setCustomRoles] = useState<any>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, setAiResponse] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = getUserData();

  const [identities, setIdentities] = useState<
    { id: number; name: string }[] | undefined
  >([]);

  useEffect(() => {
    dispatch(
      getQuestionData({
        userId: user.id,
        moduleNumber: MODULES_LABEL.thirdModule.label,
        question: MODULES.ThirdModule[0].question,
      })
    );
  }, []);

  const { questionData } = useAppSelector(
    (state: { module: any }) => state.module
  );
  useEffect(() => {
    if (selectedIdentities.length > 0) {
      const [identitiesKey, identitiesValue]: [any, any] = Object.entries(
        selectedIdentities[0]
      )[0];
      setIdentityKeys(identitiesKey);
    }
  }, [selectedIdentities]);
  useEffect(() => {
    // console.log(questionData);
    if (questionData.selection.length > 0) {
      const roles = questionData.selection;
      setSelectedRoles(roles);
    }
  }, [questionData]);
  // console.log("selectedIdentities", selectedIdentities);
  const currentModule = MODULES.ThirdModule[pageIndex];

  useEffect(() => {
    if (currentModule) {
      setIdentities(currentModule?.identities ?? []);
    }
  }, [currentModule, currentModule?.identities]);

  const handleDelete = (id: any) => {
    if (identities && identities.length > 0) {
      setIdentities(identities.filter((identity: any) => identity.id !== id));
    }
  };

  const handleTagChange = (tag: any, checked: any) => {
    const nextSelectedRoles = checked
      ? [...selectedRoles, tag]
      : selectedRoles.filter((t: any) => t !== tag);

    if (selectedRoles.length >= 3 && !selectedRoles.includes(tag)) {
      toastMessage({
        type: "error",
        content: "Selection Limit Reached",
        duration: 5,
      });
      return;
    }
    setSelectedRoles(nextSelectedRoles);
  };

  const showInput = () => {
    if (selectedRoles.length >= 3) {
      toastMessage({
        type: "error",
        content: "Selection Limit Reached",
        duration: 5,
      });
      return;
    }
    setInputVisible(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !customRoles.includes(inputValue)) {
      setCustomRoles([...customRoles, inputValue]);
      setSelectedRoles([...selectedRoles, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleNext = async () => {
    if ([...selectedRoles, ...customRoles].length < 1) {
      toastMessage({
        type: "error",
        content: "Please select upto 3 options",
        duration: 5,
      });
      return;
    }

    if (pageIndex === MODULES.ThirdModule.length - 2) {
      const body = {
        selections: selectedRoles,
      };
      await dispatch(postQuestionAssessmentModule3(body)).then((res) => {
        setAiResponse(res.payload);
      });
      // console.log(JSON.parse(aiResponse));
    } else {
      dispatch(
        createOrUpdateModule({
          userId: user.id,
          moduleNumber: MODULES_LABEL.thirdModule.label,
          questionnaires: {
            questionID: questionData?._id ?? false,
            question_text: MODULES.ThirdModule[0].question,
            response_type: MODULES.ThirdModule[0].type,
            selection: selectedRoles,
          },
          ai_evaluation: {
            response_text: JSON.stringify(selectedIdentities[0]),
            response_html: JSON.stringify(selectedIdentities[0]),
          },
        })
      );
    }
    dispatch(
      getQuestionData({
        userId: user.id,
        moduleNumber: MODULES_LABEL.thirdModule.label,
        question: MODULES.ThirdModule[0].question,
      })
    );
    if (
      pageIndex === MODULES.ThirdModule.length - 1 &&
      selectedIdentities.length > 0
    ) {
      activeKey("4");
    } else {
      toastMessage({
        type: "warning",
        content: "Please select one fitness Identity",
        duration: 5,
      });
    }
    if (pageIndex !== 1) {
      setPageIndex((prevIndex) =>
        Math.min(prevIndex + 1, MODULES.ThirdModule.length - 1)
      );
    }
  };
  const handleBack = () => {
    dispatch(
      getQuestionData({
        userId: user.id,
        moduleNumber: MODULES_LABEL.thirdModule.label,
        question: MODULES.ThirdModule[0].question,
      })
    );
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const handleIdentityChange = (item: any) => {
    if (identities) {
      const isSelected = selectedIdentities.includes(item);
      const newSelection = isSelected ? [] : [item];

      setSelectedIdentities(newSelection);
    }
  };
  // console.log(JSON.parse(aiResponse));
  const data = aiResponse
    ? JSON.parse(aiResponse.replace(/'/g, '"').replace(/(\w+):/g, '"$1":'))
    : [];
  const renderItem = (item: any, index: number) => {
    const [key, values]: [any, any] = Object.entries(item)[0];

    // console.log("identity key value", identitiesKey, identitiesValue, key);
    return (
      <List.Item
        actions={[
          <EditOutlined onClick={() => alert("Edit clicked")} />,
          <ReloadOutlined onClick={() => handleDelete(item.id)} />,
        ]}
        style={{
          display: "flex",
          padding: "10px",
          flexDirection: "row",
          border: "1px solid #f0f0f0",
          borderRadius: "5px",
          marginBottom: "20px",
          cursor: "pointer",
          boxShadow:
            identityKeys === key
              ? "rgb(0, 146, 255, 0.6) 1px 1px 16px"
              : "none",
        }}
        onClick={() => handleIdentityChange(item)}
      >
        {/* <Typography.Text style={{ width: "190px", fontWeight: "bold" }}>
          {key}
        </Typography.Text> */}
        {/* <ul style={{ width: "600px" }}> */}
        {/* {values.map((value: any, idx: any) => ( */}
        {/* <li> */}
        <Typography.Text>{values}</Typography.Text>
        {/* </li> */}
        {/* ))} */}
        {/* </ul> */}
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
          {currentModule.roles && (
            <div
              style={{
                width: "100%",
                maxHeight: 420,
                overflowY: "auto",
                borderWidth: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography style={{ fontWeight: "600" }}>
                Please select up to 3 roles
              </Typography>
              <div
                style={{
                  paddingTop: 10,
                }}
              >
                {currentModule.roles?.map((role, index) => (
                  <Tag.CheckableTag
                    key={index}
                    checked={selectedRoles.includes(role)}
                    onChange={(checked) => handleTagChange(role, checked)}
                    style={{
                      width: 180,
                      padding: 5,
                      margin: 5,
                      border: "1px solid #ccc",
                      boxShadow: selectedRoles.includes(role)
                        ? "rgba(0, 146, 255, 9.28) 0px 1px 5px 3px"
                        : "none",
                      backgroundColor: theme.palette.primary.light,
                      color: "#000",
                      borderRadius: 10,
                    }}
                  >
                    {role}
                  </Tag.CheckableTag>
                ))}
                {customRoles.map((role: any, index: any) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() =>
                      setCustomRoles(customRoles.filter((r: any) => r !== role))
                    }
                    style={{ width: 180, padding: 5 }}
                  >
                    {role}
                  </Tag>
                ))}
                {inputVisible && (
                  <Input
                    type="text"
                    size="middle"
                    style={{ width: 200 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Button size="middle" onClick={showInput}>
                    + Add Your Own Role
                  </Button>
                )}
              </div>
            </div>
          )}
          {currentModule.identities && (
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
                Who do you want to be?
              </Typography>
              <div style={{ maxHeight: 420, overflowX: "auto" }}>
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
            </div>
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
            // disabled={
            //   pageIndex === 0 || pageIndex === MODULES.ThirdModule.length - 1
            // }
          />
        </Col>
        <Col span={4} xs={24} sm={8}>
          <DotPagination
            pageIndex={pageIndex}
            dataLength={MODULES.ThirdModule.length}
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

export default ThirdModule;
