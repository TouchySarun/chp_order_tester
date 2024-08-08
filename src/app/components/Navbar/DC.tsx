"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/../public/LogoHorizontal.png";
import { signOut } from "next-auth/react";

interface DCNavbarInterface {
  session: any;
}

function DCNavbar({ session }: DCNavbarInterface) {
  return (
    <nav className="shadow-xl">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-1">
          <Link href="/picking">
            <Image src={Logo} width={100} height={100} alt={"chp logo"} />
          </Link>
          <ul className="flex gap-2 p-2">
            <li>
              <Link
                href="/picking"
                className="bg-gray-300 border py-1 px-2 rounded-md my-1 shadow"
              >
                picking
              </Link>
            </li>
            <li>
              <Link
                href={`/user/profile/${session.user.id}`}
                className="bg-gray-300 border py-1 px-2 rounded-md my-1 shadow-md"
              >
                {session.user.username}
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-amber-500 w-full h-2 sticky top-0"></div>
      </div>
    </nav>
  );
}

export default DCNavbar;
