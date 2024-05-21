import React, { useState } from "react";
import { Container } from "@mui/material";
import { Card, Col, Input, Row, Typography } from "antd";
import AppButton from "../../../../Components/Button/AppButton";
import DotPagination from "../../../../Components/DotPagination/DotPagination";
import { MODULES } from "../../../../Utils/constants";

const { TextArea } = Input;

const FirstModule = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const onChange = (e: any) => {
    console.log("Change:", e.target.value);
  };

  const handleNext = () => {
    setPageIndex((prevIndex) =>
      Math.min(prevIndex + 1, MODULES.FirstModules.length - 1)
    );
  };

  const handleBack = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentModule = MODULES.FirstModules[pageIndex];
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
              <Typography>{currentModule.caption}</Typography>
            </div>
            <TextArea
              showCount
              maxLength={100}
              onChange={onChange}
              placeholder="Type your response"
              style={{ height: 200, resize: "none" }}
            />
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
            dataLength={MODULES.FirstModules.length}
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
            disabled={pageIndex === MODULES.FirstModules.length - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FirstModule;
