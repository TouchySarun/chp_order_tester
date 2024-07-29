import React from "react";
import BranchNavbar from "./Navbar/Branch";
import DCNavbar from "./Navbar/DC";
import AdminNavbar from "./Navbar/Admin";

interface NavbarInterface {
  session: any;
}

function Navbar({ session }: NavbarInterface) {
  if (session)
    return session.user.role === "LDC" ? (
      <AdminNavbar />
    ) : session.user.role === "BR" ? (
      <BranchNavbar />
    ) : (
      <DCNavbar session={session} />
    );
}

export default Navbar;
