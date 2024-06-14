import React, { Suspense, useEffect, useState } from "react";
import { Spin, Form, Input, Card, Tabs, Typography } from "antd";
import AppButton from "../../../Components/Button/AppButton";
import { theme } from "../../../Theme/theme";
import { getUserData } from "../../../Utils/helperFunctions";
import { Container } from "@mui/material";
import { useAppDispatch } from "../../../Hooks/reduxHook";
import { updateEmailOrPassword } from "../../../Redux/Auth/authAction";
import { LoginCredentials } from "../../../Redux/Auth/types";

interface UpdateData {
  email: string;
  newEmail?: string;
  password?: string;
  newPassword?: string;
}

const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const [user, setUser] = useState(getUserData());
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: user.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      updateEmail: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onFinish = async (values: any) => {
    const updateData: UpdateData = {
      email: values.email,
    };

    if (values.updateEmail) {
      updateData.newEmail = values.updateEmail;
    }

    if (values.currentPassword) {
      updateData.password = values.currentPassword;
    }

    if (values.newPassword) {
      updateData.newPassword = values.newPassword;
    }

    await dispatch(updateEmailOrPassword(updateData as LoginCredentials));
    const updatedUser = getUserData();
    setUser(updatedUser);
    form.resetFields();
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
        <Card>
          <Typography.Title level={3} style={{ margin: "10px 0px" }}>
            Account Settings
          </Typography.Title>
          <Tabs defaultActiveKey="email">
            <TabPane tab="Change Email" key="email">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Form
                  form={form}
                  name="changeEmail"
                  layout="vertical"
                  onFinish={onFinish}
                  style={{
                    width: "100%",
                    minHeight: "366px",
                    maxWidth: "600px",
                    paddingTop: "20px",
                  }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                    initialValue={user.email ?? ""}
                  >
                    <Input disabled size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Update Email"
                    name="updateEmail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                    initialValue={""}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <AppButton
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      bgColor={theme.palette.primary.main}
                    >
                      Save Changes
                    </AppButton>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="Change Password" key="password">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Form
                  form={form}
                  name="changePassword"
                  layout="vertical"
                  onFinish={onFinish}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    minHeight: "350px",
                    paddingTop: "20px",
                  }}
                >
                  <Form.Item label="Current Password" name="currentPassword">
                    <Input.Password size="large" />
                  </Form.Item>
                  <Form.Item label="New Password" name="newPassword">
                    <Input.Password size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
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
                      size="large"
                      bgColor={theme.palette.primary.main}
                    >
                      Save Changes
                    </AppButton>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Container>
    </Suspense>
  );
};

export default Settings;
