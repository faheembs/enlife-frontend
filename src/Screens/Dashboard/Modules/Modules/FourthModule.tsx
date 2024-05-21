import React, { useState } from "react";
import { Container } from "@mui/material";
import { Card, Col, Input, Radio, Space, Row, Typography } from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES } from "../../../../Utils/constants";
import { toastMessage } from "../../../../Utils/helperFunctions";
import { RadioChangeEvent } from "antd/lib";

const { TextArea } = Input;

const FourthModule = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [value, setValue] = useState(null);

  const onChange = (e: any) => {
    console.log("Change:", e.target.value);
  };

  const onChangeOptions = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleNext = () => {
    if (value === null && currentModule.type === "scale") {
      toastMessage({
        type: "error",
        content: "Please select an option",
        duration: 5,
      });
      return;
    }
    setPageIndex((prevIndex) =>
      Math.min(prevIndex + 1, MODULES.FourthModule.length - 1)
    );
  };

  const handleBack = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentModule = MODULES.FourthModule[pageIndex];
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
                      <Radio value={item}>{item}</Radio>
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
            disabled={pageIndex === MODULES.FourthModule.length - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FourthModule;
