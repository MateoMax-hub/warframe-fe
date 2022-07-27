import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParts } from "../../hooks/useParts";
import { messageError } from "../utils/messages";
const { Option } = Select;

const AddPartModal = ({ set, state, handleGetParts }) => {
  const [partsTypes, setPartsTypes] = useState([]);
  const { getPartsTypes, postPart } = useParts();

  useEffect(() => {
    handleGetPartsTypes();
  }, []);

  const handleGetPartsTypes = async () => {
    setPartsTypes(await getPartsTypes());
  };

  const handleSubmit = async (values) => {
    try {
      await postPart(values);
      handleGetParts();
      set(false);
    } catch {
      messageError('Error pls try again')
    }
  };

  return (
    <Modal
      title="Add prime part"
      footer={false}
      visible={state}
      onCancel={() => set(false)}
    >
      <Form
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Name'
          name="name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Ducats'
          name="ducats"
          rules={[
            {
              required: true,
              message: "Ducats is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Type'
          name="type"
          rules={[
            {
              required: true,
              message: "is required",
            },
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
            {partsTypes.length !== 0 &&
              partsTypes.map((partType) => (
                <Option value={partType._id}>{partType.partType}</Option>
              ))}
          </Select>
        </Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form>
    </Modal>
  );
};

export default AddPartModal;
