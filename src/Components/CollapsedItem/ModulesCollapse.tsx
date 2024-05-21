import React from "react";
import { Collapse, Divider } from "antd";

const { Panel } = Collapse;

interface ModuleLabel {
  key: string;
  label: string;
}

interface ModuleLabels {
  [key: string]: ModuleLabel;
}

interface Explanation {
  explanationHeading: string;
  explanationText: string;
}

interface ModuleSummaries {
  [key: string]: Explanation[];
}

interface ModulesCollapseProps {
  labels: ModuleLabels;
  summaries: ModuleSummaries;
}

const ModulesCollapse: React.FC<ModulesCollapseProps> = ({
  labels,
  summaries,
}) => {
  return (
    <Collapse
      style={{
        width: "100%",
        background: "white",
        height: 200,
        flexWrap: "wrap",
      }}
      accordion
      bordered={false}
    >
      {Object.entries(labels).map(([_, { key, label }]) => (
        <Panel header={label} key={key}>
          {summaries[`ModuleSummary${key}`].map((item, index) => (
            <div key={index}>
              <h4>{item.explanationHeading}</h4>
              <p>{item.explanationText}</p>
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  );
};

export default ModulesCollapse;
