import axios from "axios";
import { useState, useEffect } from "react";

const useItems = () => {
  const [itemsInvData, setItemsInvData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [itemsTypesData, setItemsTypesData] = useState([]);

  useEffect(() => {
    getItemsInv();
    getItems();
    getItemsTypes();
  }, []);

  const getItemsInv = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/itemsInv");
      const dataWrapped = data.data.map((item) => {
        const parts = item.item?.parts.map((part) => {
          return {
            quantity: part.quantity,
            partType: part.part?.type?.partType,
            name: part.part?.name,
            ducats: part.part?.ducats,
          };
        });
        item.itemType = item.item?.type?.itemType;
        item.name = item.item?.name;
        item.parts = parts;
        delete item.item;
        delete item.__v;
        return item;
      });
      setItemsInvData(dataWrapped);
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/items");
      const dataWrapped = data.data.map((item) => {
        const parts = item?.parts.map((part) => {
          return {
            quantity: part.quantity,
            partType: part.part?.type?.partType,
            name: part.part?.name,
            ducats: part.part?.ducats,
          };
        });
        item.itemType = item?.type?.itemType;
        item.name = item?.name;
        item.parts = parts;
        delete item.__v;
        delete item.type;
        return item;
      });
      setItemsData(dataWrapped);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemsTypes = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/itemsTypes");
      const dataWrapped = data.data.map((item) => {
        delete item.__v;
        return item;
      });
      setItemsTypesData(dataWrapped);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    itemsInvData,
    getItemsInv,
    itemsData,
    getItems,
    itemsTypesData,
    getItemsTypes
  };
};

export { useItems };
