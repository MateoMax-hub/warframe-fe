import React, { useEffect, useState, useRef } from "react";
import style from "./parts.module.scss";
import { useParts } from "../../hooks/useParts";
import { useImg } from "../../hooks/useImg";
import { Table, Button } from "antd";
import Search from "../utils/Search";
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import AddPartTypeModal from "../modals/AddPartTypeModal";
import DeleteModal from "../utils/DeleteModal";

const PartsTypesTable = () => {
  const { partsTableContainer, openModalButton } = style;
  const { getPartsTypes } = useParts();
  const { getImgs } = useImg();
  const searchRef = useRef(null);
  const [imagesData, setImagesData] = useState([]);
  const [searchFilter, setSearchFilter] = useState({});
  const [partsTypes, setPartsTypes] = useState([]);
  const [partsTypesForTable, setPartsTypesForTable] = useState([]);
  const [showPartsTypesModal, setShowPartsTypesModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    getImages();
    handleGetPartsTypes()
  }, []);

  useEffect(() => {
    if (partsTypes.length !== 0) {
      setPartsTypesForTable(partsTypes)
    }
  }, [partsTypes]);

  useEffect(() => {
    if (searchFilter.mySearch) {
      const regexFilter = new RegExp(searchFilter.mySearch, 'i');
      const partsFiltered = partsTypesForTable.map((part) => {
        const partFiltered = part.partType?.search(regexFilter);
        return partFiltered === -1 ? null : part;
      });
      setPartsTypesForTable(partsFiltered?.filter(obj => obj));
    } else {
      setPartsTypesForTable(partsTypes);
    }
  }, [searchFilter]);

  const resetFilters = () => {
    setSearchFilter({});
    setPartsTypesForTable(partsTypes);
    searchRef.current.value = ''
  };

  const handleGetPartsTypes = async () => {
    setPartsTypes(await getPartsTypes());
  };

  const getImages = async() => {
    setImagesData(await getImgs())
  };

  const handleOpenDeleteModal = (record) => {
    setDeleteModalShow(true);
    setDeleteModalData({
      title: 'Are you sure you want to delete this part type?', 
      reqParam: record._id, 
      endPoint: 'partsTypes'
    });
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "partType",
      width: '8rem',
    },
    {
      title: '',
      width: '10rem',
      render: (record) => {
        const imgFound = imagesData?.find((img) => img?.name === record?.partType);
        return (
        <img style={{maxHeight: '3rem'}} src={imgFound?.html} alt='' />
      )}
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
        <Button className={openModalButton} onClick={() => setShowPartsTypesModal(true)}>
          <b>add</b>
        </Button>
      </div>

      <Table
        dataSource={
          !partsTypesForTable || partsTypesForTable?.length === 0
            ? [{}, {}, {}, {}]
            : partsTypesForTable
        }
        loading={!partsTypesForTable || partsTypesForTable?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: "calc(100vh - 6rem - 170px)" }}
        className="parts_tableContainer"
        style={{width: '40%'}}
      ></Table>

      { showPartsTypesModal && 
        <AddPartTypeModal 
          set={setShowPartsTypesModal} 
          handleGetPartsTypes={handleGetPartsTypes} 
          getImages={getImages}
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
          getRefresh={handleGetPartsTypes}
        />
      }
    </div>
  );
};

export default PartsTypesTable;
