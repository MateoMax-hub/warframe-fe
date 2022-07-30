import { Modal, Form, Input, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useImg } from "../../hooks/useImg";
import { useParts } from "../../hooks/useParts";
import { messageError } from "../utils/messages";
import style from "./modals.module.scss";


const SellTrashModal = ({ set }) => {
  const { trashModal } = style;
  const { getTrashPrime } = useParts();
  const [trashPrimeData, setTrashPrimeData] = useState([]);

  useEffect(() => {
    setTrashPrimeData(getTrashPrime());
  }, []);

  return (
    <Modal
      visible
      onCancel={() => set(false)}
      title='Trash prime'
      footer={false}
      className={trashModal}
    >
      <div>
        <div>
          <Table dataIndex={trashPrimeData}>
          </Table>
        </div>
        <div>
          
        </div>
      </div>
    </Modal>
  );
};

export default SellTrashModal;
