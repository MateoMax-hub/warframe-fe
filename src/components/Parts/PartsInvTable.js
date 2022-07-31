import React, { useEffect, useState, useRef } from 'react';
import Search from "../utils/Search";
import Select from "../utils/Select";
import style from './parts.module.scss';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParts } from '../../hooks/useParts';
import { Button, Table } from 'antd';
import AddPartInvModal from '../modals/AddPartInvModal';
import DeleteModal from '../utils/DeleteModal';

const PartsInvTable = () => {
  const { partsTableContainerWithFilter } = style;
  const searchRef = useRef(null);
  const { getPartsInv } = useParts();
  const [partsInvData, setPartsInvData] = useState([]);
  const [searchFilter, setSearchFilter] = useState({});
  const [filterType, setFilterType] = useState({});
  const [parts, setParts] = useState([]);
  const [addPartShow, setAddPartShow] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    handleGetPartsInv();
  }, []);

  useEffect(() => {
    if (searchFilter.mySearch && filterType.myFilter) {
      const regexFilter = new RegExp(searchFilter.mySearch, 'i');
      const partsFiltered = partsInvData.map((part) => {
        const partFiltered = part[filterType.myFilter]?.search(regexFilter);
        return partFiltered === -1 ? null : part;
      });
      setParts(partsFiltered?.filter(obj => obj));
    }
  }, [searchFilter, filterType]);

  useEffect(() => {
    if (partsInvData.length !== 0) setParts(partsInvData);
  }, [partsInvData]);

  const resetFilters = () => {
    setFilterType({});
    setSearchFilter({});
    setParts(partsInvData);
    searchRef.current.value = ''
  };

  const handleGetPartsInv = async () => {
    setPartsInvData(await getPartsInv())
  };

  const handleOpenDeleteModal = (record) => {
    setDeleteModalShow(true);
    setDeleteModalData({
      title: 'Are you sure you want to delete this part?', 
      reqParam: record._id, 
      endPoint: 'partsInv/all'
    });
  };

  const options = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Ducats",
      value: "ducats",
    },
    {
      label: "Type",
      value: "partType",
    },
    {
      label: "Quantity",
      value: "quantity"
    }
  ];

  const columns = [
    {
      title: 'Type',
      dataIndex: 'partType',
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Ducats',
      dataIndex: 'ducats'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
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
    <div className={partsTableContainerWithFilter}>
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
        <Button onClick={() => setAddPartShow(true)}>
          <b>add</b>
        </Button>
      </div>

      <Table
        dataSource={!parts || parts?.length === 0 ? [{}, {}, {}, {}] : parts}
        loading={!parts || parts?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: "calc(100vh - 6rem - 170px)" }}
        className="parts_tableContainer"
      ></Table>

      {
        addPartShow &&
          <AddPartInvModal set={setAddPartShow} state={addPartShow} refresh={handleGetPartsInv}/>
      }
      {
        deleteModalShow && 
        <DeleteModal
          set={setDeleteModalShow}
          state={deleteModalShow}
          title={deleteModalData.title}
          reqParam={deleteModalData.reqParam}
          endPoint={deleteModalData.endPoint}
          getRefresh={handleGetPartsInv}
        />
      }
    </div>
  );
};

export default PartsInvTable;
