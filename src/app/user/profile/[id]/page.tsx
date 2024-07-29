"use client";
import Navbar from "@/app/components/navbar";
import { getUserById } from "@/lib/user";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

function ProfilePage({ params }: ProfilePageProps) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");

  const [isEdit, setIsEdit] = useState(false);
  const [isSelectingAP, setIsSelectingAP] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [ap, setAP] = useState<APType[]>([]);

  const { id } = params;

  const handleGetUserById = async () => {
    try {
      const user = await getUserById(id);
      if (user) {
        setName(user.name);
        setPassword(user.password);
        setRole(user.role);
        setBranch(user.branch);
        setAP(user.ap);
      }
    } catch (err) {
      console.log("Error, trying get user by id : ", err);
    }
  };
  useEffect(() => {
    handleGetUserById();
  }, []);

  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto py-10 px-5">
        <div className="flex justify-between">
          <h1 className="text-3xl text-orange-600 font-bold">
            ตั้งค่าผู้ใช้งาน
          </h1>
          <button
            className="bg-blue-100 rounded-lg shadow-lg p-2"
            onClick={() => setIsEdit((e) => !e)}
          >
            edit
          </button>
        </div>
        <div className="rounded-lg border shadow-lg p-2 mt-2">
          {isEdit ? (
            <form action="" className="flex flex-col justify-between min-h-64">
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="name" className="text-right">
                  name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="p-2 border rounded-md shadow-md w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="password" className="text-right">
                  password:
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="p-2 border rounded-md shadow-md w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="branch" className="text-right">
                  role:
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="p-2 border rounded-md shadow-md w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="branch" className="text-right">
                  branch:
                </label>
                <p className="p-2 w-full col-span-2 flex gap-2 flex-wrap">
                  {branch}
                </p>
                <button className="p-2 border rounded-md shadow-md ">
                  เปลี่ยนสาขา
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="ap" className="text-right">
                  ap:
                </label>
                <div className="p-2 w-full col-span-2 flex gap-2 flex-wrap">
                  {ap.map((a) => (
                    <p className="p-2 bg-gray-300 rounded">{a.name}</p>
                  ))}
                </div>
                <button className="p-2 border rounded-md shadow-md">
                  เปลี่ยนเจ้าหนี้
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col justify-between min-h-64">
              <div className="grid grid-cols-4 gap-2 items-center">
                <p className="text-right">name:</p>
                <p className="p-2 w-full col-span-3">{name}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p className="text-right">password:</p>
                <p className="p-2 w-full col-span-3">{password.length}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p className="text-right">role:</p>
                <p className="p-2 w-full col-span-3">{role}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p className="text-right">branch:</p>
                <p className="p-2 w-full col-span-3">{branch}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p className="text-right">ap:</p>
                <div className="p-2 w-full col-span-2 flex gap-2">
                  {ap.map((a) => (
                    <p className="p-2 bg-gray-300 rounded">{a.name}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => signOut()}
          className="mt-4 bg-red-500 text-white w-full p-2 rounded-lg shadow-md"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
