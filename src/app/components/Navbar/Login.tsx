"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "@/../public/LogoHorizontal.png";
import { usePathname, redirect } from "next/navigation";
import { allowedPathNoAuth } from "@/lib/globalConst";

const LoginNavbar = () => {
  const allowed = allowedPathNoAuth.some((path) =>
    usePathname().includes(path)
  );
  if (!allowed) {
    redirect("/login");
  }

  return (
    <nav className="shadow-xl">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-1">
          <Image src={Logo} width={100} height={100} alt={"chp logo"} />
          <ul className="flex gap-2 p-2">
            <li>
              <Link
                href="/login"
                className="bg-gray-300 border py-1 px-2 rounded-md my-1 shadow"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-amber-500 w-full h-2 sticky top-0"></div>
      </div>
    </nav>
  );
};

export default LoginNavbar;
