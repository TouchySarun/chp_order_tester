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
    <nav>
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-1 shadow-xl">
          <Link href="/welcome">
            <Image src={Logo} width={100} height={100} alt={"chp logo"} />
          </Link>
          <Link
            href={`/user/profile/${session.user.id}`}
            className="text-2xl mx-2 bg-amber-500 text-white rounded-full w-[36px] h-[36px] text-center py-1"
          >
            {session.user.username.slice(0, 1)}
          </Link>
        </div>
        <div className="border-t-8 border-amber-500 sticky top-0">
          <ul className="flex gap-4 px-4 text-sm text-gray-400 justify-end">
            <li>
              id: <span className="text-orange-600">{session.user.id}</span>
            </li>
            <li>
              rack: <span className="text-orange-600">{session.user.rack}</span>
            </li>
            <li>
              branch:{" "}
              <span className="text-orange-600">{session.user.branch}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default DCNavbar;
