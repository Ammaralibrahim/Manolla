"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import Products from "./products";
import Link from "next/link";
import SportShoesSVG from "./svg/SportShoesSVG";
import BackpackSVG from "./svg/BackpackSVG";
import GamesSVG from "./svg/GamesSVG";

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

  return (
    <>
      <Header />
      <section className="bg-white text-black">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Welcome to Manolla
            </h1>
            <p className="max-w-2xl mb-6 font-light text-black lg:mb-8 md:text-lg lg:text-xl">
              The Man of the House
            </p>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base text-white font-medium text-center rounded-lg bg-black hover:bg-white hover:text-black focus:ring-4 focus:ring-black"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-black rounded-lg hover:bg-black hover:text-white focus:ring-4 focus:ring-black"
            >
              Speak to Sales
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>

      <div className="container px-4 bg-white">
        <div
          className="h-64   overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auhref=format&fit=crop&w=1280&q=144")',
          }}
        >
          <div className="bg-black bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">
                Sport Shoes
              </h2>
              <p className="mt-2 text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
                facere provident molestias ipsam sint voluptatum pariatur.
              </p>
              <button className="flex items-center mt-4 px-3 py-2 bg-white text-black text-sm uppercase font-medium rounded hover:bg-black focus:outline-none focus:bg-black">
                <span>Shop Now</span>
                <SportShoesSVG />
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex mt-8 md:-mx-4">
          <div
            className="w-full h-64 md:mx-4   overflow-hidden bg-cover bg-center md:w-1/2"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auhref=format&fit=crop&w=750&q=80")',
            }}
          >
            <div className="bg-black bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">
                  Back Pack
                </h2>
                <p className="mt-2 text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore facere provident molestias ipsam sint voluptatum
                  pariatur.
                </p>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <span>Shop Now</span>
                  <BackpackSVG />
                </button>
              </div>
            </div>
          </div>
          <div
            className="w-full h-64 mt-8 md:mx-4   overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auhref=format&fit=crop&w=1050&q=80")',
            }}
          >
            <div className="bg-black bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Games</h2>
                <p className="mt-2 text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore facere provident molestias ipsam sint voluptatum
                  pariatur.
                </p>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <span>Shop Now</span>
                  <GamesSVG />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Products />
      </div>
    </>
  );
}
