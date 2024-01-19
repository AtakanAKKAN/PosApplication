import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/products/get-all");

        if (!res.ok) {
          // Hata durumunda konsola yazabilirsiniz.
          console.error("Ürünler alınamadı.");
          message.error("Ürünler yüklenemedi lütfen sayfayı yenileyin");
          return;
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/categories/get-all");

        if (!res.ok) {
          // Hata durumunda konsola yazabilirsiniz.
          console.error("Kategoriler alınamadı.");
          return;
        }

        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        // Hata durumunda konsola yazabilirsiniz.
        console.error("Bir hata oluştu:", error);
      }
    };

    getCategories();
  }, []);

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "productImg",
      width: "12%",
      render: (_, record) => {
        return (
          <img
            src={record.productImg}
            alt=""
            className="max-w-full h-14 object-cover"
          />
        );
      },
    },
    {
      title: "Ürün ismi",
      dataIndex: "productName",
    },

    {
      title: "Ürün Fiyatı",
      dataIndex: "productPrice",
    },
    {
      title: "Ürün Kategorisi",
      dataIndex: "productCategory",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "20%",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => {
                form.resetFields();
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Düzenle
            </Button>
            <Button
              type="text"
              onClick={() => deleteProduct(record._id)}
              danger
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  const deleteProduct = async (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL + "/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          mode: "cors",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Ürün başarıyla silindi!");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Ürün silme işlemi sırasında bir hata oluştu.");
        console.log(error);
      }
    }
  };

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/products/update-product", {
        method: "PUT",
        mode: "cors",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ ...values, productId: editingItem._id }),
      });

      if (!res.ok) {
        return message.error(
          "Ürün Güncelleme işlemi sırasında bir hata oluştu!"
        );
      }
      message.success("Ürün Başarıyla Güncellendi.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          } else {
            return item;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 mb-5">
      <h1 className="text-4xl font-bold text-center">Ürünler</h1>
      <Table
        dataSource={products}
        columns={columns}
        scroll={{
          x: 800,
          y: 600,
        }}
        rowKey={"_id"}
      />
      <Modal
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
          <Form.Item
            label="Ürün Ismi"
            name="productName"
            rules={[{ required: true, message: "Ürün ismi boş bırakılamaz" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ürün Fiyatı"
            name="productPrice"
            rules={[{ required: true, message: "Ürün fiyatı boş bırakılamaz" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ürün Görseli"
            name="productImg"
            rules={[
              { required: true, message: "Ürün görseli boş bırakılamaz" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kategori Seçiniz"
            name="productCategory"
            rules={[
              { required: true, message: "Kategori alanı boş bırakılamaz" },
            ]}
          >
            <Select
              showSearch
              placeholder="Kategori Seç"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
