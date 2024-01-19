import { Button, Input, Space, Spin, Table, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import PrintBills from "../components/bills/PrintBills";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bill, setBill] = useState();
  const [printBill, setPrintBill] = useState({});

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1677ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  

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

  const colorMap = {
    Muz: "#c7bc43",
    Üzüm: "purple",
    "Yer Fıstığı": "#d8b887",
    "Cool Lime": "lime",
    Ananas: "#a6a911",
    Kurabiye: "#84563c",
    default: "geekblue",
  };



  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Müşteri Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      ...getColumnSearchProps("customerPhoneNumber"),
      width: "15%",
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        return <p>{new Date(text).toLocaleString()}</p>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
      ...getColumnSearchProps("paymentMode"),
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmonut",
      key: "totalAmonut",
      render: (text, record) => {
        return <p>{Number(text).toFixed(2)}₺ </p>;
      },
      sorter: (a, b) => a.totalAmonut - b.totalAmonut,
    },
    {
      title: "Satın Alınan Ürünler",
      dataIndex: "cartItems",
      width: "27%",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {text.map((item) => (
              <Tag
                color={
                  item.productTagColor
                    ? "#" + item.productTagColor
                    : colorMap[item.productName] || colorMap.default
                }
                className="text-base"
                key={item._id}
              >
                {item.productName} x {item.quantity}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <Button
            type="link"
            onClick={() => {
              setPrintBill(record);
              setIsModalOpen(true);
            }}
          >
            Yazdır
          </Button>
        );
      },
    },
  ];

  return (
    <div className="px-6 mb-5">
      {bill ? (
        <>
          <h1 className="text-5xl text-center font-bold my-2">Faturalar</h1>
          <Table
            dataSource={bill}
            columns={columns}
            bordered
            pagination={false}
            scroll={{
              x: 1200,
              y: 600,
            }}
            rowKey="_id"
          />{" "}
        </>
      ) : (
        <Spin
          size="large"
          className="absolute w-full h-full bg-black/10 flex justify-center pt-40"
        />
      )}
      <PrintBills
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        printBill={printBill}
      />
    </div>
  );
};

export default BillPage;
