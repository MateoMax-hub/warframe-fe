import { Modal, Form, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useImg } from "../../hooks/useImg";
import { useParts } from "../../hooks/useParts";
import { messageError } from "../utils/messages";


const AddPartTypeModal = ({ set, handleGetPartsTypes, getImages }) => {
  const { images, postImgs } = useImg();
  const [ form ] = Form.useForm();
  const { postPartTypes } = useParts();
  const [imgFound, setImgFound] = useState(false);

  const handleSubmit = async (values) => {
    try {
      if (!imgFound) await postImgs({name: values.partType, html: values.html});
      delete values.html;
      await postPartTypes(values);
      handleGetPartsTypes();
      set(false)
      getImages();
    } catch {
      messageError('Error try again');
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'partType') {
      const imageFound = images.find((img) => img.name === e.target.value);
      form.setFieldsValue({html: imageFound.html});
      if (imageFound && !imgFound) setImgFound(true);
      if (!imageFound && imgFound) setImgFound(false);
    }
  };

  return (
    <Modal
      visible
      onCancel={() => set(false)}
      title='Add part type'
      footer={false}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        onChange={handleChange}
      >
        <Form.Item
          label='Part type name'
          name='partType'
          rules={[
            {
              required: true,
              message: 'Part type name is required'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Part type img'
          name='html'
          rules={[
            {
              required: true,
              message: 'Part type img is required'
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

export default AddPartTypeModal;
