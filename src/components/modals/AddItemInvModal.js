import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useItems } from "../../hooks/useItems";
import { messageError } from "../utils/messages";
const { Option } = Select;

const AddItemInvModal = ({set, state, refresh}) => {
  const [items, setItems] = useState([]);
  const { getItems, postItemInv } = useItems();

  useEffect(() => {
    handleGetItems();
  }, []);

  const handleGetItems = async () => {
    setItems(await getItems());
  };

  const handleSubmit = async (values) => {
    try {
      values.quantity = parseFloat(values.quantity);
      await postItemInv(values)
      refresh();
      set(false);
    } catch {
      messageError('Error pls try again')
    }
  };

  return (
    <Modal
      visible={state}
      onCancel={() => set(false)}
      footer={false}
      title='Add new item prime to your inventory'
    >
      <Form
        onFinish={handleSubmit}
      >
        <Form.Item
          name='item'
          label='Item'
          rules={[
            {
              required: true,
              message: 'Item is required'
            }
          ]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.children?.reduce((a, b) => a + b)).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              items?.length !== 0 &&
                items.map((item) => 
                  <Option value={item._id}>{item.name} {item.itemType}</Option>
                )
            }
          </Select>
        </Form.Item>
        <Form.Item
          name='quantity'
          label='Quantity'
          rules={[
            {
              required: true,
              message: 'is required'
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

export default AddItemInvModal;
