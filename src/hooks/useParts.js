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
      const { data } = await axios.get('http://localhost:4000/api/parts');
      const dataWrapped = data.data.map((part) => {
        part.partType = part.type?.partType;
        delete part.type;
        part.ducats = part.ducats.toString();
        return part;
      })
      setPartsData(dataWrapped);
      return dataWrapped;
    } catch (error) {
      console.log(error);
    }
  };

  const getPartsTypes = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/partsTypes');
      setPartsTypesData(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPartsInv = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/partsInv');
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
      return dataWrapped;
    } catch (error) {
      console.log(error);
    }
  };

  const getTrashPrime = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/partsInv/trash')
      const dataWrapped = data.data.map((part) => ({
        partType: part.part.type.partType,
        name: part.part.name,
        ducats: part.part.ducats,
        quantity: part.quantity,
        part: part._id,
      }));
      return dataWrapped;
    } catch (error) {
      console.log(error);
    }
  };

  const postPartTypes = async (partType) => {
    try {
      await axios.post('http://localhost:4000/api/partsTypes', partType)
    } catch (error) {
      console.log(error);
    }
  };

  const postPart = async (part) => {
    try {
      await axios.post('http://localhost:4000/api/parts', part)
    } catch (error) {
      console.log(error);
    }
  };

  const postPartInv = async (part) => {
    try {
      await axios.post('http://localhost:4000/api/partsInv', part)
    } catch (error) {
      console.log(error);
    }
  };

  const Sell = async (part) => {

  }

  return ({
    partsData,
    getParts,
    partsTypesData,
    getPartsTypes,
    partsInvData,
    getPartsInv,
    postPartTypes,
    postPart,
    postPartInv,
    getTrashPrime
  });
};

export { useParts };
