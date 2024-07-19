"use client";
import { getOrders } from "@/lib/order";
import React, { useState } from "react";
import PickingModal from "../components/order/PickingModal";

function PickingPage() {
  const [selectOrder, setSelectOrder] = useState<OrderType>();
  const [orders, setOrders] = useState<OrderType[]>();
  const [openFilter, setOpenFilter] = useState(true);
  const [showPickingModal, setShowPickingModal] = useState(false);

  const handleGetOrders = () => {
    setOpenFilter(false);
    const res = getOrders();
    setOrders(res);
  };

  const handleSelectOrder = (order: OrderType) => {
    setSelectOrder(order);
    setShowPickingModal(true);
  };

  const onPickingModalClose = () => {
    setShowPickingModal(false);
    setSelectOrder(undefined);
  };

  return (
    <div className="container mx-auto py-10 px-5 flex flex-col gap-4">
      {showPickingModal && (
        <PickingModal order={selectOrder} onClose={onPickingModalClose} />
      )}
      <h1 className="text-3xl text-orange-600 font-bold">จัดส่ง</h1>
      <div className="shadow-md rounded-xl px-2 py-2 border flex flex-col gap-4">
        {openFilter ? (
          <>
            <div className="flex items-center">
              <p className="w-1/4 text-right pr-4">ประเภท</p>
              <input
                type="text"
                className="w-3/4 border rounded shadow-md px-2 py-1"
                placeholder="ประเภทสินค้าทั้งหมด"
              />
            </div>
            <div className="flex items-center">
              <p className="w-1/4 text-right pr-4">ยี่ห้อ</p>
              <input
                type="text"
                className="w-3/4 border rounded shadow-md px-2 py-1"
                placeholder="ยี่ห้อสินค้าทั้งหมด"
              />
            </div>
            <div className="flex items-center">
              <p className="w-1/4 text-right pr-4">สาขา</p>
              <input
                type="text"
                className="w-3/4 border rounded shadow-md px-2 py-1"
                placeholder="สาขาทั้งหมด"
              />
            </div>
            <button
              onClick={handleGetOrders}
              className="bg-green-500 text-white w-full px-2 py-1 rounded-lg shadow-md"
            >
              ยืนยัน
            </button>
          </>
        ) : (
          <>
            <div className="w-full text-right text-xs text-gray-400">
              ประเภท: ทั้งหมด, ยี่ห้อ: ทั้งหมด, สาขา: ทั้งหมด
            </div>
            <div className="flex justify-between items-center">
              <p>เรียง: </p>
              <select className="px-2 py-1 rounded border shadow-md w-2/3">
                <option value="name">ชื่อสินค้า : a-z</option>
                <option value="barcode">บาร์สินค้า : a-z</option>
                <option value="name">ชื่อสินค้า : z-a</option>
                <option value="barcode">บาร์สินค้า : z-a</option>
              </select>
              <button
                onClick={() => setOpenFilter(true)}
                className="bg-green-500 text-white px-2 py-1 rounded-lg shadow-lg"
              >
                ตัวกรอง
              </button>
            </div>
          </>
        )}
        <div className="flex shadow-md rounded-lg">
          <input
            type="text"
            className="inline-block flex-auto w-3/4 border rounded-l-lg p-2"
            placeholder="ค้นหาสินค้า"
          />
          <button
            onClick={handleGetOrders}
            className="inline-block flex-1 rounded-r-lg bg-green-500 text-white p-2"
          >
            search
          </button>
        </div>
      </div>
      <div className="container flex flex-col gap-2 mx-auto p-2 rounded-lg shadow-lg border">
        {orders && (
          <div className="grid grid-cols-5 gap-1 rounded p-2 items-center text-lg">
            <p className="col-span-3 px-2">สินค้า</p>
            <p className="text-center col-span-2">จำนวน</p>
          </div>
        )}
        {orders &&
          orders.map((order) => (
            <button
              key={order.id}
              onClick={() => handleSelectOrder(order)}
              className={
                "grid grid-cols-5 gap-1 rounded p-2 items-center border"
              }
            >
              <div className="col-span-3 text-left">
                <div className="flex text-gray-400 gap-2 items-center">
                  <p className="text-xs">สาขา</p>
                  <p className="font-semibold">{order.branch}</p>
                </div>
                <div className="text-wrap">
                  <p className="py-1 text-lg font-bold">{order.code}</p>
                  <p className="text-sm">{order.name}</p>
                </div>
              </div>
              <p className="text-center text-lg px-2 py-1 rounded-full bg-orange-200 font-bold">
                {order.leftQty}
              </p>
              <p className="text-sm">{order.utqName}</p>
            </button>
          ))}
      </div>
    </div>
  );
}

export default PickingPage;
