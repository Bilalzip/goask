"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { Link } from "react-scroll";
import { MdClose } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import Links from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/userSlice";

const menu = [
  { id: 1, name: "Home", link: "home" },
  { id: 2, name: "How it works?", link: "how-it-works" },
  { id: 3, name: "Feature", link: "feature" },
  { id: 4, name: "Pricing", link: "pricing" },
  { id: 5, name: "FAQs", link: "faqs" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-2 relative bg-black text-white">
      <Links href={"/"} className="flex items-center gap-2">
        <Image src={logo} alt="Logo" height={49} width={50} />
        <span className="text-yellow-300 font-bold text-xl">GoAskPDF</span>
      </Links>
      <div className="hidden md:flex gap-6">
        {menu.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className={
              item.name === "Home"
                ? "text-green-400 font-bold cursor-pointer"
                : "cursor-pointer"
            }
            smooth={true}
            duration={500}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="hidden md:flex">
        {isAuth ? (
          <div>
            <button
              onClick={handelLogout}
              className="px-4 py-2 bg-yellow-400 text-black rounded-md font-bold"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <Links
              href={"/sign-up"}
              className="px-4 py-2 bg-yellow-400 text-black rounded-md font-bold"
            >
              Sign Up
            </Links>
          </div>
        )}
        {/* <Links
          href={"/sign-up"}
          className="px-4 py-2 bg-yellow-400 text-black rounded-md font-bold"
        >
          Sign Up
        </Links> */}
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={handleMenuToggle}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? <MdClose size={24} /> : <CiMenuBurger size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center z-10">
          {menu.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className={
                item.name === "Home"
                  ? "text-green-400 font-bold cursor-pointer py-2"
                  : "cursor-pointer py-2"
              }
              smooth={true}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="py-2">
            {isAuth ? (
              <button
                onClick={handelLogout}
                className="px-4 py-2 bg-yellow-400 text-black rounded-md font-bold"
              >
                Log Out
              </button>
            ) : (
              <Links href="/sign-up">
                <button className="px-4 py-2 bg-yellow-400 text-black rounded-md font-bold">
                  Sign Up
                </button>
              </Links>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
