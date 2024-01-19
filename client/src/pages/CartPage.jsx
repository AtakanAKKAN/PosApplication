import { Button, Card, Input, Popconfirm, Space, Table, message } from "antd";
import { useRef, useState } from "react";
import CreateBill from "../components/Modal/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, plusCartItem, minusCartItem } from "../Context/cartSlice";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const dispatch = useDispatch();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const deleteCartItem = (item) => {
    if (window.confirm("Ürünü silmek istediğinizden emin misiniz?")) {
      dispatch(deleteCart(item));
    }
  };

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "productImg",
      key: "productImg",
      render: (text) => {
        return (
          <img src={text} alt="" className="max-w-full h-14 object-cover" />
        );
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "productName",
      key: "productName",
      ...getColumnSearchProps('productName'),
    },
    {
      title: "Kategori",
      dataIndex: "productCategory",
      key: "productCategory",
      ...getColumnSearchProps('productCategory'),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "productPrice",
      key: "productPrice",
      render: (_, record) => {
        return <p>{_.toFixed(2)}₺</p>;
      },
      sorter: (a, b) => a.productPrice - b.productPrice,
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => {
        return (
          <div className="flex gap-1">
            <Button
              type="primary"
              size="small"
              className="!rounded-full flex justify-center items-center w-6 h-6"
              onClick={() => dispatch(plusCartItem(record))}
            >
              <PlusCircleOutlined />
            </Button>
            <span>{record.quantity}</span>
            <Button
              type="primary"
              size="small"
              className="!rounded-full flex justify-center items-center w-6 h-6"
              onClick={() => {
                if (record.quantity === 1) {
                  deleteCartItem(record);
                  message.warning("Ürün sepetten çıkartıldı!");
                } else {
                  dispatch(minusCartItem(record));
                }
              }}
            >
              <MinusCircleOutlined />
            </Button>
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "total",
      key: "total",
      render: (text, record) => {
        return <p>{(record.productPrice * record.quantity).toFixed(2)}₺ </p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek istediğinizden emin misiniz?"
            onConfirm={() => dispatch(deleteCart(record))}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="text" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="px-6 mb-5">
      <Table
        dataSource={cart.cartItems}
        columns={columns}
        bordered
        pagination={false}
        scroll={{
          x: 1000,
          y: 600,
        }}
        rowKey="_id"
      />

      <div id="cart-total" className="flex justify-end mt-4">
        <Card className="w-72">
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV Toplam {cart.tax}%</span>
            <span className="text-red-600">
              {cart.total === 0 ? "" : "+"}
              {cart.total > 0 ? ((cart.total * cart.tax) / 100).toFixed(2) : 0}₺
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Genel Toplam</span>
            <span className="text-green-600">
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
            htmlType="button"
          >
            Sipariş oluştur
          </Button>
        </Card>
      </div>

      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default CartPage;
