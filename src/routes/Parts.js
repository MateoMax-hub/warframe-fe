import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import Search from "../components/utils/Search";
import Select from "../components/utils/Select";
import style from "./routes.module.scss";
import PartsTable from "../components/Parts/PartsTable";
import PartsTypesTable from "../components/Parts/PartsTypesTable";

const Parts = () => {
  const { partsContainer, tabContentSpliter } = style;
  const [filter, setFilter] = useState({});
  const [searchFilter, setSearchFilter] = useState({});
  const [tabKeySelected, setTabKeySelected] = useState(1);

  useEffect(() => {
    console.log(filter);
    console.log(searchFilter);
  }, [filter, searchFilter]);

  const options = [
    {
      label: "uno",
      value: "1",
    },
    {
      label: "dos",
      value: "2",
    },
    {
      label: "tres",
      value: "3",
    },
  ];

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
        {/* <Search placeHolder="buscar" width="10rem" setState={setSearchFilter} statePropName="mySearch"/> */}
        {/* <Select 
          options={options}
          placeHolder="Numbers"
          width="15rem"
          setState={setFilter}
          statePropName="myFilter"
        /> */}
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
