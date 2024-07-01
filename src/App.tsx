import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import routes, { CustomRoute } from "./Routes/routes";
import { getToken, getUserData } from "./Utils/helperFunctions";
import AdminLayout from "./Layouts/AdminLayout";
import "./index.css";
import { useAppDispatch } from "./Hooks/reduxHook";
import { getMaxModulesByUserID } from "./Redux/Modules/modulesAction";
import { Result } from "antd";
import AppButton from "./Components/Button/AppButton";

const App = () => {
  const location = useLocation();
  console.log(location.state?.from);
  const token = getToken();
  const user = getUserData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMaxModulesByUserID({ userId: user.id }));
  }, [dispatch, user.id]);

  return (
    <Routes>
      {routes.map((route: CustomRoute, index: number) =>
        route.isPrivate ? (
          <Route
            key={route.path}
            path={route.path}
            element={
              token ? (
                <AdminLayout screenName={route.name}>
                  <route.element />
                </AdminLayout>
              ) : (
                <Navigate to="login" />
              )
            }
          />
        ) : (
          <Route
            key={route.path}
            path={route.path}
            element={token ? <Navigate to="/" /> : <route.element />}
          />
        )
      )}
      <Route
        path="*"
        element={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Result
              className="custom-result"
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              style={{ color: "white" }}
              extra={
                <AppButton
                  text="Back to Home"
                  bgColor="white"
                  onClick={() => navigate("/")}
                  textStyle={{ color: "black" }}
                />
              }
            />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
