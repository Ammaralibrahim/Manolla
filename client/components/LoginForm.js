"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'; // Import js-cookie


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data.status === "Success") {
          // Store user ID in a cookie
          Cookies.set("userId", result.data.userId);

          toast.success("Login successful!");
          router.push('/home');
        } else {
          toast.error("Incorrect password or email! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="text-left" action="/home">
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="block text-black">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2  bg-white text-black focus:outline-none  border-b border-black"
            id="exampleInputEmail1"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="block text-black">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2  bg-white text-black focus:outline-none  border-b border-black"
            id="exampleInputPassword1"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-black p-3 -md tracking-wide font-semibold text-white focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        <p className="text-center text-black text-xs">
          You don't have an account? <Link href="/signup" className="text-black underline">Signup</Link>
        </p>
      </form>
    </>
  );
}
