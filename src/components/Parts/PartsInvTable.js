import React, { useEffect, useState, useRef } from 'react';
import Search from "../utils/Search";
import Select from "../utils/Select";
import style from './parts.module.scss';
import { UndoOutlined } from '@ant-design/icons';
import { useParts } from '../../hooks/useParts';
import { Table } from 'antd';

const PartsInvTable = () => {
  const { partsTableContainer } = style;
  const searchRef = useRef(null);
  const { partsInvData } = useParts();
  const [searchFilter, setSearchFilter] = useState({});
  const [filterType, setFilterType] = useState({});
  const [parts, setParts] = useState([]);


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
    console.log(partsInvData);
  }, [partsInvData]);

  const resetFilters = () => {
    setFilterType({});
    setSearchFilter({});
    setParts(partsInvData);
    searchRef.current.value = ''
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
      </div>

      <Table
        dataSource={!parts || parts?.length === 0 ? [{}, {}, {}, {}] : parts}
        loading={!parts || parts?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: "calc(100vh - 6rem - 170px)" }}
        className="parts_tableContainer"
      ></Table>
    </div>
  );
};

export default PartsInvTable;
