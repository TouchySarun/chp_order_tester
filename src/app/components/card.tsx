import { HotelType } from "@/types/hotel";
import Link from "next/link";
import React from "react";

interface CardProps {
  data: HotelType;
}
function Card({ data }: CardProps) {
  const { id, title, country } = data;
  return (
    <div className="shadow-lg m-3 p-5 rounded-lg">
      <h3 className="text-2xl">Hotel</h3>
      <p>id: {id}</p>
      <p>title: {title}</p>
      <p>country: {country}</p>
      <div className="mt-5 flex">
        <Link
          href={`/hotel/${id}`}
          className="m-5 p-3 rounded shadow bg-blue-500"
        >
          edit
        </Link>
      </div>
    </div>
  );
}

export default Card;
