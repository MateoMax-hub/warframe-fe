import { Tabs } from "antd";
import React, { useState } from "react";
import ItemsTable from "../components/items/ItemsTable";
import ItemsTypesTable from "../components/items/ItemsTypesTable";
import style from "./routes.module.scss";

const Items = () => {
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
              <TabPane tab="Items" key="1">
                <ItemsTable />
              </TabPane>
              <TabPane tab="Items Types" key="2">
                <ItemsTypesTable />
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

export default Items;
