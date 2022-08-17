import { Modal, Form, Input, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useImg } from "../../hooks/useImg";
import { useParts } from "../../hooks/useParts";
import { messageError } from "../utils/messages";
import style from "./modals.module.scss";
import {
  DoubleRightOutlined,
  CheckOutlined,
  DoubleLeftOutlined
} from '@ant-design/icons';


const SellTrashModal = ({ set }) => {
  const { trashModal, trashContainer, cardDisabled, noDisplayCheck } = style;
  const { getTrashPrime } = useParts();
  const { getImgs } = useImg();
  const [trashPrimeData, setTrashPrimeData] = useState([]);
  const [cart, setCart] = useState([]);
  const [imgs, setImgs] = useState([]);

  useEffect(async () => {
    setTrashPrimeData(await getTrashPrime());
    setImgs(await getImgs());
  }, []);

  const handleSale = () => {
    
  };

  const cardBuilder = ({part, inv}) => {
    const handleAddToCart = () => {
      setCart([...cart, part]);
    }
    const handleDeleteFromCart = () => {
      const newCart = cart.filter((partInCart) => partInCart.part !== part.part);
      setCart(newCart);
    }
    const setOnClick = () => {
      if (inv) {
        const disabled = getDisable();
        return disabled === cardDisabled ? () => {} : handleAddToCart
      }
      return handleDeleteFromCart;
    }
    const getDisable = () => {
      const partFoundInCart = cart.find((partInCart) => partInCart.part === part.part);
      if (inv)  return partFoundInCart ? cardDisabled : noDisplayCheck;
    };
    const imgFound = imgs.find((img) => img.name === part.partType);
    return (
      <div onClick={setOnClick()} className={`${getDisable()} ${!inv ? noDisplayCheck : ''}`}>
        <div>
          <div>
            <img src={imgFound?.html} alt=" " />
          </div>
          <div>
            <div>
              {part.name} {part.partType} 
            </div>
            <div>{part.ducats}</div>
          </div>
        </div>
        <div>
          {
            inv ?
              <DoubleRightOutlined />
              :
              <DoubleLeftOutlined />
          }
        </div>
        <div>
          <CheckOutlined />
        </div>
      </div>
    )
  };

  return (
    <Modal
      visible
      onCancel={() => set(false)}
      title='Trash prime'
      className={trashModal}
      width='820px'
      okText='Sell'
      okButtonProps={{onClick: handleSale}}
    >
      <div className={trashContainer}>
        <div>
          {
            trashPrimeData.length !== 0 &&
            trashPrimeData?.map((part) => cardBuilder({part, inv: true}))
          }
        </div>
        <div>
          {
            cart.length !== 0 &&
            cart?.map((part) => cardBuilder({part, inv: false}))
          }
        </div>
      </div>
    </Modal>
  );
};

export default SellTrashModal;
