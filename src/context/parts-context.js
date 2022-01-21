import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const PartsProvider = () => {
    const [partsData, setPartsData] = useState([]);

    useEffect(() => {
        getParts(); 
    }, []);

    const getParts = async () => {
        try {
            const { data } = await axios.get('/parts');
            setPartsData(data);    
        } catch (error) {
            console.log(error);
        }
    };

    return ({
        partsData,
        setPartsData,
        getParts
    });

};
