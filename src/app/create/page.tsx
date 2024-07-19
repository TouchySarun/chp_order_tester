"use client";

import { addHotel } from "@/lib/controller";
import React, { useState } from "react";

function CreatePage() {
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addHotel({ title, country });
  };
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className="p-10">
      <h1 className="text-3xl">Add a new Hotel</h1>
      <form onSubmit={handlesubmit} className="flex flex-col mt-5">
        <label htmlFor="">Titile</label>
        <input
          type="text"
          value={title}
          className="my-3 p-2 border"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">Country</label>
        <input
          type="text"
          value={country}
          className="my-3 p-2 border"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit" className="rounded px-3 py-2 m-3 bg-green-500">
          submit
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
