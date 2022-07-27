import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useItems } from "../../hooks/useItems";
import { useParts } from "../../hooks/useParts";
import { messageError } from "../utils/messages";
import { DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;

const AddItemModal = ({ set, state, handleGetItems }) => {
  const [itemsTypes, setItemsTypes] = useState([]);
  const [partsPrime, setPartsPrime] = useState([]);
  const [partsSelected, setPartsSelected] = useState([]);
  const [partsQuantity, setPartsQuantity] = useState(0);
  const { getItemsTypes, postItem } = useItems();
  const { getParts } = useParts();

  useEffect(() => {
    getItemsAndParts();
  }, []);

  const getItemsAndParts = async () => {
    setItemsTypes(await getItemsTypes());
    setPartsPrime(await getParts());
  };

  const handleSubmit = async (values) => {
    try {
      const partsSelectedWrapped = partsSelected.map((part) => ({part: part._id, quantity: part.quantity || 1}));
      values.parts = partsSelectedWrapped;
      await postItem(values);
      handleGetItems();
      set(false);
    } catch {
      messageError('Error pls try again')
    }
  };

  const getInputsForParts = () => {
    const selects = [];
    for (let i = 0; i < partsQuantity; i++) {
      const partSelected = partsSelected[i] || '';
      selects.push(
        <div style={{display: 'flex', alignItems: 'center'}} key={`${i}${partSelected._id || 0}`}>
          <Select
            onChange={(partId) => handleChangeInParts(partId, i)}
            value={partSelected._id}
            showSearch
            filterOption={(input, option) =>
              (option?.children?.reduce((a, b) => a + b)).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {partsPrime?.map((part) => 
              <Option value={part._id}>{part.name} {part.partType}</Option>
              )}
          </Select>
          <InputNumber 
            style={{width: '4rem'}}
            defaultValue={partSelected.quantity || 1}
            onChange={(e) => handleChangePartQuantity(e, partSelected)}
          />
          <Button onClick={() => handleChangeInParts(false, i)}>
            <DeleteOutlined/>
          </Button>
        </div>
      )
    }
    return selects;
  };

  const handleChangePartQuantity = (e, partToChange) => {
    const partsChanged = partsSelected?.map((part) => {
      if (part._id !== partToChange._id) return part;
      return {
        ...part,
        quantity: e,
      }
    });
    setPartsSelected(partsChanged);
  };

  const handleChangeInParts = (partId, i) => {
    if (partId) {
      const findPart = partsPrime.find((part) => part._id === partId);
      if (partsSelected[i]) {
        const partsMaped = partsSelected.map((part) => {
          if (part._id === partsSelected[i]._id) {
            return findPart;
          }
          return part;
        });
        setPartsSelected(partsMaped);
      } else {
        setPartsSelected([...partsSelected, findPart])
      }
    } else {
      const partToDelete = partsSelected[i];
      const newPartsArray = partsSelected.filter((part) => part._id !== partToDelete._id)
      setPartsSelected(newPartsArray)
      setPartsQuantity(partsQuantity - 1);
    }
  };

  return (
    <Modal
      title="Add item prime"
      footer={false}
      visible={state}
      onCancel={() => set(false)}
    >
      <Form
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Type'
          name='type'
          rules={[
            {
              required: true,
              message: "Name is required",
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
            {itemsTypes.length !== 0 && 
              itemsTypes.map((itemType) => <Option value={itemType._id}>{itemType.itemType}</Option>)
            }
          </Select>
        </Form.Item>
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
          label='Parts'
          name="parts"
        >
          {
            partsQuantity !== 0 &&
              getInputsForParts()
          }
          <Button onClick={() => setPartsQuantity(partsQuantity + 1)}>+</Button>
        </Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
