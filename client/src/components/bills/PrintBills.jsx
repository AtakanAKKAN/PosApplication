import { Button, Modal } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";

const PrintBills = ({ setIsModalOpen, isModalOpen, printBill }) => {
  // eslint-disable-next-line no-unused-vars

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const cart = useSelector((state) => state.cart);

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
      style={{
        top: 50,
      }}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div id="Bill-Logo">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>

            <div id="bill-details" className="p-5">
              <div className="flex justify-between flex-wrap gap-5">
                <div className="text-md text-slate-500 max-w-[135px] w-full">
                  <p className="font-bold text-slate-700">Fatura Detayı:</p>
                  <p>Lorem Ipsum</p>
                  <p>Dolor Sit</p>
                  <p>amet consectetur</p>
                  <p>adipisicing elit</p>
                </div>

                <div className="text-md text-slate-500 max-w-[135px] w-full">
                  <p className="font-bold text-slate-700">Fatura</p>
                  <p>Lorem Street</p>
                  <p>Dolor </p>
                  <p>amet consectetur</p>
                  <p>adipisicing elit</p>
                </div>

                <div className="text-md text-slate-500 flex flex-col max-w-[135px] w-full">
                  <div>
                    <p className="font-bold text-slate-700">Fatura Numarası</p>
                    <p>{Math.floor(Math.random() * 100.)}</p>
                  </div>

                  <div className="mt-auto">
                    <p className="font-bold text-slate-700">Veriliş Tarihi</p>
                    <p>
                      {new Date(printBill?.createdAt)
                        .toLocaleString()
                        .substring(0, 10)}
                    </p>
                  </div>
                </div>

                <div className="text-md text-slate-500 flex flex-col max-w-[135px] w-full">
                  <div>
                    <p className="font-bold text-slate-700">Süre</p>
                    <p>1 yıl</p>
                  </div>

                  <div className="mt-auto">
                    <p className="font-bold text-slate-700">Son Tarih</p>
                    <p>10-01-2025</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="table-details" className="mt-4">
              <table className="min-w-full table-auto overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-center text-sm font-normal text-slate-700"
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="text-center text-sm font-normal text-slate-700"
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="text-center text-sm font-normal text-slate-700"
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="text-center text-sm font-normal text-slate-700"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="text-center text-sm font-normal text-slate-700"
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {printBill?.cartItems?.map((item) => (
                    <tr
                      className="border-t-2 border-b-2 border-slate-900"
                      key={item._id}
                    >
                      <td className="text-center flex justify-center items-center">
                        <img
                          src={item.productImg}
                          className="h-12 w-12 object-cover"
                          alt=""
                        />
                      </td>
                      <td className="text-center">
                        <span className="font-medium">{item.productName}</span>
                      </td>
                      <td className="text-center">
                        {item.productPrice.toFixed(2)}₺
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">
                        {(item.productPrice * item.quantity).toFixed(2)}₺
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div id="bill-total" className="flex justify-end w-full my-5">
              <div className="md:w-56 w-full border-2 flex flex-col gap-2 p-4 ">
                <div className="w-full flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Ara Toplam</span>
                  <span>{Number(printBill?.subTotal).toFixed(2)} ₺</span>
                </div>
                <div className="w-full flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">
                    KDV {cart.tax}%
                  </span>
                  <span className="text-red-600">
                    +{Number(printBill?.tax).toFixed(2)}₺
                  </span>
                </div>
                <div className="w-full flex justify-between text-sm">
                  <span className="text-slate-700 font-bold">Toplam</span>
                  <span>{Number(printBill?.totalAmonut).toFixed(2)}₺</span>
                </div>
              </div>
            </div>

            <div
              id="bill-descripton"
              className="border-2 p-4 my-2 border-black/60"
            >
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
                unde quaerat quisquam quae, placeat vitae numquam accusantium
                veritatis repellendus praesentium, corrupti deleniti esse sequi,
                ducimus nesciunt quo libero tempora repudiandae saepe at. Ipsam,
                vero dolore voluptatum enim debitis quaerat unde? Illum beatae,
                distinctio alias accusamus consequatur in accusantium hic earum.
              </p>
            </div>
          </article>
        </div>
      </section>

      <div className="flex w-full justify-end mt-5">
        <Button type="primary" size="large" onClick={handlePrint}>
          {" "}
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBills;
