import axios from "axios";
import { useState, useEffect } from "react";

const useParts = () => {
  const [partsData, setPartsData] = useState([]);
  const [partsTypesData, setPartsTypesData] = useState([]);

  useEffect(() => {
    getParts();
    getPartsTypes();
  }, []);

  const getParts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/parts");
      const dataWrapped = data.data.map((part) => {
        part.partType = part.type?.partType;
        delete part.type;
        part.ducats = part.ducats.toString();
        return part;
      })
      setPartsData(dataWrapped);
    } catch (error) {
      console.log(error);
    }
  };

  const getPartsTypes = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/partsTypes");
      setPartsTypesData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return ({
    partsData,
    getParts,
    partsTypesData,
    getPartsTypes,
  });
};

export { useParts };
