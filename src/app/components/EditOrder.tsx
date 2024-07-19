"use client";

import React, { useState } from "react";

interface EditOrderProps {
  order?: OrderType;
  onClose: () => void;
}

function EditOrder({ order, onClose }: EditOrderProps) {
  const [selectBarcode, setSelectBarcode] = useState("");
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                    ยกเลิก
                  </button>
                </div>
                <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    แก้ไขคำสั่ง
                  </h3>
                  <div className="mt-2 flex flex-col gap-4">
                    <label
                      htmlFor="barcode1"
                      className={
                        "grid grid-cols-4 gap-3 rounded" +
                        (selectBarcode === "8850999320007"
                          ? " bg-orange-200 py-2"
                          : "")
                      }
                    >
                      <input
                        type="radio"
                        name="barcode"
                        id="barcode1"
                        value={"8850999320007"}
                        onChange={(e) => setSelectBarcode(e.target.value)}
                      />
                      <p className="col-span-2 ">8850999320007</p>
                      <p>ขวด</p>
                    </label>

                    <label
                      htmlFor="barcode2"
                      className={
                        "grid grid-cols-4 gap-3 rounded" +
                        (selectBarcode === "8850999320021"
                          ? " bg-orange-200 py-2"
                          : "")
                      }
                    >
                      <input
                        type="radio"
                        name="barcode"
                        id="barcode2"
                        value={"8850999320021"}
                        onChange={(e) => setSelectBarcode(e.target.value)}
                      />
                      <p className="col-span-2">18850999320021</p>
                      <p>แพค 6</p>
                    </label>
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
                        className="inline-block flex-auto w-3/4 rounded-r-lg border p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex gap-4">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                ลบคำสั่ง
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
