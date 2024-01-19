import React, { useEffect, useState } from "react";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import Cart from "../components/cart/Cart";
import { Spin, message } from "antd";
import Header from "../components/Header/Header";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [filterProducts, setFilterProducts] = useState();
  const [categoryFilter, setCategoryFilter] = useState("Tümü");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(String(""));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/products/get-all"
        );

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

  useEffect(() => {
    if (categoryFilter === "Tümü") {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((item) => item.productCategory === categoryFilter)
      );
    }
  }, [categoryFilter, setFilterProducts, products]);

  return (
    <React.Fragment>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div
          id="home"
          className="px-[1.5%] flex justify-between gap-6 md:flex-row flex-col"
        >
          <div
            id="categories"
            className="h-auto md:h-[calc(100vh-_103px)]  md:overflow-y-auto min-w-[110px] md:pb-4 overflow-x-auto pr-2"
          >
            <Categories
              categories={categories}
              setCategories={setCategories}
              setCategoryFilter={setCategoryFilter}
              categoryFilter={categoryFilter}
            />
          </div>

          <div
            id="products"
            className="flex-1 max-h-[calc(100vh-_103px)] overflow-auto pb-2"
          >
            <Products
              categories={categories}
              products={products}
              setProducts={setProducts}
              filterProducts={filterProducts}
              search={search}
            />
          </div>

          <div
            id="cart-totals"
            className="min-w-[300px] md:-mr-[10px] md:-mt-[24px]  pb-[40px] md:pb-0"
          >
            <Cart />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute w-full h-full bg-black/10 flex justify-center pt-40"
        />
      )}
    </React.Fragment>
  );
};

export default HomePage;
