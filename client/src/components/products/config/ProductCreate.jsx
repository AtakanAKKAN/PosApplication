import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  message,
  Input,
  InputNumber,
  Select,
  ColorPicker,
  Space,
} from "antd";

const ProductCreate = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  setProducts,
  categories,
}) => {
  const [form] = Form.useForm();
  const [colorHex, setColorHex] = useState("#1677ff");
  const [formatHex, setFormatHex] = useState("hex");
  const hexString = React.useMemo(
    () => (typeof colorHex === "string" ? colorHex : colorHex?.toHexString()),
    [colorHex]
  );

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/products/create-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
        mode: "cors",
      });

      if (!res.ok) {
        return console.log("Ürün eklenirken bir hata meydana geldi");
      }

      const newProduct = {
        _id: Math.random(),
        productName: values.productName,
        productPrice: Number(values.productPrice),
        productImg: values.productImg, // Resmin URL'si
        productCategory: values.productCategory,
        productTagColor: values.productTagColor,
      };

      setProducts([...products, newProduct]);
      message.success("Ürün Başarıyla Eklendi");
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="productName"
          rules={[{ required: true, message: "Ürün Ismi boş bırakılamaz" }]}
        >
          <Input placeholder="Ürün Ismi Giriniz" />
        </Form.Item>

        <Form.Item
          label="Ürün Görseli"
          name="productImg"
          rules={[{ required: true, message: "Ürün Görseli boş bırakılamaz" }]}
        >
          <Input placeholder="Ürün Görseli URL Giriniz" />
        </Form.Item>

        <Form.Item
          label="Ürün Fiyatı"
          name="productPrice"
          rules={[{ required: true, message: "Ürün Fiyatı boş bırakılamaz" }]}
        >
          <InputNumber className="w-full" placeholder="Ürün Fiyatı Giriniz" />
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

        <Form.Item
          label="Etiket Rengi"
          name="productTagColor"
        >
          <Space>
            <ColorPicker
              format={formatHex}
              value={colorHex}
              onChange={setColorHex}
              onFormatChange={setFormatHex}
            />
            <span>HEX: {hexString}</span>
          </Space>
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductCreate;
