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
import { MODULES } from "../../../../Utils/constants";
import { toastMessage } from "../../../../Utils/helperFunctions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const ThirdModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState<any>([]);
  const [selectedIdentities, setSelectedIdentities] = useState<any>([]);
  const [customRoles, setCustomRoles] = useState<any>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const currentModule = MODULES.ThirdModule[pageIndex];

  const [identities, setIdentities] = useState<
    { id: number; name: string }[] | undefined
  >([]);

  useEffect(() => {
    if (currentModule) {
      setIdentities(currentModule?.identities ?? []);
    }
  }, [currentModule.identities]);

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

  const handleNext = () => {
    if ([...selectedRoles, ...customRoles].length < 3) {
      toastMessage({
        type: "error",
        content: "Please select 3 options",
        duration: 5,
      });
      return;
    }
    setPageIndex((prevIndex) =>
      Math.min(prevIndex + 1, MODULES.SecondModule.length - 1)
    );
  };

  const handleBack = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleIdentityChange = (item: any) => {
    if (identities) {
      const identityItem = !selectedIdentities.includes(item)
        ? [...selectedIdentities, item]
        : selectedIdentities.filter((t: any) => t !== item);

      if (identityItem.length >= 3 && !identityItem.includes(item)) {
        toastMessage({
          type: "error",
          content: "Selection Limit Reached",
          duration: 5,
        });
        return;
      }
      setSelectedIdentities(identityItem);
    }
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
        boxShadow: selectedIdentities.includes(item)
          ? "rgb(0 146 255 / 28%) 2px 2px 16px"
          : "none",
      }}
      onClick={() => handleIdentityChange(item)}
    >
      <Typography>{item.name}</Typography>
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
          {currentModule.roles && (
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
                      boxShadow: selectedRoles.includes(role)
                        ? "rgb(0 146 255 / 28%) 2px 2px 16px"
                        : "none",
                      backgroundColor: "#fff",
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
                    size="small"
                    style={{ width: 200 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Button size="small" onClick={showInput}>
                    + Add Your Own
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
                Please select a Fitness Identity
              </Typography>

              <List
                dataSource={identities}
                renderItem={renderItem}
                style={{ background: "#fff", padding: "20px", width: "100%" }}
              />
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
            dataLength={MODULES.ThirdModule.length}
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
            disabled={pageIndex === MODULES.ThirdModule.length - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ThirdModule;
