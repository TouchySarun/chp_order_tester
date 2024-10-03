"use client";

import React, { useState } from "react";
import EditOrder from "../components/EditOrder";
import { getCreateOrderData, getSKUByBarcode } from "@/lib/sku";
import {
  addOrder,
  editOrder,
  getOrder,
  getOrderBySKU,
  getOrderLastDate,
} from "@/lib/order";
import SuccessOrder from "../components/order/SuccessOrder";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";

function OrderPage() {
  const { data: session } = useSession();

  const [barcode, setBarcode] = useState("");
  const [selectBarcode, setSelectBarcode] = useState("");
  const [sku, setSKU] = useState<SKUType>();
  const [order, setOrder] = useState<OrderType>();
  const [qty, setQty] = useState("");
  const [tag, setTag] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderLastDate, setOrderLastDate] = useState<string>();

  const [loading, setLoading] = useState(false);

  const handleGetSKU = async () => {
    if (!session?.user) return;
    setLoading(true);
    setSKU(undefined);
    setOrder(undefined);
    setShowSuccess(false);

    const res = await getSKUByBarcode(barcode);
    if (!res || !res.ok || !res.data) {
      alert("Error getting sku by barcode.");
      setLoading(false);
      return;
    }

    setSKU(res.data);
    handleGetOrder(res.data.id, session.user.branch);
    handleGetOrderLastDate(res.data.id, session.user.branch);
    setSelectBarcode(barcode);
    setLoading(false);
  };

  const handleGetData = async () => {
    if (!session?.user) return;
    setLoading(true);
    setSKU(undefined);
    setOrder(undefined);
    setShowSuccess(false);

    const res1 = await getCreateOrderData(barcode, session.user.branch);
    if (!res1 || !res1.data) {
      alert(res1.error);
      setLoading(false);
      return;
    }
    const { sku, order, lastOrder } = res1.data;
    setSKU(sku);
    setOrder(order);
    setOrderLastDate(lastOrder.lstUpd?.todate().toLocaleDateString("en-GB"));
  };

  const handleGetOrder = async (skuID: string, branch: string) => {
    const res = await getOrderBySKU(skuID, branch);
    if (!res || !res.ok) {
      alert("Error getting order by sku.");
      return;
    }
    setOrder(res.data);
  };

  const handleGetOrderLastDate = async (skuID: string, branch: string) => {
    const res = await getOrderLastDate(skuID, branch);
    if (!res || !res.ok) {
      //alert("Error getting order last date by sku. ");
      return;
    }
    if (res.data) {
      setOrderLastDate(res.data.lstUpd?.toDate().toLocaleDateString("en-GB"));
    } else {
      setOrderLastDate(undefined);
    }
  };

  const resetData = () => {
    setSKU(undefined);
    setBarcode("");
    setSelectBarcode("");
    setQty("");
  };

  const handleSubmit = async () => {
    if (!sku || !session) {
      return;
    }
    const selectGoods = sku.goods.find((g) => g.code === selectBarcode);
    if (!selectGoods) {
      return;
    }
    const qtyNumber = parseInt(qty);
    if (isNaN(qtyNumber)) {
      alert("ใส่จำนวน");
      return;
    }
    setLoading(true);
    if (!order) {
      // add new order
      const newOrder: OrderType = {
        startDate: new Date(),
        name: sku.name,
        utqName: selectGoods.utqName,
        utqQty: selectGoods.utqQty,
        code: selectBarcode,
        sku: sku.id,
        ap: sku.apCode,
        creBy: session.user.name,
        qty: qtyNumber,
        leftQty: qtyNumber,
        pending: true,
        tag: tag,
        branch: session.user.branch,
        cat: sku.catCode,
        brand: sku.brnCode,
      };
      // console.log("newOrder :", newOrder);

      const res = await addOrder(newOrder);
      if (!res.ok) {
        alert("Error, add new order");
        setLoading(false);
        return;
      }
      setOrder(newOrder);
    } else {
      // update old order
      if (selectGoods.utqQty !== order.utqQty || !order.id) {
        alert(
          `หน่วยนับไม่ตรงกับคำสั่งเดิม ไม่สามารถเพิ่มคำสั่งได้ \n หน่วยนับต้องเป็น ${order.utqQty}`
        );
        setLoading(false);
        return;
      }

      const newOrder: OrderType = {
        ...order,
        lstUpd: new Date(),
        qty: order.qty + qtyNumber,
        leftQty: order.leftQty + qtyNumber,
      };
      const res = await editOrder(order.id, newOrder);
      if (!res.ok) {
        alert("Error, update order");
        setLoading(false);
        return;
      }
      setOrder(newOrder);
    }
    setLoading(false);
    setShowSuccess(true);
    resetData();
  };

  const handleEditOrder = async (newOrder: OrderType) => {
    if (!order || !order.id) {
      return;
    }
    const res = await editOrder(order.id, newOrder);
    if (!res.ok) {
      alert("Error, update order");
      return;
    }
    setOrder(newOrder);
    setShowSuccess(true);
    resetData();
  };

  return (
    <>
      <div className="container mx-auto py-10 px-5">
        {showEdit && order && sku && (
          <EditOrder
            order={order}
            sku={sku}
            onClose={() => setShowEdit(false)}
            setOrder={handleEditOrder}
          />
        )}
        <h1 className="text-3xl text-orange-600 font-bold">สั่งสินค้า</h1>
        <div className="flex my-3 shadow-md">
          <input
            type="text"
            className="inline-block flex-auto w-3/4 border rounded-l-lg p-2"
            placeholder="สแกนสินค้า"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <button
            onClick={handleGetSKU}
            className="inline-block flex-1 rounded-r-lg bg-green-500 text-white p-2"
          >
            search
          </button>
        </div>
        {showSuccess && order && <SuccessOrder order={order} />}
        {loading ? (
          <Loading />
        ) : (
          sku && (
            <div className="container flex flex-col gap-5 mx-auto my-3 p-2 rounded-lg shadow-lg border">
              <div className="py-2 flex flex-col gap-2">
                <h3 className="text-xl text-gray-400">ข้อมูลสินค้า</h3>
                <p>ชื่อ: {sku.name}</p>
                <div className="grid grid-cols-2 gap-5 text-xs">
                  <p>
                    ประเภท:{" "}
                    <span className="bg-blue-100 rounded-full px-2 py-1">
                      {sku.catName}
                    </span>
                  </p>
                  <p>
                    เจ้าหนี้:{" "}
                    <span className="bg-blue-100 rounded-full px-2 py-1">
                      {sku.apName}
                    </span>
                  </p>
                  <p>
                    ยี่ห้อ:{" "}
                    <span className="bg-blue-100 rounded-full px-2 py-1">
                      {sku.brnName}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-orange-50 p-2 flex justify-between gap-2 items-center">
                  {order ? (
                    <>
                      <div>
                        <p>
                          คำสั่งคงค้าง{" "}
                          <span className="bg-orange-200 rounded-full px-2 py-1">
                            {order.leftQty}
                          </span>{" "}
                          {order.utqName}
                        </p>
                        <span className="text-gray-500 text-xs">
                          {order.startDate.toDate().toLocaleDateString("en-GB")}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowEdit(true)}
                        className="text-xs bg-orange-500 shadow-md px-3 py-1 rounded-lg text-white"
                      >
                        แก้ไข
                      </button>
                    </>
                  ) : (
                    <div className="bg-orange-50 p-2 text-gray-400">
                      ไม่มีคำสั่งคงค้าง
                    </div>
                  )}
                </div>
                {orderLastDate ? (
                  <p className="w-full p-2 bg-gray-200">
                    จัดส่งล่าสุด{" "}
                    <span className="bg-orange-200 rounded-full px-2 py-1">
                      {orderLastDate}
                    </span>
                  </p>
                ) : (
                  <p className="w-full p-2 bg-gray-200 text-gray-400">
                    สาขายังไม่เคยได้รับสินค้านี้จากคลัง
                  </p>
                )}
              </div>
              <div className="py-2">
                <div className="flex items-end flex-wrap">
                  <h3 className="text-xl text-gray-400">สั่งรอบปัจจุบัน</h3>
                  <span className="text-xs text-gray-400 ml-3">
                    *ถ้าในระบบมีคำสั่งอยู่แล้ว จะเป็นการสั่งเพิ่ม
                  </span>
                </div>
                <div className="flex flex-col gap-1 h-48 overflow-auto p-2 border rounded">
                  {sku.goods.map((goods) => (
                    <label
                      key={goods.code}
                      htmlFor={goods.code}
                      className={
                        "grid grid-cols-3 gap-1 rounded px-2 border" +
                        (selectBarcode === goods.code
                          ? " bg-orange-200 py-3 shadow"
                          : " bg-yellow-50 py-1")
                      }
                    >
                      <input
                        type="radio"
                        name="barcode"
                        id={goods.code}
                        value={goods.code}
                        className="hidden"
                        onChange={(e) => setSelectBarcode(e.target.value)}
                      />
                      <p className="col-span-2 ">{goods.code}</p>
                      <p>{goods.utqName}</p>
                    </label>
                  ))}
                </div>
                <div className="flex my-3 shadow-md">
                  <label
                    htmlFor="qty"
                    className="inline-block flex-1 border rounded-l-lg p-2 bg-orange-600 text-white"
                  >
                    จำนวน
                  </label>
                  <input
                    type="text"
                    name="qty"
                    id="qty"
                    placeholder="กรอกจำนวนสั่งสินค้า"
                    autoFocus
                    className="inline-block flex-auto w-3/4 rounded-r-lg border p-2"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={resetData}
                    className="bg-red-500 shadow-md px-3 py-2 rounded-lg text-white"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 shadow-md px-3 py-2 rounded-lg text-white flex-auto w-3/4"
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default OrderPage;
