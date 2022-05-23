import axios from 'axios';
import React, { useEffect } from 'react';
import style from './parts.module.scss';

const PartsTable = () => {
  const { partsTableContainer } = style;

  useEffect(() => {
    
  }, []);
  
  const getParts = async () => {
    try {
      const { data } = await axios('')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={partsTableContainer}>PartsTable</div>
  );
};

export default PartsTable;