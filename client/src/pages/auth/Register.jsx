import React, { useState } from "react";
import { Button, Carousel, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import CarouselSlides from "../../components/carousel/CarouselSlides";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/auth/create-user", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!res.ok) {
        return (
          message.error("Kullanıcı oluşturulurken bir hata oluştu!"),
          setLoading(false)
        );
      }

      if (res.status === 207) {
        // eslint-disable-next-line no-sequences
        message.error("E-mail hesabı kayıtlı.");
        setLoading(false);
        return;
      }

      if (res.status === 206) {
        // eslint-disable-next-line no-sequences
        message.error("Kullanıcı kayıtlı.");
        setLoading(false);
        return;
      }
      message.success("Kayıt olundu.");
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="lg:h-screen max-lg:h-auto px-6 max-lg:pb-20">
      <div className="flex justify-between h-full gap-5 relative">
        <div
          id="left"
          className="flex flex-col h-full lg:justify-center max-lg:mt-56 w-full mx-auto"
        >
          <h1 className="text-center text-4xl font-bold ">LOGO</h1>
          <Form layout="vertical" className="my-2" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name="userName"
              rules={[
                { required: true, message: "Kullanıcı Adı Boş Bırakılamaz" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "E-mail Adı Boş Bırakılamaz" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name="password"
              rules={[{ required: true, message: "Şifre Adı Boş Bırakılamaz" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre Doğrulama alanı zorunludur",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Girdiğiniz şifreler eşleşmiyor!!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="sumbit"
                className="w-full"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center gap-1 text-sm">
            Bir hesabınız mı var?{" "}
            <Link to={"/login"} className="text-blue-600">
              Şimdi giriş yapınız
            </Link>{" "}
          </div>
        </div>

        <div id="right" className="w-4/6 bg-[#6c63ff] h-full max-lg:hidden">
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-full">
              <Carousel autoplay>
                <CarouselSlides
                  title={"Responsive"}
                  img={"/images/responsive.svg"}
                  content={"Tüm Cihaz Boyutlarıyla Uyumluluk"}
                />
                <CarouselSlides
                  title={"İstatistikler"}
                  img={"/images/statistic.svg"}
                  content={"Geniş Tutulan İstatistikler"}
                />
                <CarouselSlides
                  title={"Müşteri Memnuniyeti"}
                  img={"/images/customer.svg"}
                  content={"Deneyim Sonunda Üründen Memnun Müşteriler"}
                />
                <CarouselSlides
                  title={"Yönetim Paneli"}
                  img={"/images/admin.svg"}
                  content={"Tek Yerden Yönetim"}
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
