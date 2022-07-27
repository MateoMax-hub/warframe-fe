import React, { useEffect, useState, useRef } from "react";
import style from "./items.module.scss";
import { useItems } from "../../hooks/useItems";
import { Button, Table } from "antd";
import Search from "../utils/Search";
import { UndoOutlined, DeleteOutlined } from "@ant-design/icons";
import AddItemTypeModal from "../modals/AddItemTypeModal";
import DeleteModal from "../utils/DeleteModal";

const ItemsTypesTable = () => {
  const { itemsTableContainer } = style;
  const { getItemsTypes } = useItems();
  const searchRef = useRef(null);
  const [searchFilter, setSearchFilter] = useState({});
  const [itemsTypesForTable, setItemsTypesForTable] = useState([]);
  const [addItemTypeModalShow, setAddItemTypeModalShow] = useState(false);
  const [itemsTypes, setItemsTypes] = useState([]);
  const [deleteModalData, setDeleteModalData] = useState({});
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    handleGetItemTypes();
  }, []);
  

  useEffect(() => {
    if (itemsTypes.length !== 0) setItemsTypesForTable(itemsTypes);
  }, [itemsTypes]);

  useEffect(() => {
    if (searchFilter.mySearch) {
      const regexFilter = new RegExp(searchFilter.mySearch, "i");
      const itemsFiltered = itemsTypesForTable.map((item) => {
        const itemFiltered = item.itemType?.search(regexFilter);
        return itemFiltered === -1 ? null : item;
      });
      setItemsTypesForTable(itemsFiltered?.filter((obj) => obj));
    } else {
      setItemsTypesForTable(itemsTypes);
    }
  }, [searchFilter]);

  const handleGetItemTypes = async () => {
    setItemsTypes(await getItemsTypes());
  };

  const resetFilters = () => {
    setSearchFilter({});
    setItemsTypesForTable(itemsTypes);
    searchRef.current.value = "";
  };

  const handleOpenDeleteModal = (record) => {
    setDeleteModalShow(true);
    setDeleteModalData({
      title: 'Are you sure you want to delete this item type?', 
      reqParam: record._id, 
      endPoint: 'itemsTypes'
    });
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "itemType",
    },
    {
      title: '',
      width: '3rem',
      render: (record) => (
        <DeleteOutlined onClick={() => handleOpenDeleteModal(record)}/>
      )
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
        <Button onClick={() => setAddItemTypeModalShow(true)}>
          <b>add</b>
        </Button>
      </div>

      <Table
        dataSource={
          !itemsTypesForTable || itemsTypesForTable?.length === 0
            ? [{}, {}, {}, {}]
            : itemsTypesForTable
        }
        loading={!itemsTypesForTable || itemsTypesForTable?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: "calc(100vh - 6rem - 170px)" }}
        className="parts_tableContainer"
        style={{width: '40%'}}
      ></Table>

      {addItemTypeModalShow && 
        <AddItemTypeModal 
          set={setAddItemTypeModalShow}
          handleGetItemTypes={handleGetItemTypes}
        />
      }
      {
        deleteModalShow && 
        <DeleteModal 
          set={setDeleteModalShow}
          state={deleteModalShow}
          title={deleteModalData.title}
          reqParam={deleteModalData.reqParam}
          endPoint={deleteModalData.endPoint}
          getRefresh={handleGetItemTypes}
        />
      }
    </div>
  );
};

export default ItemsTypesTable;
