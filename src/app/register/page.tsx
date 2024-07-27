"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { addUser, getUser } from "@/lib/user";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    if (password != confirmPassword) {
      setError("Password do not match");
      return;
    }

    if (!username || !password) {
      setError("Please complete all input");
      return;
    }

    try {
      // get user from data base
      const user = await getUser(username);
      if (user) {
        console.log(user);
        setError("User already exists.");
        return;
      }
      // register user
      const res = await addUser({ username: username, password });
      if (res) {
        console.log(res);
        setSuccess("Success user register");
      } else {
        setError("user registeration fail.");
      }
    } catch (err) {
      console.log("Error in user registeration.", err);
    }
  };

  return (
    <div className="flex-grow">
      <div className="flex justify-center items-center">
        <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
          <h3 className="text-3xl">Register</h3>
          <hr className="my-3" />
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {success}
              </div>
            )}
            <input
              type="text"
              className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
            />
            <input
              type="password"
              className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
              type="submit"
            >
              Sign up
            </button>
            <hr className="my-3" />
            <p>
              Already have an account? Go to{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>{" "}
              page
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
