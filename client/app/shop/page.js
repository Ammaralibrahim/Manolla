"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link"; // Next.js için Link ekleyin
import ShopHeader from "../../components/ShopHeader";

const API_URL = "http://localhost:3001/user/";

export default function Shop() {
  // State declarations
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty545/product/media/images/20220929/11/181166449/582514930/1/1_org_zoom.jpg",
      productName: "Apple Airpods 3",
      rating: 4.8,
      price: "699",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty545/product/media/images/20220930/13/181799360/581631512/2/2_org_zoom.jpg",
      productName: "Apple Watch SE",
      rating: 4.5,
      price: "599",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty300/product/media/images/20220120/17/30629818/17168623/1/1_org_zoom.jpg",
      productName: "Everest Smw-777",
      rating: 4.7,
      price: "799",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty541/product/media/images/20220924/18/179258652/576512257/1/1_org_zoom.jpg",
      productName: "GoPro Hero 11",
      rating: 4.6,
      price: "549",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty533/product/media/images/20220913/9/174753519/13623199/2/2_org_zoom.jpg",
      productName: "Everest Siyah Usb",
      rating: 4.4,
      price: "499",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty545/product/media/images/20220929/11/181166449/582514930/1/1_org_zoom.jpg",
      productName: "Apple Airpods 3",
      rating: 4.8,
      price: "699",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty545/product/media/images/20220930/13/181799360/581631512/2/2_org_zoom.jpg",
      productName: "Apple Watch SE",
      rating: 4.5,
      price: "599",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty300/product/media/images/20220120/17/30629818/17168623/1/1_org_zoom.jpg",
      productName: "Everest Smw-777",
      rating: 4.7,
      price: "799",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty541/product/media/images/20220924/18/179258652/576512257/1/1_org_zoom.jpg",
      productName: "GoPro Hero 11",
      rating: 4.6,
      price: "549",
    },
    {
      imageUrl:
        "https://cdn.dsmcdn.com/mnresize/1200/1800/ty533/product/media/images/20220913/9/174753519/13623199/2/2_org_zoom.jpg",
      productName: "Everest Siyah Usb",
      rating: 4.4,
      price: "499",
    },
  ]);

  const userId = Cookies.get("userId");

  // Function to add a product to the cart
  const addToCart = (product) => {
    if (!isProductInCart(product.productName)) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = cartItems.map((item) =>
        item.productName === product.productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productToRemove) => {
    const updatedCart = cartItems.filter(
      (product) => product.productName !== productToRemove.productName
    );
    setCartItems(updatedCart);
  };

  // Fetching user data
  useEffect(() => {
    if (userId) {
      axios
        .get(API_URL + userId)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, [userId]);

  // Check if a product is in the cart
  const isProductInCart = (productName) => {
    return cartItems.some((item) => item.productName === productName);
  };

  return (
    <>
      <ShopHeader
        cartItems={cartItems}
        setCartItems={setCartItems}
        removeFromCart={removeFromCart}
      />
      <div className="container px-2 lg:px-36 sm:px-3 py-3">
        
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 mt-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-full max-w-sm bg-white border p-4 border-black rounded-lg shadow-md overflow-hidden"
            >
              <Link href="#">
                <img
                  className="w-100 object-cover"
                  src={product.imageUrl}
                  alt="Product image"
                />
              </Link>
              <div className="px-0 pt-2">
                <Link href="#">
                  <h5 className="text-md font-semibold tracking-tight text-black">
                    {product.productName}
                  </h5>
                </Link>
                <div className="flex items-center mt-1 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-3 h-3 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-1 px-1.5 py-0.5 rounded">
                    {product.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-black">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-black border border-black bg-white font-normal rounded-xs text-sm px-2 py-1 focus:outline-none"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-black float-right p-2 ">Show More</div>
      </div>
    </>
  );
}
