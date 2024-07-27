"use client";
import { getUser } from "@/lib/user";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await getUser(username);
    if (!res.ok) {
      setError("User not exists.");
      return;
    }
    if (res.data) {
      const user = res.data;
      if (user.password !== password) {
        setError("Wrong password.");
      }
      console.log(user);
    }
  };

  return (
    <div className="flex-grow">
      <div className="flex justify-center items-center">
        <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
          <h3 className="text-3xl">Login</h3>
          <hr className="my-3" />
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            <input
              type="text"
              className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
            />
            <input
              type="password"
              className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
              type="submit"
            >
              Sign in
            </button>
            <hr className="my-3" />
            <p>
              Do not have an account? Go to{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>{" "}
              page
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
