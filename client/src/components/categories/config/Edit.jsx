import { Button, Form, Input, Modal, Table, message } from "antd";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryId: editingRow._id }),
          mode: "cors",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (response.ok) {
        // Fetch işlemi başarılıysa
        message.success("Kategori ismi başarıyla değiştirildi");
        setCategories(
          categories.map((item) => {
            if (item._id === editingRow._id) {
              return { ...item, title: values.title };
            } else {
              return item;
            }
          })
        );
      } else {
        // Fetch işlemi başarısızsa
        message.error("Kategori ismi değiştirilirken bir hata oluştu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL + "/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          mode: "cors",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi!");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Kategori silme işlemi sırasında bir hata oluştu.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Kategori isimleri",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditingRow(record)}>
              Düzenle
            </Button>
            <Button type="text" htmlType="submit">
              Kaydet
            </Button>
            <Button
              type="text"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title="Kategori işlemleri"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey="_id"
        />
      </Form>
    </Modal>
  );
};

export default Edit;
