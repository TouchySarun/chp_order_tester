"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/../public/LogoHorizontal.png";
import { signOut } from "next-auth/react";

function BranchNavbar() {
  return (
    <nav className="shadow-xl">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-1">
          <Link href="/order">
            <Image src={Logo} width={100} height={100} alt={"chp logo"} />
          </Link>
          <ul className="flex gap-2 p-2">
            <li>
              <Link
                href="/order"
                className="bg-gray-300 border py-1 px-2 rounded-md my-1 shadow"
              >
                order
              </Link>
            </li>
            <li>
              <a
                className="bg-gray-300 border py-1 px-2 rounded-md my-1 shadow-md"
                onClick={() => signOut()}
              >
                log out
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-amber-500 w-full h-2 sticky top-0"></div>
      </div>
    </nav>
  );
}

export default BranchNavbar;
