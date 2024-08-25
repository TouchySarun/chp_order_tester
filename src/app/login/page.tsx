"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session, status } = useSession();
  if (status === "authenticated") router.replace("/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      console.log(err);
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
