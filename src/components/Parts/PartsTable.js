import React, { useEffect, useState, useRef } from 'react';
import style from './parts.module.scss';
import { useParts } from '../../hooks/useParts';
import { Table, Button } from 'antd';
import Search from '../utils/Search';
import Select from '../utils/Select';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import AddPartModal from '../modals/AddPartModal';
import DeleteModal from '../utils/DeleteModal';

const PartsTable = () => {
  const { partsTableContainerWithFilter } = style;
  const [searchFilter, setSearchFilter] = useState({});
  const [filterType, setFilterType] = useState({});
  const [parts, setParts] = useState([]);
  const [addPartModalShow, setAddPartModalShow] = useState(false);
  const [partsData, setPartsData] = useState([]);
  const [deleteModalData, setDeleteModalData] = useState({});
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { getParts } = useParts();
  const searchRef = useRef(null);
  // const { images } = useImg();

  useEffect(() => {
    if (searchFilter.mySearch && filterType.myFilter) {
      const regexFilter = new RegExp(searchFilter.mySearch, 'i');
      const partsFiltered = partsData.map((part) => {
        const partFiltered = part[filterType.myFilter]?.search(regexFilter);
        return partFiltered === -1 ? null : part;
      });
      setParts(partsFiltered?.filter(obj => obj));
    }
  }, [searchFilter, filterType]); // eslint-disable-line

  useEffect(() => {
    if (partsData?.length !== 0) setParts(partsData);
  }, [partsData]);

  useEffect(() => {
    handleGetParts();
  }, []); // eslint-disable-line

  const handleGetParts = async () => {
    setPartsData(await getParts());
  };

  const handleOpenDeleteModal = (record) => {
    setDeleteModalShow(true);
    setDeleteModalData({
      title: 'Are you sure you want to delete this part?', 
      reqParam: record._id, 
      endPoint: 'parts'
    });
  };

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
    // {
    //   title: '',
    //   width: '10rem',
    //   render: (record) => {
    //     const imgFound = images?.find((img) => img?.name === record?.partType);
    //     return (
    //     <img style={{maxHeight: '3rem'}} src={imgFound?.html} alt='' />
    //   )}
    // },
    {
      title: '',
      width: '3rem',
      render: (record) => (
        <DeleteOutlined onClick={() => handleOpenDeleteModal(record)}/>
      )
    },
  ];

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
  ];

  const resetFilters = () => {
    setFilterType({});
    setSearchFilter({});
    setParts(partsData);
    searchRef.current.value = ''
  };

  return (
    <div className={partsTableContainerWithFilter}>
      <div>
        <Search searchRef={searchRef} placeHolder="buscar" width="10rem" setState={setSearchFilter} statePropName="mySearch"/>
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
        <Button onClick={() => setAddPartModalShow(true)}>
          <b>add</b>
        </Button>
      </div>

      <Table
        dataSource={(!parts || parts?.length === 0) ? [{},{},{},{}] : parts}
        loading={!parts || parts?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: 'calc(100vh - 6rem - 170px)' }}
        className='parts_tableContainer'
      >
      </Table>

      {
        addPartModalShow &&
          <AddPartModal 
            set={setAddPartModalShow}
            state={addPartModalShow}
            handleGetParts={handleGetParts}
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
          getRefresh={handleGetParts}
        />
      }
    </div>
  );
};

export default PartsTable;