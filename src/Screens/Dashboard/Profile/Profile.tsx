/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from "react";
import { Spin } from "antd";

const Profile: React.FC = () => {
  return (
    <Suspense
      fallback={
        false && (
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
        )
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <h1>Profile</h1>
      </div>
    </Suspense>
  );
};

export default Profile;
