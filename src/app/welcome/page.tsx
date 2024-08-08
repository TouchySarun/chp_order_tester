"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";

interface JobsInterface {
  name: string;
  link: string;
  color?: string;
}

function WelcomePage() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") redirect("/login");

  const role = session?.user.role;
  const getLink = () => {
    var jobs: JobsInterface[] = [];
    switch (role) {
      case "br": {
        // order, edit order
        jobs.push(
          { name: "สั่งสินค้า", link: "/order" },
          { name: "ดูประวัติการสั่ง", link: "/order/history" }
        );
        break;
      }
      case "dc":
      case "pc": {
        // picking, edit picking
        jobs.push(
          { name: "จัดสินค้า", link: "/picking" },
          { name: "ดูประวัติการจัด", link: "/picking/history" }
        );
        break;
      }
      case "admin": {
        // can order, edit order, picking, edit picking, other user setting, import data
        jobs.push(
          { name: "สั่งสินค้า", link: "/order" },
          { name: "จัดสินค้า", link: "/picking" },
          { name: "ดูประวัติการสั่ง", link: "/order/history" },
          { name: "ดูประวัติการจัด", link: "/picking/history" },
          { name: "จัดการผู้ใช้งาน", link: "/user" },
          { name: "จัดการข้อมูล", link: "/data" }
        );
        break;
      }
    }
    return jobs;
  };

  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-xl">Welcome</h1>
        <div className="w-full flex justify-center flex-col mt-4">
          {getLink().map((job) => (
            <Link
              key={job.name}
              href={job.link}
              className="bg-orange-100 border p-2 rounded-lg my-1 shadow-lg"
            >
              {job.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
