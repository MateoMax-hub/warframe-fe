import React, { useEffect, useState } from 'react';
import style from './parts.module.scss';
import { useParts } from '../../hooks/useParts';
import { Table } from 'antd';

const PartsTypesTable = () => {
  const { partsTableContainer } = style;
  const { partsTypesData, getPartsTypes } = useParts();

  useEffect(() => {
    console.log(partsTypesData);
  }, [partsTypesData]);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'partType',
    },
  ];
  
  return (
    <div className={partsTableContainer}>
      <Table
        dataSource={partsTypesData || []}
        loading={!partsTypesData || partsTypesData?.length === 0}
        columns={columns}
        pagination={false}
        scroll={{ y: 'calc(100vh - 6rem - 97px)' }}
      >
      </Table>
    </div>
  );
}

export default PartsTypesTable