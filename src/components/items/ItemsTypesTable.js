import React, { useEffect, useState, useRef } from "react";
import style from "./items.module.scss";
import { useItems } from "../../hooks/useItems";
import { Table } from "antd";
import Search from "../utils/Search";
import { UndoOutlined } from "@ant-design/icons";

const ItemsTypesTable = () => {
  const { itemsTableContainer } = style;
  const { itemsTypesData } = useItems();
  const searchRef = useRef(null);
  const [searchFilter, setSearchFilter] = useState({});
  const [itemsTypes, setItemsTypes] = useState([]);

  useEffect(() => {
    if (itemsTypesData.length !== 0) setItemsTypes(itemsTypesData);
  }, [itemsTypesData]);

  useEffect(() => {
    if (searchFilter.mySearch) {
      const regexFilter = new RegExp(searchFilter.mySearch, "i");
      const itemsFiltered = itemsTypes.map((item) => {
        const itemFiltered = item.itemType?.search(regexFilter);
        return itemFiltered === -1 ? null : item;
      });
      setItemsTypes(itemsFiltered?.filter((obj) => obj));
    } else {
      setItemsTypes(itemsTypesData);
    }
  }, [searchFilter]);

  const resetFilters = () => {
    setSearchFilter({});
    setItemsTypes(itemsTypesData);
    searchRef.current.value = "";
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "itemType",
    },
  ];

  return (
    <div className={itemsTableContainer}>
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
          !itemsTypes || itemsTypes?.length === 0
            ? [{}, {}, {}, {}]
            : itemsTypes
        }
        loading={!itemsTypes || itemsTypes?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: "calc(100vh - 6rem - 170px)" }}
        className="parts_tableContainer"
      ></Table>
    </div>
  );
};

export default ItemsTypesTable;
