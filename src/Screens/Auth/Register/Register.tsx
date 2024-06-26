import React, { Suspense, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { theme } from "../../../Theme/theme";
import { useFormik } from "formik";
import InputField from "../../../Components/InputFeild/InputFeild";
import { RegisterValidationSchema } from "../../../Utils/validators";
import AppButton from "../../../Components/Button/AppButton";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { toastMessage } from "../../../Utils/helperFunctions";
import { RegisterFormProps, TOAST_MESSAGE_TYPES } from "../types";
import { Images, LOADING_TIMOUT_DELAY } from "../../../Utils/constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { registerUser } from "../../../Redux/Auth/authAction";
// import useGoogleSignIn from "../../../Hooks/useGoogleSignIn";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("translation", { keyPrefix: "register" });
  const [isLoading, setIsLoading] = useState(false);
  // const { user, error, loading, signinWithGoogle } = useGoogleSignIn();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: (values: RegisterFormProps) => {
      setIsLoading(true);
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email?.toLowerCase(),
        password: values.password,
      };
      dispatch(registerUser(body)).then((response) => {
        if (response) {
          setTimeout(() => {
            setIsLoading(false);

            toastMessage({
              type: TOAST_MESSAGE_TYPES.SUCCESS,
              content: t("signUpSuccessfull"),
              duration: 3,
            });
            navigate("/login");
          }, LOADING_TIMOUT_DELAY);
        } else {
          setIsLoading(false);
          toastMessage({
            type: TOAST_MESSAGE_TYPES.ERROR,
            content: t("SinUpFailed"),
            duration: 5,
          });
        }
      });
    },
  });
  // const handleGoogleSignIn = async () => {
  //   const user = await signinWithGoogle();
  //   if (user) {
  //     console.log("Google Sign-Up Successful:", user);
  //   } else {
  //     console.log("Google Sign-Up Failed");
  //   }
  // };
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
          overflow: "hidden",
          //  backgroundColor: theme.palette.primary.main
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
            overflowX: "hidden",
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
                height: { xs: "80%", sm: "50%" },
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
                  pb={4}
                  align="center"
                  color={theme.palette.primary.light}
                >
                  {t("signUp")}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      mb={1}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <InputField
                        style={{ marginRight: "5px" }}
                        placeholder={t("firstNamePlaceholder")}
                        value={formik.values.firstName}
                        onChangeText={formik.handleChange("firstName")}
                        error={
                          formik.touched.firstName && formik.errors.firstName
                            ? {
                                isError: true,
                                message: formik.errors.firstName as string,
                              }
                            : undefined
                        }
                        size="large"
                      />
                      <InputField
                        placeholder={t("lastNamePlaceholder")}
                        value={formik.values.lastName}
                        onChangeText={formik.handleChange("lastName")}
                        error={
                          formik.touched.lastName && formik.errors.lastName
                            ? {
                                isError: true,
                                message: formik.errors.lastName as string,
                              }
                            : undefined
                        }
                        size="large"
                      />
                    </Grid>
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
                        {t("signUp")}
                      </AppButton>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <AppButton
                        type="primary"
                        block
                        size="large"
                        bgColor={theme.palette.primary.light}
                        borderColor={theme.palette.primary.main}
                        onClick={handleGoogleSignIn}
                        color="black"
                        loading={isLoading}
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
                    </Grid> */}
                  </Grid>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <Typography variant="body1">
                      {t("accountExists")}{" "}
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

export default Register;
