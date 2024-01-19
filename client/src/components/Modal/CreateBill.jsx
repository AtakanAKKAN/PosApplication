import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../Context/cartSlice";

const CreateBill = ({ setIsModalOpen, isModalOpen }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/bills/create-bill", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          ...values,
          customerName: values.customerName,
          customerPhoneNumber: values.customerPhoneNumber,
          paymentMode: values.paymentMode,
          cartItems: cart.cartItems,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmonut: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!res.ok) {
        message.error(
          "Fatura oluşturma işlemi sırasında bir hata meydana geldi"
        );
        return;
      }

      message.success("Fatura Başarıyla Oluşturuldu");
      dispatch(reset());
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
      style={{
        top: 50,
      }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          rules={[{ required: true, message: "Müşteri Ismi Giriniz" }]}
          name="customerName"
        >
          <Input placeholder="Müşteri Adı..." />
        </Form.Item>

        <Form.Item
          label="Telefon Numarası"
          rules={[{ required: true, message: "Telefon Numarası Giriniz" }]}
          name="customerPhoneNumber"
        >
          <Input placeholder="Telefon Numarası..." maxLength={11} />
        </Form.Item>

        <Form.Item
          label="Ödeme Yöntemi"
          name="paymentMode"
          rules={[{ required: true, message: "Ödeme Yöntemi Seçiniz" }]}
        >
          <Select placeholder="Nakit">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam {cart.tax}%</span>
              <span className="text-red-600">
                {cart.total === 0 ? "" : "+"}
                {cart.total > 0
                  ? ((cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Genel Toplam</span>
              <span>
                {" "}
                {cart.total > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 bg-[#1677ff] w-full"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Sipariş oluştur
            </Button>
          </Card>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateBill;
