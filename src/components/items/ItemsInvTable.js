import React, { useEffect, useState, useRef } from "react";
import Search from "../utils/Search";
import Select from "../utils/Select";
import style from "./items.module.scss";
import { UndoOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import { useItems } from "../../hooks/useItems";
import AddItemInvModal from "../modals/AddItemInvModal";
import DeleteModal from "../utils/DeleteModal";

const ItemsInvTable = () => {
  const { itemsTableContainerWithFilter, viewPartsButton } = style;
  const searchRef = useRef(null);
  const { getItemsInv } = useItems();
  const [itemsInvData, setItemsInvData] = useState([]);
  const [searchFilter, setSearchFilter] = useState({});
  const [filterType, setFilterType] = useState({});
  const [itemsData, setItemsData] = useState([]);
  const [partsModal, setPartsModal] = useState({status: false, parts: []});
  const [addItemInvModalShow, setAddItemInvModalShow] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    handleGetItemsInv();
  }, []);
  

  useEffect(() => {
    if (searchFilter.mySearch && filterType.myFilter) {
      const regexFilter = new RegExp(searchFilter.mySearch, "i");
      const itemsFiltered = itemsInvData.map((item) => {
        const itemFiltered = item[filterType.myFilter]?.search(regexFilter);
        return itemFiltered === -1 ? null : item;
      });
      setItemsData(itemsFiltered?.filter((obj) => obj));
    }
  }, [searchFilter, filterType]);

  useEffect(() => {
    setItemsData(itemsInvData);
  }, [itemsInvData]);

  const resetFilters = () => {
    setFilterType({});
    setSearchFilter({});
    setItemsData(itemsInvData);
    searchRef.current.value = "";
  };

  const handlePartsModalShow = (record) => {
    setPartsModal({status: !partsModal.status, parts: partsModal.status ? [] : record.parts})
  };

  const handleGetItemsInv = async () => {
    setItemsInvData(await getItemsInv());
  };

  const handleOpenDeleteModal = (record) => {
    setDeleteModalShow(true);
    setDeleteModalData({
      title: 'Are you sure you want to delete this item?', 
      reqParam: record._id, 
      endPoint: 'itemsInv'
    });
  };

  const options = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Type",
      value: "itemType",
    },
    {
      label: "Quantity",
      value: "quantity",
    },
  ];

  const columns = [
    {
      title: "Type",
      dataIndex: "itemType",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Parts",
      render: (record) => 
      <>
        <Button className={viewPartsButton} onClick={() => handlePartsModalShow(record)}>
          <EyeOutlined />
        </Button>
      </>
    },
    {
      title: '',
      width: '3rem',
      render: (record) => (
        <DeleteOutlined onClick={() => handleOpenDeleteModal(record)}/>
      )
    },
  ];

  const partsColumns = [
    {
      title: "Type",
      dataIndex: "partType"
    },
    {
      title: "Ducats",
      dataIndex: "ducats"
    },
    {
      title: "Quantity",
      dataIndex: "quantity"
    }
  ];

  return (
    <div className={itemsTableContainerWithFilter}>
      <div>
        <Search
          searchRef={searchRef}
          placeHolder="buscar"
          width="10rem"
          setState={setSearchFilter}
          statePropName="mySearch"
        />
        <Select
          options={options}
          placeHolder="Filter"
          width="6.5rem"
          setState={setFilterType}
          state={filterType}
          statePropName="myFilter"
        />
        <div onClick={resetFilters}>
          <UndoOutlined />
        </div>
        <Button onClick={() => setAddItemInvModalShow(true)}>
          <b>add</b>
        </Button>
      </div>

      <Table
        dataSource={!itemsData || itemsData?.length === 0 ? [{}, {}, {}, {}] : itemsData}
        loading={!itemsData || itemsData?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: "calc(100vh - 6rem - 170px)" }}
        className="parts_tableContainer"
      ></Table>
      {partsModal.status && 
        <Modal
          visible={partsModal.status}
          footer={false}
          onCancel={handlePartsModalShow}
        >
          <Table
            dataSource={partsModal.parts}
            columns={partsColumns}
            pagination={false}
            className="parts_tableContainer modalTableContainer"
          ></Table>
        </Modal>
      }
      {
        addItemInvModalShow && 
          <AddItemInvModal 
            state={addItemInvModalShow}
            set={setAddItemInvModalShow}
            refresh={handleGetItemsInv}
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
          getRefresh={handleGetItemsInv}
        />
      }
    </div>
  );
};

export default ItemsInvTable;
