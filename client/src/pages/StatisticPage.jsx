import { useEffect, useState } from "react";
import StatisticCard from "../components/statistics/StatisticCard";
import { message } from "antd";

const StatisticPage = () => {
  const [bill, setBill] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getBill = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/bills/get-all");
        if (!res.ok) {
          // Hata durumunda konsola yazabilirsiniz.
          console.error("Faturalar alınamadı.");
          return;
        }
        const data = await res.json();
        setBill(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBill();
  }, []);

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

  const totalAmount = () => {
    const amount = bill.reduce((total, item) => item.totalAmonut + total, 0);
    return amount.toFixed(2);
  };

  return (
    <div className="px-6 mb-5">
      <h1 className="text-4xl text-center font-bold mb-4">İstatistiklerim</h1>
      <div id="statistic-section">
        <h2 className="text-lg">
          Hoş geldin{" "}
          <span className="text-green-700 font-bold text-xl">
            {JSON.parse(localStorage.getItem("secretUserKey")).userName}
          </span>
        </h2>
        <div
          id="statistic-cards"
          className="grid xl:grid-cols-4 md:grid-cols-2 my-8 md:gap-10 gap-4"
        >
          <StatisticCard
            title={"Toplam Müşteri"}
            amount={bill.length}
            img={"images/user.png"}
          />
          <StatisticCard
            title={"Toplam Kazanç"}
            amount={totalAmount() + " ₺"}
            img={"images/money.png"}
          />
          <StatisticCard
            title={"Toplam Satış"}
            amount={bill.length}
            img={"images/sale.png"}
          />
          <StatisticCard
            title={"Toplam Ürün"}
            amount={products.length}
            img={"images/product.png"}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default StatisticPage;
