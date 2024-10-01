"use client";
import Navbar from "@/app/components/navbar";
import ApSelector from "@/app/components/selector/ap";
import { getRolesNBranches } from "@/lib/system";
import { editUser, getUserById } from "@/lib/user";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const isEqual = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

function ProfilePage({ params }: ProfilePageProps) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const [isEdit, setIsEdit] = useState(false);
  const [isSelectingAP, setIsSelectingAP] = useState(false);

  const [branches, setBranches] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  const [userData, setUserData] = useState<UserType>();
  // newUserData
  const [name, setName] = useState("");
  const [password, setPassword] = useState<string | undefined>();
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [rack, setRack] = useState("");
  const [ap, setAP] = useState<APType[]>([]);

  const { id } = params;

  const handleGetUserById = async () => {
    try {
      if (!accessToken) return;
      const user = await getUserById(id, accessToken);
      // console.log(user);
      if (user) {
        setName(user.name);
        setPassword(user.password);
        setRole(user.role);
        setBranch(user.branch);
        setAP(user.ap);
        setUserData(user);
        setRack(user.rack);
      }
    } catch (err) {
      console.log("Error, get user by id. :", err);
    }
  };

  const handleGetRolesNBranches = async () => {
    try {
      const { roles, branches } = await getRolesNBranches();
      if (!roles.length || !branches.length) {
        return;
      }

      setRoles(session?.user.role === "admin" ? [...roles, "admin"] : roles);
      setBranches(branches);
    } catch (err) {
      console.log("Error get roles and branches. :", err);
    }
  };

  const handleEdit = async (force: boolean) => {
    if (!session || !userData) return;
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    try {
      // check data b4 edit
      const newUserData: UserType = {
        username: session.user?.username,
        name,
        password,
        role,
        branch,
        ap,
        rack,
      };
      const isChange = !isEqual(userData, newUserData);
      if (!isChange) {
        setIsEdit(false);
        return;
      }
      // have change
      if (!force) {
        if (!window.confirm("ยกเลิกข้อมูลที่บันทึก?")) {
          setName(userData.name);
          setPassword(userData.password);
          setRole(userData.role);
          setBranch(userData.branch);
          setAP(userData.ap);
          setIsEdit(false);
          return;
        }
      }
      // edit
      const success = await editUser(session.user?.id, newUserData);
      if (success) {
        alert("แก้ไขสำเร็จ");
        setUserData(newUserData);
        setIsEdit(false);
      }
    } catch (err) {
      console.log("Error, edit user. :", err);
    }
  };
  useEffect(() => {
    handleGetUserById();
    handleGetRolesNBranches();
  }, []);

  return (
    <div>
      {isSelectingAP && (
        <ApSelector
          onClose={() => setIsSelectingAP(false)}
          selectedAP={ap}
          setSelectedAP={setAP}
        />
      )}
      <div className="container mx-auto py-10 px-5">
        <div className="flex justify-between">
          <h1 className="text-3xl text-orange-600 font-bold">
            ตั้งค่าผู้ใช้งาน
          </h1>
          <button
            className="bg-blue-100 rounded-lg shadow-lg p-2"
            onClick={() => handleEdit(false)}
          >
            edit
          </button>
        </div>
        <div className="rounded-lg border shadow-lg p-2 mt-2">
          <div className="grid grid-cols-4 gap-2 items-center text-gray-400 my-4">
            <p>USERNAME:</p>
            <p className="p-2 w-full col-span-3">{session?.user?.username}</p>
          </div>
          {isEdit ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(true);
              }}
              className="flex flex-col gap-4 min-h-[350px]"
            >
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>id:</p>
                <p className="p-2 w-full col-span-3">{id}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="name">name:</label>
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
                <label htmlFor="password">password:</label>
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
                <label htmlFor="role">role:</label>
                <select
                  name="role"
                  id="role"
                  className="p-2 w-full col-span-3 flex gap-2 flex-wrap border rounded-md shadow-md"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="default-role">default-role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="branch">branch:</label>
                <select
                  name="branch"
                  id="branch"
                  className="p-2 w-full col-span-3 flex gap-2 flex-wrap border rounded-md shadow-md"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="default-branch">default-branch</option>
                  {branches.map((br) => (
                    <option key={br} value={br}>
                      {br}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="rack">rack:</label>
                <input
                  type="text"
                  name="rack"
                  id="rack"
                  value={rack}
                  onChange={(e) => {
                    setRack(e.target.value);
                  }}
                  className="p-2 border rounded-md shadow-md w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label htmlFor="ap">ap:</label>
                <div className="p-2 w-full col-span-2 flex gap-2 flex-wrap">
                  {ap.map((a) => (
                    <p className="p-2 bg-gray-300 rounded" key={a.code}>
                      {a.name}
                    </p>
                  ))}
                </div>
                <button
                  className="p-2 border rounded-md shadow-md"
                  type="button"
                  onClick={() => setIsSelectingAP(true)}
                >
                  เปลี่ยนเจ้าหนี้
                </button>
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white w-full p-2 rounded-lg shadow-md"
              >
                บันทึก
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-4 min-h-[350px]">
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>id:</p>
                <p className="p-2 w-full col-span-3">{id}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>name:</p>
                <p className="p-2 w-full col-span-3">{name}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>password:</p>
                <p className="p-2 w-full col-span-3">
                  {password && "*".repeat(password.length)}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>role:</p>
                <p className="p-2 w-full col-span-3">{role}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>branch:</p>
                <p className="p-2 w-full col-span-3">{branch}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>rack:</p>
                <p className="p-2 w-full col-span-3">{rack}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <p>ap:</p>
                <div className="p-2 w-full col-span-2 flex gap-2 flex-wrap">
                  {ap.map((a) => (
                    <p className="p-2 bg-gray-300 rounded" key={a.code}>
                      {a.name}
                    </p>
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
