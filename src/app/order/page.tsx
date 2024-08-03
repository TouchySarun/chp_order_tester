"use client";

import React, { useState } from "react";
import EditOrder from "../components/EditOrder";
import { getSKU, getSKUByBarcode } from "@/lib/sku";
import { getOrder, getOrderBySKU, getOrderLastDate } from "@/lib/order";
import SuccessOrder from "../components/order/SuccessOrder";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/navbar";

function OrderPage() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") redirect("/login");

  const [barcode, setBarcode] = useState("");
  const [selectBarcode, setSelectBarcode] = useState("");
  const [sku, setSKU] = useState<SKUType>();
  const [order, setOrder] = useState<OrderType>();

  const [showEdit, setShowEdit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderLastDate, setOrderLastDate] = useState<string>();

  const handleGetSKU = async () => {
    if (!session?.user) return;
    setSKU(undefined);
    setShowSuccess(false);
    const res = await getSKUByBarcode(barcode);
    if (!res || !res.ok || !res.data) {
      alert("Error getting sku by barcode.");
      return;
    }

    setSKU(res.data);
    handleGetOrder(res.data.id, session.user.branch);
    handleGetOrderLastDate(res.data.id, session.user.branch);
  };

  const handleGetOrder = async (skuID: string, branch: string) => {
    setOrder(undefined);
    const res = await getOrderBySKU(skuID, branch);
    if (!res || !res.ok) {
      alert("Error getting order by sku.");
      return;
    }
    setOrder(res.data);
  };

  const handleGetOrderLastDate = async (skuID: string, branch: string) => {
    setOrderLastDate("");
    const res = await getOrderLastDate(skuID, branch);
    if (!res || !res.ok) {
      alert("Error getting order last date by sku. ");
      return;
    }
    setOrderLastDate(res.data?.lstUpd?.toLocaleDateString("en-GB"));
  };

  const handleCancle = () => {
    setSKU(undefined);
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setSKU(undefined);
  };

  return (
    <>
      <Navbar session={session} />
      <div className="container mx-auto py-10 px-5">
        {showEdit && <EditOrder onClose={() => setShowEdit(false)} />}
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
        {sku && (
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
                        {order.startDate.toLocaleDateString("en-GB")}
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
                  *ถ้ามีคำสั่งอยู่ในระบบ จะเป็นการสั่งเพิ่ม
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
                        ? " bg-orange-100 py-3 shadow"
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
                    <p>{goods.utqname}</p>
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
                  className="inline-block flex-auto w-3/4 rounded-r-lg border p-2"
                />
              </div>
              <div className="flex justify-between gap-2">
                <button
                  onClick={handleCancle}
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
        )}
      </div>
    </>
  );
}

export default OrderPage;
