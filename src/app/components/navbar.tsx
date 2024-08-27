"use client";

import React from "react";
import DCNavbar from "./Navbar/DC";
import AdminNavbar from "./Navbar/Admin";
import LoginNavbar from "./Navbar/Login";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  if (session) {
    return session.user.role === "admin" ? <AdminNavbar /> : <DCNavbar />;
  } else {
    return <LoginNavbar />;
  }
}

export default Navbar;
