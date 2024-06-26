import React, { Suspense, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { theme } from "../../../Theme/theme";
import { useFormik } from "formik";
import InputField from "../../../Components/InputFeild/InputFeild";
import { loginValidationSchema } from "../../../Utils/validators";
import AppButton from "../../../Components/Button/AppButton";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { toastMessage } from "../../../Utils/helperFunctions";
import { LoginFormProps, TOAST_MESSAGE_TYPES } from "../types";
import { Images, LOADING_TIMOUT_DELAY } from "../../../Utils/constants";
import { useTranslation } from "react-i18next";
import useGoogleSignIn from "../../../Hooks/useGoogleSignIn";
import { useDispatch } from "react-redux";
import { loginUser, socialLogin } from "../../../Redux/Auth/authAction";
import { AppDispatch } from "../../../Redux/store";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const [isLoading, setIsLoading] = useState(false);

  const { error, loading, signinWithGoogle } = useGoogleSignIn();

  const onLoginSuccess = () => {
    setTimeout(() => {
      setIsLoading(false);

      toastMessage({
        type: TOAST_MESSAGE_TYPES.SUCCESS,
        content: t("loginSuccessfull"),
        duration: 3,
      });
      navigate("/");
    }, LOADING_TIMOUT_DELAY);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values: LoginFormProps) => {
      setIsLoading(true);
      const body = {
        email: values.email?.toLowerCase(),
        password: values.password,
      };

      // localStorage.setItem(USER_AUTH_TOKEN_KEY, "token");
      // localStorage.setItem(
      //   USER_SESSION_KEY,
      //   JSON.stringify({
      //     success: true,
      //     data: {
      //       isSocialAuth: false,
      //       _id: "66461984c19da30e34b37ac3",
      //       firstName: "John",
      //       lastName: "Doe",
      //       email: "john@test.com",
      //       createdAt: "2024-05-16T14:34:44.453Z",
      //       updatedAt: "2024-05-16T14:34:44.453Z",
      //       __v: 0,
      //       id: "66461984c19da30e34b37ac3",
      //     },
      //     token: {
      //       token:
      //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDYxOTg0YzE5ZGEzMGUzNGIzN2FjMyIsImV4cCI6MTcxOTA2OTY3NywiaWF0IjoxNzE2MzkxMjc3fQ.b916Jq_ft3P1zOwJBmg1dJa266H3TV0LO4tsjNJFSRo",
      //       exp: "2024-06-22T15:21:17.847Z",
      //     },
      //   })
      // );
      // navigate("/");
      dispatch(loginUser(body)).then((response) => {
        if (response) {
          if (!response.payload?.message) {
            onLoginSuccess();
          } else {
            setIsLoading(false);
            toastMessage({
              type: TOAST_MESSAGE_TYPES.ERROR,
              content: t("loginFailed"),
              duration: 5,
            });
          }
        } else {
          toastMessage({
            type: TOAST_MESSAGE_TYPES.ERROR,
            content: t("loginFailed"),
            duration: 5,
          });
        }
      });
    },
  });

  const handleGoogleSignIn = async () => {
    const user: any | null = await signinWithGoogle();
    if (user) {
      const body = {
        firstName: user?.displayName?.split(" ")[0],
        lastName: user?.displayName?.split(" ")[1],
        email: user?.email?.toLowerCase(),
        accessToken: user.accessToken,
      };
      dispatch(socialLogin(body)).then((response) => {
        if (response) {
          if (!response.payload?.message) {
            onLoginSuccess();
          } else {
            setIsLoading(false);
            toastMessage({
              type: TOAST_MESSAGE_TYPES.ERROR,
              content: t("loginFailed"),
              duration: 5,
            });
          }
        } else {
          toastMessage({
            type: TOAST_MESSAGE_TYPES.ERROR,
            content: t("loginFailed"),
            duration: 5,
          });
        }
      });
      // onLoginSuccess();
    } else {
      if (error) {
        toastMessage({
          type: TOAST_MESSAGE_TYPES.ERROR,
          content: error,
          duration: 5,
        });
      }
    }
  };

  return (
    <Suspense
      fallback={
        <div className="spinnerContainer">
          <Spin size="large" />
        </div>
      }
    >
      <Box
        sx={{
          height: "100vh",
          // backgroundColor: theme.palette.primary.main
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${Images.bckImg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            filter: "blur(8px)",
            zIndex: -1,
          }}
        />
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={7} sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid container direction="column">
              <img
                src={Images.logo}
                alt="logo"
                style={{
                  width: 320,
                  height: 160,
                  objectFit: "contain",
                  position: "absolute",
                  top: 40,
                  left: 80,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            sx={{ flexBasis: { xs: "80%", sm: "100%" } }}
            xs={12}
            sm={5}
          >
            <Card
              sx={{
                width: { xs: "80%", sm: "65%" },
                height: { xs: "80%", sm: 400 },
                padding: theme.spacing(4),
                borderRadius: theme.spacing(2),
                backgroundColor: "transparent",
                borderWidth: 3,
                borderColor: theme.palette.primary.light,
                borderStyle: "solid",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={theme.palette.primary.light}
                  pb={4}
                  align="center"
                >
                  {t("signIn")}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} mb={1}>
                      <InputField
                        placeholder={t("emailPlaceholder")}
                        value={formik.values.email}
                        onChangeText={formik.handleChange("email")}
                        error={
                          formik.touched.email && formik.errors.email
                            ? {
                                isError: true,
                                message: formik.errors.email as string,
                              }
                            : undefined
                        }
                        size="large"
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <InputField
                        placeholder={t("passwordPlaceholder")}
                        value={formik.values.password}
                        onChangeText={formik.handleChange("password")}
                        error={
                          formik.touched.password && formik.errors.password
                            ? {
                                isError: true,
                                message: formik.errors.password as string,
                              }
                            : undefined
                        }
                        inputType={"password"}
                        size="large"
                      />
                      {/* <Typography
                        variant="subtitle1"
                        sx={{
                          color: theme.palette.error.main,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "14px",
                        }}
                      > */}
                      <Link
                        style={{
                          textDecoration: "underline",
                          color: theme.palette.error.main,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        to={"/forgot_credentials"}
                      >
                        {" "}
                        {t("forgotPassword")}
                      </Link>
                      {/* </Typography> */}
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <AppButton
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        bgColor={theme.palette.primary.main}
                        onClick={formik.handleSubmit}
                        loading={isLoading}
                      >
                        {t("signIn")}
                      </AppButton>
                    </Grid>
                    <Grid item xs={12}>
                      <AppButton
                        type="primary"
                        block
                        size="large"
                        bgColor={theme.palette.primary.light}
                        borderColor={theme.palette.primary.main}
                        onClick={handleGoogleSignIn}
                        color="black"
                        loading={loading}
                        spinnerColor={"#000"}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                          }}
                        >
                          <img
                            src={Images.google}
                            width={25}
                            height={25}
                            alt="ad"
                          />
                          {t("signInWithGoogle")}
                        </div>
                      </AppButton>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <Typography variant="body1">
                      {t("accountNotExists")}{" "}
                      <Link to={"/register"}>{t("signUp")}</Link>
                    </Typography>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Suspense>
  );
};

export default Login;
