import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { messageError } from "../utils/messages";
import { useParts } from './../../hooks/useParts'; 
const { Option } = Select;

const AddPartInvModal = ({set, state, refresh}) => {
  const [parts, setParts] = useState([]);
  const { getParts, postPartInv } = useParts();

  useEffect(() => {
    handleGetParts();
  }, []);

  const handleGetParts = async () => {
    setParts(await getParts());
  };

  const handleSubmit = async (values) => {
    try {
      values.quantity = parseFloat(values.quantity);
      await postPartInv(values)
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
      title='Add new prime part to your inventory'
    >
      <Form
        onFinish={handleSubmit}
      >
        <Form.Item
          name='part'
          label='Part'
          rules={[
            {
              required: true,
              message: 'Part is required'
            }
          ]}
        >
          <Select
            showSearch
            filterOption={(input, option) => 
              option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children[0].toLowerCase().localeCompare(optionB.children[0].toLowerCase())
            }
          >
            {
              parts?.length !== 0 &&
                parts.map((part) => 
                  <Option value={part._id}>{part.name} {part.partType}</Option>
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

export default AddPartInvModal;
