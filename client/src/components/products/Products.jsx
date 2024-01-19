import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ProductCreate from "./config/ProductCreate";
import "./Product.css";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const Products = ({
  categories,
  products,
  setProducts,
  filterProducts,
  search,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div id="product wrapper" className="grid gap-4 grid-custom-css">
      {filterProducts
        .filter((product) => product.productName.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}

      <div
        id="product-item"
        className="product-item-css flex justify-center items-center text-white !bg-cyan-800 hover:opacity-90 min-h-[130px]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-2xl" />
      </div>

      <ProductCreate
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />

      <Link
        id="product-item"
        className="product-item-css flex justify-center items-center text-white !bg-orange-800 hover:opacity-90 min-h-[130px]"
        to={"/products"}
      >
        <EditOutlined className="text-2xl" />
      </Link>
    </div>
  );
};

export default Products;
