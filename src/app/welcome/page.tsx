"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";

interface JobsInterface {
  name: string;
  link: string;
  color: string;
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
          { name: "สั่งสินค้า", link: "/order", color: "orange-100" },
          {
            name: "ดูประวัติการสั่ง",
            link: "/order/history",
            color: "orange-200",
          }
        );
        break;
      }
      case "dc":
      case "pc": {
        // picking, edit picking
        jobs.push(
          { name: "จัดสินค้า", link: "/picking", color: "green-100" },
          {
            name: "ดูประวัติการจัด",
            link: "/picking/history",
            color: "green-200",
          }
        );
        break;
      }
      case "admin": {
        // can order, edit order, picking, edit picking, other user setting, import data
        jobs.push(
          { name: "สั่งสินค้า", link: "/order", color: "orange-100" },
          { name: "จัดสินค้า", link: "/picking", color: "orange-200" },
          {
            name: "ดูประวัติการสั่ง",
            link: "/order/history",
            color: "orange-100",
          },
          {
            name: "ดูประวัติการจัด",
            link: "/picking/history",
            color: "orange-200",
          },
          {
            name: "รายงาน",
            link: "/report",
            color: "gray-200",
          },
          { name: "จัดการผู้ใช้งาน", link: "/user", color: "blue-100" },
          { name: "จัดการข้อมูล", link: "/data", color: "sky-400" }
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
        <div className="w-full flex justify-center flex-col mt-4 gap-4 px-4">
          {getLink().map((job) => (
            <Link
              key={job.name}
              href={job.link}
              className={`bg-${job.color} border p-4 rounded-lg shadow-lg text-lg`}
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
