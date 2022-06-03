import axios from "axios";
import { useState, useEffect } from "react";

const useParts = () => {
  const [partsData, setPartsData] = useState([]);
  const [partsTypesData, setPartsTypesData] = useState([]);
  const [partsInvData, setpartsInvData] = useState([]);

  useEffect(() => {
    getParts();
    getPartsTypes();
    getPartsInv();
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

  const getPartsInv = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/partsInv");
      const dataWrapped = data.data.map((part) => {
        part.partType = part.part?.type?.partType;
        delete part.part?.type;
        part.ducats = part.part?.ducats.toString();
        part.name = part.part?.name;
        part.quantity = part.quantity.toString();
        delete part.__v;
        delete part.part;
        return part;
      })
      setpartsInvData(dataWrapped);
    } catch (error) {
      console.log(error);
    }
  };

  return ({
    partsData,
    getParts,
    partsTypesData,
    getPartsTypes,
    partsInvData,
    getPartsInv,
  });
};

export { useParts };
