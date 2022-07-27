import { Button, Modal } from "antd";
import axios from "axios";
import React from "react";
import { messageError } from "./messages";
import style from "./utils.module.scss";

const DeleteModal = ({set, state, title, reqParam, endPoint, getRefresh}) => {
  const { deleteModalFooter } = style;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/${endPoint}/${reqParam}`);
      getRefresh();
      set(false);
    } catch {
      messageError('Error pls try again');
    }
  };

  return (
    <Modal
      visible={state}
      onCancel={() => set(false)}
      title={title}
      footer={false}
    >
      <div className={deleteModalFooter}>
        <Button onClick={() => set(false)} >Cancel</Button>
        <Button onClick={handleDelete} >Confirm</Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
