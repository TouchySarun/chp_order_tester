"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/../public/LogoHorizontal.png";
import { signOut } from "next-auth/react";

interface AdminNavbarInterface {
  session: any;
}

function AdminNavbar({ session }: AdminNavbarInterface) {
  return (
    <nav className="shadow-xl">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-1">
          <Link href="/admin">
            <Image src={Logo} width={100} height={100} alt={"chp logo"} />
          </Link>
          <ul className="flex gap-2 p-2">
            <li>{session.user.role}</li>
            <li>
              <Link
                href={`/user/profile/${session.user.id}`}
                className="bg-gray-300 border p-2 rounded-md shadow-md"
              >
                {session.user.username}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-amber-500 w-full h-2 sticky top-0"></div>
    </nav>
  );
}

export default AdminNavbar;
