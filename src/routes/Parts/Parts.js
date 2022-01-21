import React, { useState, useEffect } from "react";
import Search from "../../components/utils/Search";
import Select from "../../components/utils/Select";
import style from "./parts.module.scss";

const Parts = () => {
  const { partsContainer } = style;
  const [filter, setFilter] = useState({});
  const [searchFilter, setSearchFilter] = useState({});

  useEffect(() => {
    console.log(filter);
    console.log(searchFilter);
  }, [filter, searchFilter]);

  const options = [
    {
      label: 'uno',
      value: '1'
    },
    {
      label: 'dos',
      value: '2'
    },
    {
      label: 'tres',
      value: '3'
    }
  ];

  return (
    <div className={partsContainer}>
      <div>
        {/* <Search placeHolder="buscar" width="10rem" setState={setSearchFilter} statePropName="mySearch"/> */}
        {/* <Select 
          options={options}
          placeHolder="Numbers"
          width="15rem"
          setState={setFilter}
          statePropName="myFilter"
        /> */}
        
      </div>
      <div></div>
    </div>
  );
};

export default Parts;
