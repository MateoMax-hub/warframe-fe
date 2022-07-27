import axios from "axios";
import { useState, useEffect } from "react";

const useImg = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImgs();
  }, []);

  const getImgs = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/images');
      setImages(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const postImgs = async (imgData) => {
    await axios.post('http://localhost:4000/api/images', imgData)
  }

  return {
    images,
    getImgs,
    postImgs
  };
};

export { useImg };
