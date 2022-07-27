import { Modal, Form, Input, Button } from "antd";
import React from "react";
import { useItems } from "../../hooks/useItems";
import { messageError } from "../utils/messages";


const AddItemTypeModal = ({ set, handleGetItemTypes }) => {
  const [ form ] = Form.useForm();
  const { postItemsTypes } = useItems();

  const handleSubmit = async (values) => {
    try {
      await postItemsTypes(values);
      handleGetItemTypes();
      set(false)
    } catch {
      messageError('Error try again');
    }
  };

  return (
    <Modal
      visible
      onCancel={() => set(false)}
      title='Add Item type'
      footer={false}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Item type name'
          name='itemType'
          rules={[
            {
              required: true,
              message: 'Item type name is required'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form>
    </Modal>
  );
};

export default AddItemTypeModal;
