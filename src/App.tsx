import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes, { CustomRoute } from "./Routes/routes";
import { getToken, getUserData } from "./Utils/helperFunctions";
import AdminLayout from "./Layouts/AdminLayout";
import "./index.css";
import { useAppDispatch } from "./Hooks/reduxHook";
import { getMaxModulesByUserID } from "./Redux/Modules/modulesAction";

const App = () => {
  const location = useLocation();
  console.log(location.state?.from);
  const token = getToken();
  const user = getUserData();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMaxModulesByUserID({ userId: user.id }));
    // console.log("app");
  });

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
    </Routes>
  );
};

export default App;
