import {
  SearchOutlined,
  HomeOutlined,
  FileSearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Input, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.css";
import { useState } from "react";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const [iconName, setIconName] = useState("Anasayfa");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
      localStorage.removeItem("secretUserKey");
      message.success("Çıkış yapıldı");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };



  return (
    <div className="border-b-2 mb-6">
      <header className="py-4 px-6 flex justify-between items-center md:gap-8 gap-4">
        <div className="logo">
          <Link to="/">
            <h2 className="text-xl font-bold md:text-4xl smooth-change">
              LOG
            </h2>{" "}
          </Link>
        </div>

        <div
          className="header-search flex-1 max-w-[800px] mx-auto smooth-change"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="rounded-full border-2"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="header-custom-css">
          <Link
            to="/"
            className="menu-link"
            onClick={() => {
              setIconName("Anasayfa");
            }}
          >
            <HomeOutlined
              className={`menu-icon ${
                iconName === "Anasayfa" && "text-[#16f]"
              }`}
            />
            <span className="menu-span">Anasayfa</span>
          </Link>
          <Link
            to="/cart"
            className="md:flex hidden flex-col items-center hover:text-[#409aff] duration-300 group relative"
            onClick={() => {
              setIconName("Sepet");
            }}
          >
            <ShoppingCartOutlined
              className={`menu-icon ${iconName === "Sepet" && "!text-[#16f]"}`}
            />
            <span className="menu-span">Sepet</span>
            <span
              className={`bg-red-500 p-1 opacity-70 text-white flex w-5 h-5 justify-center items-center rounded-full absolute -top-3 -right-2 text-xs group-hover:opacity-100 duration-300 ${
                cart.cartItems.length === 0 ? "hidden" : "flex"
              }`}
            >
              {cart.cartItems.length}
            </span>
          </Link>
          <Link
            to="/bills"
            className="menu-link"
            onClick={() => {
              setIconName("Faturalar");
            }}
          >
            <FileSearchOutlined
              className={`menu-icon ${
                iconName === "Faturalar" && "text-[#16f]"
              }`}
            />
            <span className="menu-span">Faturalar</span>
          </Link>
          <Link
            to="/customers"
            className="menu-link"
            onClick={() => {
              setIconName("Müşteriler");
            }}
          >
            <UserOutlined
              className={`menu-icon ${
                iconName === "Müşteriler" && "text-[#16f]"
              }`}
            />
            <span className="menu-span">Müşteriler</span>
          </Link>
          <Link
            to="/statistic"
            className="menu-link"
            onClick={() => {
              setIconName("Istatistikler");
            }}
          >
            <BarChartOutlined
              className={`menu-icon ${
                iconName === "Istatistikler" && "text-[#16f]"
              }`}
            />
            <span className="menu-span">Istatistikler</span>
          </Link>
          <Link className="menu-link" onClick={logOut}>
            <LoginOutlined className="menu-icon" />
            <span className="menu-span">Çıkış</span>
          </Link>
        </div>

        <Link
          to="/cart"
          className="md:hidden flex flex-col items-center hover:text-[#409aff] duration-300 group relative"
        >
          <ShoppingCartOutlined
            className={`menu-icon ${
              iconName === "Istatistikler" && "text-[#16f]"
            }`}
            onClick={() => {
              setIconName("Istatistikler");
            }}
          />
          <span className="menu-span">Sepet</span>
          <span
            className={`bg-red-500 p-1 opacity-70 text-white flex w-5 h-5 justify-center items-center rounded-full absolute -top-3 -right-2 text-xs group-hover:opacity-100 duration-300 ${
              cart.cartItems.length === 0 ? "hidden" : "flex"
            }`}
          >
            {cart.cartItems.length}
          </span>
        </Link>
      </header>
    </div>
  );
};

export default Header;
