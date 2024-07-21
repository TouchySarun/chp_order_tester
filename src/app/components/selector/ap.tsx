"use client";
import { getAps } from "@/lib/ap";
import React, { useEffect, useState } from "react";

interface ApSelectorProps {
  onClose: () => void;
  selectedAP?: string[];
}
function ApSelector({
  onClose,
  selectedAP: hasBeenSelectedAP = [],
}: ApSelectorProps) {
  const [aps, setAps] = useState<APType[]>([]);
  const [selectedAP, setSelectedAP] = useState<string[]>(hasBeenSelectedAP);
  const [query, setQuery] = useState("");
  const handleGetAps = () => {
    // search ap by query
    const res = getAps();
    setAps(res);
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkingAp = e.target.value;
    const temp = selectedAP.filter((ap) => ap !== checkingAp);

    if (temp.length === selectedAP.length) {
      setSelectedAP([...selectedAP, checkingAp]);
    } else {
      setSelectedAP(temp);
    }
  };

  useEffect(() => {
    const res = getAps();
    setAps(res);
  }, []);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-xl font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      เลือกเจ้าหนี้{" "}
                      <span className="text-gray-400 text-sm">
                        (เลือกอยู่ {selectedAP.length} เจ้าหนี้)
                      </span>
                    </h3>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={onClose}
                    >
                      ยกเลิก
                    </button>
                  </div>
                  <div className="p-2 rounded-md border flex flex-col gap-2">
                    <div className="flex">
                      <input
                        type="text"
                        className="inline-block flex-auto w-3/4 border rounded-l-lg p-2"
                        placeholder="ค้นหา ชื่อเจ้าหนี้"
                      />
                      <button className="inline-block flex-1 rounded-r-lg bg-green-500 text-white p-2">
                        search
                      </button>
                    </div>
                    <div className=" h-[400px] overflow-scroll">
                      {aps.map((ap) => (
                        <label
                          htmlFor={"ap_" + ap.id}
                          className="flex gap-2 p-2" // todo change to grid & col
                        >
                          <input
                            type="checkbox"
                            id={"ap_" + ap.id}
                            name="aps"
                            value={ap.code}
                            checked={selectedAP.includes(ap.code)}
                            onChange={handleCheck}
                          />
                          <p>{ap.code}</p>
                          <p>{ap.name}</p>
                          <p>{ap.remark}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-4 py-3">
              <button className="text-white text-lg p-2 bg-green-500 rounded-md shadow-md">
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApSelector;
