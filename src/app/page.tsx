"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "authenticated") redirect("/welcome");

  return (
    <main>
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-xl">Home page</h1>
        <div className="w-full flex justify-center flex-col border p-2 rounded-lg shadow-lg mt-4">
          <p>please login</p>
          <button className="p-2 m-2 bg-green-500 text-white rounded-md shadow-md">
            Log in
          </button>
        </div>
      </div>
    </main>
  );
}
