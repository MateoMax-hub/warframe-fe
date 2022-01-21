import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./header.module.scss";
import { Modal } from 'antd';

const Header = () => {
  let navigate = useNavigate();
  const { header, noteForm } = style;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmReload, setConfirmReload] = useState(false);
  const [formData, setFormData] = useState(localStorage.getItem('note') || '');

  const handleModal = (set, state) => set(!state)

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('note', formData);
    setIsModalVisible(false);
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const handleReload = () => {
    setFormData(localStorage.getItem('note') || '');
    handleModal(setConfirmReload, confirmReload);
  }

  return (
    <div className={header}>
      <div>
        <button onClick={() => navigate("/parts", { replace: true })}>
          <i>Parts</i>
        </button>
        <button onClick={() => navigate("/inventory", { replace: true })}>
          <i>inventory</i>
        </button>
        <button onClick={() => navigate("/items", { replace: true })}>
          <i>items</i>
        </button>
      </div>
      <button onClick={() => handleModal(setIsModalVisible, isModalVisible)}><i>Fast note</i></button>


      <Modal title="Fast note" visible={isModalVisible} footer={false} onCancel={() => handleModal(setIsModalVisible, isModalVisible)}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={noteForm}>
            <textarea value={formData} onChange={(e) => handleChange(e)} name="input" id="" cols="50" rows="5"></textarea>
            <div>
              <button type="button" onClick={() => handleModal(setConfirmReload, confirmReload)}><b>Reload</b></button>
              <button type="submit"><b>Save</b></button>
            </div>
          </div>
        </form>
      </Modal>
      <Modal title="Are you sure?" visible={confirmReload} footer={false} onCancel={() => handleModal(setConfirmReload, confirmReload)}>
        <div className={noteForm}>
          <div>
            <button type="button" onClick={() => handleModal(setConfirmReload, confirmReload)}><b>Cancel</b></button>
            <button type="button" onClick={handleReload}><b>yes</b></button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
