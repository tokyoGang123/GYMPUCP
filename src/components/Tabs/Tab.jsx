import React, { useState } from "react";
import "./Tab.scss";
export default function Tab(props) {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-container">
      <div className="tab-list">
        {props.children.map((child) => {
          const label = child.props.label;
          return (
            <button
              className={label === activeTab ? "active" : ""}
              onClick={() => handleTabClick(label)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="tab-content">
        {props.children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
