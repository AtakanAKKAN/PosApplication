import { useDispatch } from "react-redux";
import { addProduct } from "../../Context/cartSlice";
import "./Product.css";
import { message } from "antd";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("Ürün sepete eklendi.")
  };

  return (
    <div
      id="product-item"
      className="product-item-css"
      key={item._id}
      onClick={handleClick}
    >
      <div id="product-img">
        <img
          src={item.productImg}
          alt=""
          className="border-b-2 h-28 w-full object-cover rounded-t-lg"
        />
      </div>
      <div id="product-info" className="flex flex-col p-[4%]">
        <span className="font-bold">{item.productName}</span>
        <span>{item.productPrice} ₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
