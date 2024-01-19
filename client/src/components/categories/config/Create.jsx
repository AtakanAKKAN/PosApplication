import { Button, Form, Input, Modal, message } from "antd";
import React from "react";

const Create = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/categories/create-category",
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (response.ok) {
        form.resetFields();
        setCategories([
          ...categories,
          {
            _id: Math.random(),
            title: values.title,
          },
        ]);
        message.success("Kategori Başarıyla eklendi");
      } else {
        message.error("Kategori eklenirken bir hata oluştu");
      }
    } catch (error) {
      message.error("Kategori eklenirken bir hata oluştu: ", error);
    }
  };

  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori ismi"
          rules={[
            { required: true, message: "Kategori Alanı Boş Bırakalımaz" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Create;
