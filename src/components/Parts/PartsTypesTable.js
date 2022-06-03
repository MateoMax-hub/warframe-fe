import React, { useEffect, useState, useRef } from "react";
import style from "./parts.module.scss";
import { useParts } from "../../hooks/useParts";
import { Table } from "antd";
import Search from "../utils/Search";
import { UndoOutlined } from '@ant-design/icons';

const PartsTypesTable = () => {
  const { partsTableContainer } = style;
  const { partsTypesData } = useParts();
  const searchRef = useRef(null);
  const [searchFilter, setSearchFilter] = useState({});
  const [partsTypes, setPartsTypes] = useState([]);

  useEffect(() => {
    if (partsTypesData.length !== 0) setPartsTypes(partsTypesData);
  }, [partsTypesData]);

  useEffect(() => {
    if (searchFilter.mySearch) {
      const regexFilter = new RegExp(searchFilter.mySearch, 'i');
      const partsFiltered = partsTypes.map((part) => {
        const partFiltered = part.partType?.search(regexFilter);
        return partFiltered === -1 ? null : part;
      });
      setPartsTypes(partsFiltered?.filter(obj => obj));
    } else {
      setPartsTypes(partsTypesData);
    }
  }, [searchFilter]);

  const resetFilters = () => {
    setSearchFilter({});
    setPartsTypes(partsTypesData);
    searchRef.current.value = ''
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "partType",
    },
  ];

  return (
    <div className={partsTableContainer}>
      <div>
        <Search
          searchRef={searchRef}
          placeHolder="buscar"
          width="10rem"
          setState={setSearchFilter}
          statePropName="mySearch"
        />
        <div onClick={resetFilters}>
          <UndoOutlined />
        </div>
      </div>

      <Table
        dataSource={
          !partsTypes || partsTypes?.length === 0
            ? [{}, {}, {}, {}]
            : partsTypes
        }
        loading={!partsTypes || partsTypes?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: "calc(100vh - 6rem - 170px)" }}
        className="parts_tableContainer"
      ></Table>
    </div>
  );
};

export default PartsTypesTable;
