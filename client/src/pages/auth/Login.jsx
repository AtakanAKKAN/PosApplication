/* eslint-disable no-sequences */
import React, { useState } from "react";
import { Button, Carousel, Checkbox, Form, Input, message } from "antd";

import { Link, useNavigate } from "react-router-dom";
import CarouselSlides from "../../components/carousel/CarouselSlides";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/auth/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
        setLoading(false);
        return;
      }

      if (res.status === 403) {
        message.error("Şifre yanlış!");
        setLoading(false);
        return;
      }
      const user = await res.json();
      message.success("Giriş işlemi başarılı");
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      localStorage.setItem(
        "secretUserKey",
        JSON.stringify({
          userName: user.userName,
          email: user.email,
        })
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="lg:h-screen max-lg:h-auto px-6 max-lg:pb-20 ">
      <div className="flex justify-between h-full gap-5 relative">
        <div
          id="left"
          className="flex flex-col h-full lg:justify-center max-lg:mt-56 w-full mx-auto"
        >
          <h1 className="text-center text-4xl font-bold ">LOGO</h1>
          <Form
            layout="vertical"
            className="my-2"
            initialValues={{ remember: false }}
            onFinish={onFinish}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                { required: true, message: "E-mail Adı Boş Bırakılamaz" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[{ required: true, message: "Şifre Adı Boş Bırakılamaz" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <div className="w-full flex justify-between items-center">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link className="text-blue-600">Şifremi Unuttum?</Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="sumbit"
                className="w-full"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center gap-1 text-sm">
            Henüz hesap oluşturmadınız mı?{" "}
            <Link to={"/register"} className="text-blue-600">
              Şimdi kayıt olun
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

export default Login;
