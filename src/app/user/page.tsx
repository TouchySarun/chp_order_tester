"use client";
import { getUsers } from "@/lib/user";
import React, { useState } from "react";
import ApSelector from "../components/selector/ap";

function UserPage() {
  const [openFilter, setOpenFilter] = useState(true);
  const [openAPSelector, setOpenAPSelector] = useState(false);

  const [selectedAP, setSelectedAP] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string[]>([]);

  const [users, setUsers] = useState<UserType[]>([]);

  const handleGetUsers = () => {
    setOpenFilter(false);
    const res = getUsers();
    setUsers(res);
  };

  const handleCloseAPSelector = () => {
    setOpenAPSelector(false);
  };

  return (
    <div className="container mx-auto py-10 px-5 flex flex-col gap-4">
      {openAPSelector && (
        <ApSelector onClose={handleCloseAPSelector} selectedAP={["1", "4"]} />
      )}
      <div className="flex justify-between">
        <h1 className="text-3xl text-orange-600 font-bold">ตั้งค่าพนักงาน</h1>
        <button className="rounded-lg shadow-md p-2 text-white bg-green-500">
          + เพิ่มพนักงานใหม่
        </button>
      </div>
      <div className="shadow-md rounded-xl p-2 border flex flex-col gap-4">
        {openFilter ? (
          <>
            <h2 className="text-gray-400 text-lg">ตัวกรอง</h2>
            <div className="flex items-center">
              <p className="w-1/4 text-right pr-4">เจ้าหนี้</p>
              <button
                onClick={() => setOpenAPSelector(true)}
                className="w-3/4 border rounded shadow-md px-2 py-1 text-gray-400 text-left"
              >
                {selectedAP.length === 0
                  ? "เจ้าหนี้ทั้งหมด"
                  : selectedAP.reduce((res, ap) => res + ", " + ap)}
              </button>
            </div>
            <div className="flex items-center">
              <p className="w-1/4 text-right pr-4">สาขา</p>
              <button className="w-3/4 border rounded shadow-md px-2 py-1 text-gray-400 text-left">
                สาขาทั้งหมด
              </button>
            </div>
            <button
              onClick={handleGetUsers}
              className="bg-green-500 text-white w-full px-2 py-1 rounded-lg shadow-md"
            >
              ยืนยัน
            </button>
          </>
        ) : (
          <>
            <div className="w-full text-right text-xs text-gray-400">
              เจ้าหนี้: ทั้งหมด, สาขา: ทั้งหมด
            </div>
            <button
              onClick={() => setOpenFilter(true)}
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow-lg"
            >
              ตัวกรอง
            </button>
          </>
        )}
        <div className="flex shadow-md rounded-lg">
          <input
            type="text"
            className="inline-block flex-auto w-3/4 border rounded-l-lg p-2"
            placeholder="ค้าหา ชื่อพนักงาน"
          />
          <button className="inline-block flex-1 rounded-r-lg bg-green-500 text-white p-2">
            search
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
