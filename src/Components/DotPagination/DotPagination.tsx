import React from "react";

export interface DotPaginationProps {
  pageIndex: number;
  dataLength: number;
}

const DotPagination: React.FC<DotPaginationProps> = ({
  pageIndex,
  dataLength,
}) => {
  return (
    <>
      {dataLength > 1 && (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: 50 * dataLength,
              alignItems: "center",
              justifyContent: "space-evenly",
              display: "flex",
              height: 44,
              backgroundColor: "#ffffff90",
              borderRadius: 40,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {Array.from({ length: dataLength }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: i === pageIndex ? "#c7c7c7" : "#ffffff",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DotPagination;
