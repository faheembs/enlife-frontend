/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from "react";
import {
  Col,
  Row,
  Spin,
  Avatar,
  Typography,
  Divider,
  Form,
  Select,
  Input,
  InputNumber,
} from "antd";
import { Container } from "@mui/material";
import { formattedDate, getUserData } from "../../../Utils/helperFunctions";
import AppButton from "../../../Components/Button/AppButton";
import { theme } from "../../../Theme/theme";
import { useAppDispatch } from "../../../Hooks/reduxHook";
import { updateProfile } from "../../../Redux/Auth/authAction";

const { Title } = Typography;
const { Option } = Select;

const Profile: React.FC = () => {
  const user = getUserData();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    console.log(values);
    dispatch(updateProfile(values));
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
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: 5,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Row
          align="middle"
          justify={"center"}
          style={{ marginTop: 10, marginBottom: 20 }}
        >
          <Col span={24} style={{ textAlign: "center" }}>
            <Avatar size={64} style={{ backgroundColor: "#87d068" }}>
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Avatar>
            <Title level={2} style={{ marginTop: 10 }}>
              {user.firstName} {user.lastName}
            </Title>
          </Col>
        </Row>
        <Row align="middle" justify={"center"}>
          <Typography.Text style={{ fontWeight: "bold", marginRight: "10px" }}>
            Joined enlife on:
          </Typography.Text>
          {formattedDate(user.createdAt)}
        </Row>
        <Divider style={{ margin: "40px 0px" }} />
        <Form
          form={form}
          name="editProfile"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
          }}
        >
          <Row justify={"space-between"}>
            <Col>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"space-between"}>
            <Col>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender!",
                  },
                ]}
              >
                <Select style={{ width: "225px" }} size="large">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <InputNumber style={{ width: "225px" }} size="large" />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <AppButton
              type="primary"
              htmlType="submit"
              block
              size="middle"
              bgColor={theme.palette.primary.main}
              textStyle={{ width: "300px" }}
            >
              Save Changes
            </AppButton>
          </Form.Item>
        </Form>
      </Container>
    </Suspense>
  );
};

export default Profile;
