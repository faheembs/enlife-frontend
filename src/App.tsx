import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes, { CustomRoute } from "./Routes/routes";
import { getToken } from "./Utils/helperFunctions";
import AdminLayout from "./Layouts/AdminLayout";
import "./index.css";

const App = () => {
  // const location = useLocation();
  // console.log(location.state?.from);
  const token = getToken();

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
