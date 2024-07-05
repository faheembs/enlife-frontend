import React, { useEffect } from "react";
import { Collapse, Divider } from "antd";
import "./ModuleCollapse.css";
import { useAppDispatch, useAppSelector } from "../../Hooks/reduxHook";
import { getUserData } from "../../Utils/helperFunctions";
import { getModule1Evaluation } from "../../Redux/Modules/modulesAction";

const { Panel } = Collapse;

const ModulesCollapse: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = getUserData();
    dispatch(getModule1Evaluation({ userId: user.id }));
  }, [dispatch]);
  const { module1_evaluation } = useAppSelector((state: any) => state.module);
  // console.log("module1_evaluation", module1_evaluation);
  return (
    <Collapse
      style={{
        width: "100%",
        background: "transparent",
        height: 200,
        flexWrap: "wrap",
      }}
      accordion
      bordered={false}
    >
      {module1_evaluation &&
        module1_evaluation.map((item: any, index: any) => {
          return (
            <Panel
              header={`Core Value ${index + 1}: ${item.coreValue}`}
              key={index}
            >
              <p
                style={{
                  lineHeight: "1.5",
                  maxHeight: "7.5em",
                  overflow: "hidden",
                  position: "relative",
                  overflowY: "auto",
                }}
              >
                {item.explanation}
              </p>
            </Panel>
          );
        })}
    </Collapse>
  );
};

export default ModulesCollapse;
