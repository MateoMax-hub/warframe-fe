import { Tabs } from "antd";
import React, { useState } from "react";
import ItemsInvTable from "../components/items/ItemsInvTable";
import PartsInvTable from "../components/Parts/PartsInvTable";
import style from "./routes.module.scss";

const Inventory = () => {
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
                <PartsInvTable />
              </TabPane>
              <TabPane tab="Items" key="2">
                <ItemsInvTable />
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

export default Inventory;
