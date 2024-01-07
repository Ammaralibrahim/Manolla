"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [user, setUser] = useState({});
  const userId = Cookies.get("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3001/user/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, [userId]);

  const handleContactFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: event.target.email.value,
      subject: event.target.subject.value,
      message: event.target.message.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/contactus",
        formData
      );
      
      // Show a success toast
      toast.success("Contact form submitted successfully");

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting contact form", error);
      // Show an error toast
      toast.error("Error submitting contact form");
    }
  };

  return (
    <>
      <Header />
      <section className="bg-white dark:bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-black dark:text-black">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-black dark:text-black sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form onSubmit={handleContactFormSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email" // Add name attribute
                className="shadow-sm bg-white border-b border-black text-black text-sm rounded-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 outline-none dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject" // Add name attribute
                className="block p-3 w-full text-sm text-black bg-white rounded-none border-b border-black shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-black dark:placeholder-gray-400 outline-none dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message" // Add name attribute
                rows="2"
                className="block p-2.5 w-full text-sm text-black bg-white rounded-none shadow-sm border-b border-black focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-black dark:placeholder-gray-400 outline-none dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white bg-primary-700 sm:w-full hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-black dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
      <ToastContainer position="bottom-right" autoClose={3000} />

    </>
  );
}
