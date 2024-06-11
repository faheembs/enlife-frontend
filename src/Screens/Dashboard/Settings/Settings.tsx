/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from "react";
import { Spin, Form, Input, Button, Card } from "antd";
import AppButton from "../../../Components/Button/AppButton";
import { theme } from "../../../Theme/theme";
import { getUserData } from "../../../Utils/helperFunctions";
import { Container } from "@mui/material";
import { useAppDispatch } from "../../../Hooks/reduxHook";
import { updatePassword } from "../../../Redux/Auth/authAction";

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const user = getUserData();
  const onFinish = (values: any) => {
    console.log(
      "Received values:",
      values.email,
      values.currentPassword,
      values.newPassword
    );
    dispatch(
      updatePassword({
        email: values.email,
        password: values.currentPassword,
        newPassword: values.newPassword,
      })
    );
  };

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      }
    >
      <Container maxWidth="md">
        <Card style={{}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            {/* <h1>Settings</h1> */}
            <Form
              form={form}
              name="settings"
              layout="vertical"
              onFinish={onFinish}
              style={{ width: "100%", maxWidth: "600px" }}
            >
              <Form.Item
                label="Email"
                name="email"
                initialValue={user.email ?? ""}
              >
                <Input
                  size="large"
                  disabled
                  style={{ fontWeight: "bold", color: "black" }}
                />
              </Form.Item>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <AppButton
                  type="primary"
                  htmlType="submit"
                  block
                  size="middle"
                  bgColor={theme.palette.primary.main}
                >
                  Save Changes
                </AppButton>
                {/* <Button type="primary" htmlType="submit">
              Save Changes
            </Button> */}
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Container>
    </Suspense>
  );
};

export default Settings;
