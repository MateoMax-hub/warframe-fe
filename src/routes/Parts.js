import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import Search from "../components/utils/Search";
import Select from "../components/utils/Select";
import style from "./routes.module.scss";
import PartsTable from "../components/Parts/PartsTable";
import PartsTypesTable from "../components/Parts/PartsTypesTable";

const Parts = () => {
  const { partsContainer, tabContentSpliter } = style;
  const [tabKeySelected, setTabKeySelected] = useState(1);

  const { TabPane } = Tabs;

  const onChange = (key) => {
    setTabKeySelected(key);
  };

  return (
    <div className={partsContainer}>
      <div>
        {/* blur background container*/}
        <div></div> {/* blur background */}
      </div>
      <div>
        <div>
          <div className="parts-tabContainer">
            <Tabs onChange={onChange} type="card" centered>
              <TabPane tab="Parts" key="1">
                <PartsTable></PartsTable>
              </TabPane>
              <TabPane tab="Parts Types" key="2">
                <PartsTypesTable></PartsTypesTable>
              </TabPane>
            </Tabs>
            <div className={tabContentSpliter}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Parts;
