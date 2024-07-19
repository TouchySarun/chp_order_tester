"use client";

import { useEffect, useState } from "react";
import Card from "./components/card";
import Image from "next/image";
import { HotelType } from "@/types/hotel";
import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { hotelcollection } from "@/lib/controller";

export default function Home() {
  const [hotels, setHotels] = useState<HotelType[]>();

  useEffect(
    () =>
      onSnapshot(hotelcollection, (snapshot: QuerySnapshot<DocumentData>) => {
        console.log(snapshot.docs);

        setHotels(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }),
    []
  );

  return (
    <main>
      <h1 className="text-xl">Hotel app</h1>
      {hotels?.map((val) => (
        <Card key={val.id} data={val} />
      ))}
    </main>
  );
}
