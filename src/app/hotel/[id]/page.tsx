"use client";

import { deleteHotel, editHotel, firestore } from "@/lib/controller";
import { HotelType } from "@/types/hotel";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function HotelPage() {
  const { id } = useParams();

  //fetch a single doc (collection = all) (doc is in collection)
  const getHotel = doc(firestore, `Hotel/${id}`);

  const [hotel, setHotel] = useState<HotelType>();
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchHotelData = async () => {
      const docSnap = await getDoc(getHotel);
      if (docSnap.exists()) {
        const newHotel: HotelType = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        setHotel(newHotel);
        setTitle(newHotel?.title || "");
        setCountry(newHotel?.country || "");
      } else {
        console.log("Doc not found.");
      }
    };
    fetchHotelData();
  }, []);

  const handleDelete = () => {
    deleteHotel(id as string);
  };

  const handleEdit = () => {
    editHotel(id as string, { title, country });
  };

  return (
    <div className="p-10">
      <Link href="/" className="p-3 mx-10 my-5 bg-gray-500 rounded">
        Back
      </Link>
      <div className="p-10">
        <h1 className="text-3xl">Hotel data</h1>
        {hotel && (
          <div className="p-5 border">
            <p>id: {hotel.id}</p>
            <form action="" className="flex flex-col mt-5">
              <p>Title</p>
              <input
                className="my-3 p-2 border"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>Country</p>
              <input
                className="my-3 p-2 border"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </form>
            <div className="mt-5 flex justify-between">
              <button
                onClick={handleDelete}
                className="px-3 py-2 m-3 rounded bg-red-500"
              >
                delete
              </button>

              <button
                onClick={handleEdit}
                className="px-3 py-2 m-3 rounded bg-green-500"
              >
                submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelPage;
