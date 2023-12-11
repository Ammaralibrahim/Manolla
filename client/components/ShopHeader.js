"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header({ cartItems, setCartItems }) {
  const [user, setUser] = useState({});
  const userId = Cookies.get("userId");
  const [showUser, setShowUser] = useState(false);

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

  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleUser = () => {
    setShowUser(!showUser);
  };

  const removeFromCart = (productToRemove) => {
    const updatedCart = cartItems.filter(
      (product) => product.productName !== productToRemove.productName
    );
    setCartItems(updatedCart);
  };

  const cartItemCount = cartItems.length;

  const submitCartToDatabase = () => {
    console.log("Submitting cart to the database...");

    if (userId) {
      axios
        .post(`http://localhost:3001/cart`, {
          userEmail: user.email,
          userName: user.name,
          cartItems,
        })
        .then((response) => {
          console.log("Shopping cart submitted successfully:", response.data);

          // Show success toast
          toast.success("Shopping cart submitted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          console.error("Error submitting shopping cart", error);

          // Show error toast
          toast.error("Error submitting shopping cart", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  };

  return (
    <header className="bg-[white] text-black">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="hidden w-full text-black md:flex md:items-center">
            {/* SVG ve diğer üst bilgi içeriği */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                fill="currentColor"
              />
            </svg>
            <span className="mx-1 text-sm">{user.location}</span>
          </div>
          <div className="w-full text-black md:text-center text-2xl font-semibold">
            <a
              href=""
              className="w-full text-black md:text-center text-2xl font-semibold"
            >
              Manolla
            </a>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              onClick={toggleCart}
              className="text-black focus:outline-none mx-4 mr-6 relative"
            >
              {/* Cart simgesi SVG */}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-[#212529] rounded-full h-4 w-4 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <div
              className="flex items-center space-x-4 mr-2"
              onClick={toggleUser}
            >
              <div className="relative w-7 h-7 overflow-hidden bg-gray-500 rounded-full dark:bg-gray-500 cursor-pointer">
                <img
                  src={`http://localhost:3001/${user.image}`}
                  alt="User Avatar"
                  className="w-40 "
                />
              </div>
              <div className="">
                <div className="hidden sm:block">
                  <div className="text-xs cursor-pointer hover:underline">
                    {user.name}
                  </div>
                  <div className="text-xs text-black cursor-pointer hover:underline">
                    {user.email}
                  </div>
                </div>

                {showUser && (
                  <div className="bg-white absolute top-16 right-4   mt-1 w-48 p-2 border rounded-lg shadow-md">
                    <div>
                      <img
                        src={`http://localhost:3001/${user.image}`}
                        alt="User Avatar"
                        className="w-20 rounded-full"
                      />
                    </div>
                    <div className="text-xs text-black">Name: {user.name}</div>

                    <div className="text-xs text-black">
                      Lastname: {user.lastname}
                    </div>
                    <div className="text-xs text-black">
                      Email: {user.email}
                    </div>
                    <div className="text-xs text-black">
                      Phone: {user.phone}
                    </div>
                    <div className="text-xs text-black">
                      Location: {user.location}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex sm:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-black hover:text-black focus:outline-none focus:text-black"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <nav
          className={
            isOpen
              ? ""
              : "hidden sm:flex sm:justify-center sm:items-center mt-4"
          }
        >
          <div className="flex flex-col sm:flex-row">
            <a className="mt-3 text-black  sm:mx-3 sm:mt-0" href="/home">
              Home
            </a>
            <a className="mt-3 text-black  sm:mx-3 sm:mt-0" href="/shop">
              Shop
            </a>

            <a className="mt-3 text-black  sm:mx-3 sm:mt-0" href="#">
              Contact
            </a>
          </div>
        </nav>
      </div>
      {cartOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-1/5 bg-[white] shadow-lg p-4 text-black">
          <button
            onClick={toggleCart}
            className="text-black hover:text-black focus:outline-none focus:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="46"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold mb-2">Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="mb-4">
                  <div className="flex items-center justify-between ">
                    <img
                      className="w-auto h-16 object-cover mr-1"
                      src={item.imageUrl}
                      alt={item.productName}
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-black ">
                        {item.productName}
                      </h3>
                      <p className="text-black text-xs ">
                        Rating: {item.rating}
                      </p>
                      <p className="text-black text-xs ">Price: {item.price}</p>
                      <p className="text-black text-xs ">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-black border border-black bg-white font-normal rounded-xs text-sm px-2 py-1 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={submitCartToDatabase}
            disabled={cartItems.length === 0} // Disable the button if the cart is empty
            className={`text-white w-full text-sm h-10 bg-black focus:outline-none mx- ${
              cartItems.length === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Submit Cart
          </button>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </header>
  );
}

export default Header;
