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
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { Container } from "@mui/material";
import { formattedDate, getUserData } from "../../../Utils/helperFunctions";
import AppButton from "../../../Components/Button/AppButton";
import { theme } from "../../../Theme/theme";
import { useAppDispatch } from "../../../Hooks/reduxHook";
import { updateProfile } from "../../../Redux/Auth/authAction";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Title } = Typography;
const dateFormat = "YYYY-MM-DD";

const Profile: React.FC = () => {
  const user = getUserData();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    const body = {
      ...values,
      dateOfBirth: dayjs(values.dateOfBirth).format("YYYY-MM-DD"),
    };
    // console.log(body);
    dispatch(updateProfile(body));
  };
  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   // const dates = dateString;
  //   // console.log(date.toISOString(), "---", dateString);

  //   const tempDate = dayjs(date).format("YYYY-MM-DD");
  //   console.log("temp", tempDate);
  //   form.setFieldsValue({
  //     dateOfBirth: tempDate,
  //   });
  // };
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
          paddingBottom: 2,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: "auto" },
        }}
      >
        <Row align="middle" justify={"center"} style={{ padding: 30 }}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Avatar size={64} style={{ backgroundColor: "#87d068" }}>
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Avatar>
            <Title level={2} style={{ marginTop: 10 }}>
              {user.firstName} {user.lastName}
            </Title>
            <Typography.Text
              style={{
                fontWeight: "bold",
                // fontWeight: "bold",
                color: "grey",
                marginRight: "10px",
                // fontSize: "18px",
              }}
            >
              Joined:
            </Typography.Text>
            <Typography.Text style={{ fontWeight: "bold", color: "grey" }}>
              {formattedDate(user.createdAt)}
            </Typography.Text>
          </Col>
        </Row>
        {/* <Row align="middle" justify={"center"}>
          
        </Row> */}
        <Divider style={{ margin: "10px 0px" }} />
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
            dateOfBirth: undefined,
          }}
          style={{ padding: "0px 20px" }}
        >
          <Row justify={"space-between"}>
            <Col span={11} sm={11} xs={24}>
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
            <Col span={11} sm={11} xs={24}>
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
            <Col span={24} xs={24}>
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
          </Row>
          <Row justify={"space-between"}>
            <Col span={11} sm={11} xs={24}>
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
                <InputNumber style={{ width: "100%" }} size="large" />
              </Form.Item>
            </Col>
            <Col span={11} sm={11} xs={24}>
              <Form.Item label="Date of birth" name="dateOfBirth">
                <DatePicker
                  style={{ width: "100%" }}
                  maxDate={dayjs(
                    new Date(Date.now()).toISOString(),
                    dateFormat
                  )}
                  defaultValue={dayjs(
                    new Date(Date.now()).toISOString(),
                    dateFormat
                  )}
                  format={dateFormat}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
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
      </Container>
    </Suspense>
  );
};

export default Profile;
