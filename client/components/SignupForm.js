"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null); // Use null to represent the selected file
  const [location, setLocation] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the file to the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("image", image); // Append the selected file
    formData.append("location", location);

    axios
      .post("http://localhost:3001/register", formData)
      .then((result) => {
        if (result.data === "Already registered") {
          toast.error("E-mail already registered! Please Login to proceed.");
        } else {
          toast.success("Registered successfully! Please Login to proceed.");
          router.push('/home');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="text-left">
        <div className="mb-4">
          <label htmlFor="exampleInputname" className="block text-black">
            Username
          </label>
          <input
            type="text"
            className="w-full px-3 py-2  bg-white border-b border-black text-black focus:outline-none "
            id="exampleInputname"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputLastname" className="block text-black">
            Lastname
          </label>
          <input
            type="text"
            className="w-full px-3 py-2  bg-white border-b border-black text-black focus:outline-none "
            id="exampleInputLastname"
            onChange={(event) => setLastname(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="block text-black">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2  bg-white border-b border-black text-black focus:outline-none "
            id="exampleInputEmail1"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="exampleInputPassword1"
            className="block text-black"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2  bg-white border-b border-black text-black focus:outline-none "
            id="exampleInputPassword1"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPhone" className="block text-black">
            Phone
          </label>
          <input
            type="text"
            className="w-full px-3 py-2  bg-white border-b border-black text-black focus:outline-none "
            id="exampleInputPhone"
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputImage" className="block text-black">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="image" // Make sure the name attribute is set to "image"
            className="w-full px-3 py-2  bg-white border-b border-black text-black focus:outline-none "
            id="exampleInputImage"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputLocation" className="block text-black sm:text-black">
            Location
          </label>
          <input
            type="text"
            className="w-full px-3 py-2  bg-white border-b border-black text-black focus:outline-none "
            id="exampleInputLocation"
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-black p-3 -md tracking-wide font-semibold text-white focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center text-black  text-xs">
          You don't have an account?{" "}
          <Link href="/login" className="text-sky-500">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
