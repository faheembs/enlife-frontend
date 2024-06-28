import React, { Suspense, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { theme } from "../../../Theme/theme";
import { useFormik } from "formik";
import InputField from "../../../Components/InputFeild/InputFeild";
import { forgotCredentialsValidationSchema } from "../../../Utils/validators";
import AppButton from "../../../Components/Button/AppButton";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { toastMessage } from "../../../Utils/helperFunctions";
import { TOAST_MESSAGE_TYPES } from "../types";
import { Images, LOADING_TIMOUT_DELAY } from "../../../Utils/constants";
import { useTranslation } from "react-i18next";

const ForgotCredentials: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "forgotCredentials",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(true);

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
      username: "",
    },
    validationSchema: forgotCredentialsValidationSchema(isPasswordReset),
    enableReinitialize: true,
    onSubmit: (values: any) => {
      //   setIsLoading(true);
      const body = isPasswordReset
        ? { email: values.email?.toLowerCase() }
        : { username: values.username };

      // console.log(body);
      //   dispatch(loginUser(body)).then((response) => {
      //     if (response) {
      //       if (!response.payload?.message) {
      //         onLoginSuccess();
      //       } else {
      //         setIsLoading(false);
      //         toastMessage({
      //           type: TOAST_MESSAGE_TYPES.ERROR,
      //           content: t("loginFailed"),
      //           duration: 5,
      //         });
      //       }
      //     } else {
      //       toastMessage({
      //         type: TOAST_MESSAGE_TYPES.ERROR,
      //         content: t("loginFailed"),
      //         duration: 5,
      //       });
      //     }
      //   });
    },
  });

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
            sx={{
              flexBasis: { xs: "80%", sm: "100%" },
              display: "flex",
              alignItems: "center",
            }}
            xs={12}
            sm={5}
          >
            <Card
              sx={{
                width: { xs: "80%", sm: "65%" },
                height: { xs: "80%", sm: 300 },
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
                  {isPasswordReset ? t("resetPassword") : t("resetEmail")}
                </Typography>
                <Typography
                  variant="body1"
                  color={theme.palette.primary.light}
                  pb={2}
                  align="center"
                >
                  {isPasswordReset
                    ? t("forgotPasswordText")
                    : t("forgotEmailText")}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} mb={1}>
                      {isPasswordReset ? (
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
                          style={{ marginBottom: 0 }}
                        />
                      ) : (
                        <InputField
                          placeholder={t("usernamePlaceholder")}
                          value={formik.values.username}
                          onChangeText={formik.handleChange("username")}
                          error={
                            formik.touched.username && formik.errors.username
                              ? {
                                  isError: true,
                                  message: formik.errors.username as string,
                                }
                              : undefined
                          }
                          size="large"
                          style={{ marginBottom: 0 }}
                        />
                      )}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: theme.palette.primary.light,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "16px",
                          marginTop: 0,
                          fontWeight: "bold",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => setIsPasswordReset(!isPasswordReset)}
                      >
                        {isPasswordReset
                          ? t("forgotEmail")
                          : t("forgotPassword")}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12} mb={2}>
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
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: theme.palette.error.main,
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "14px",
                        }}
                      >
                        {t("forgotPassword")}
                      </Typography>
                    </Grid> */}
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
                        {isPasswordReset ? t("resetPassword") : t("resetEmail")}
                      </AppButton>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                  >
                    <Typography variant="body1">
                      {t("backToSignIn")}{" "}
                      <Link to={"/login"}>{t("signIn")}</Link>
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

export default ForgotCredentials;
