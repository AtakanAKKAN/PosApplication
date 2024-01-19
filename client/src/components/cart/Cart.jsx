import { Button, message } from "antd";
import "./Cart.css";
import { Link } from "react-router-dom";
import { ClearOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  plusCartItem,
  minusCartItem,
  reset,
} from "../../Context/cartSlice";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const deleteCartItem = (item) => {
    if (window.confirm("Ürünü silmek istediğinizden emin misiniz?")) {
      dispatch(deleteCart(item));
    }
  };

  return (
    <div
      id="cart"
      className="h-full max-h-[calc(100vh-_79px)] flex flex-col border-x "
    >
      <h2 className="bg-[#964A00] text-center py-3 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul
        id="cart-items"
        className="px-2 pt-2 flex flex-col gap-y-3 max-h-[calc(100vh_-380px)] overflow-auto pb-2"
      >
        {cart.cartItems.length === 0
          ? "Sepette hiçbir ürün yok. . ."
          : cart.cartItems.map((item) => (
              <li
                id="cart-item"
                className="flex justify-between"
                key={item._id}
              >
                <div id="cart-img" className="flex items-center">
                  <div className="relative group cursor-pointer">
                    <img
                      src={item.productImg}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span
                      onClick={() => {
                        deleteCartItem(item);
                        message.warning("Ürün sepetten çıkartıldı!");
                      }}
                      className="absolute top-0 left-0 w-full h-full bg-black/50 text-2xl text-white justify-center items-center group-hover:flex hidden cursor-pointer transition-all duration-500"
                    >
                      X
                    </span>
                  </div>
                  <div className="flex flex-col ml-2">
                    <b>{item.productName}</b>
                    <span>
                      {item.productPrice}₺ x <small>{item.quantity}</small>{" "}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <Button
                    type="primary"
                    size="small"
                    className="!rounded-full flex justify-center items-center w-6 h-6"
                    onClick={() => dispatch(plusCartItem(item))}
                  >
                    <PlusCircleOutlined />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    type="primary"
                    size="small"
                    className="!rounded-full flex justify-center items-center w-6 h-6"
                    onClick={() => {
                      if (item.quantity === 1) {
                        deleteCartItem(item);
                        message.warning("Ürün sepetten çıkartıldı!");
                      } else {
                        dispatch(minusCartItem(item));
                      }
                    }}
                  >
                    <MinusCircleOutlined />
                  </Button>
                </div>
              </li>
            )).reverse()}
      </ul>
      <div id="cart-totals" className="mt-auto">
        <div className="border-t-2 border-b-2">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV {cart.tax}%</b>
            <span className="text-red-700">
              {cart.total === 0 ? "" : "+"}
              {cart.total > 0 ? ((cart.total * cart.tax) / 100).toFixed(2) : 0}₺
            </span>
          </div>
        </div>

        <div className="border-b-2">
          <div className="flex justify-between p-2">
            <b className="text-lg text-green-600">Genel Toplam</b>
            <span>
              {cart.total > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}{" "}
              ₺
            </span>
          </div>
        </div>

        <div id="button" className="py-2 px-1 flex flex-col gap-1">
          <Link to={"/cart"}>
            <Button
              type="primary"
              className="!bg-cyan-800 w-full"
              size="large"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Link>
          <Button
            type="primary"
            size="large"
            danger
            className="w-full flex justify-center items-center !bg-orange-800"
            disabled={cart.cartItems.length === 0}
            onClick={() => {
              if (
                cart.cartItems.length > 0 &&
                window.confirm("Sepeti boşaltmak istediğinizden emin misiniz?")
              ) {
                dispatch(reset());
                message.success("Sepet temizlendi.");
              }
            }}
          >
            <ClearOutlined />
            <span>Temizle</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
