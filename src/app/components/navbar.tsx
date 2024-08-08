import React from "react";
import BranchNavbar from "./Navbar/Branch";
import DCNavbar from "./Navbar/DC";
import AdminNavbar from "./Navbar/Admin";
import LoginNavbar from "./Navbar/Login";

interface NavbarInterface {
  session: any;
}

function Navbar({ session }: NavbarInterface) {
  if (session)
    return session.user.role === "admin" ? (
      <AdminNavbar />
    ) : session.user.role === "br" ? (
      <BranchNavbar />
    ) : session.user.role === "dc" || session.user.role === "pc" ? (
      <DCNavbar session={session} />
    ) : (
      <LoginNavbar />
    );
}

export default Navbar;
