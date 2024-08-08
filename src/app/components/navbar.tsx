import React from "react";
import BranchNavbar from "./Navbar/Branch";
import DCNavbar from "./Navbar/DC";
import AdminNavbar from "./Navbar/Admin";
import LoginNavbar from "./Navbar/Login";

interface NavbarInterface {
  session: any;
}

function Navbar({ session }: NavbarInterface) {
  if (session) {
    return session.user.role === "admin" ? (
      <AdminNavbar session={session} />
    ) : (
      <DCNavbar session={session} />
    );
  } else {
    return <LoginNavbar />;
  }
}

export default Navbar;
