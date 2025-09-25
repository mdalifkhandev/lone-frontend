'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoggedIn } = useAuthStore();
  const pathname = usePathname();

  const firstLetter = user?.email ? user.email.charAt(0).toUpperCase() : "";

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  const handleMenuClick = () => setMenuOpen(false);

  return (
    <nav className="relative w-full bg-white shadow-md">
      {/* Top Navbar */}
      <div className="flex justify-between items-center py-2 px-4 md:px-16 lg:px-20">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="logo" width={80} height={40} />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "font-bold text-black" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth / User */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-circle bg-red-950 text-white text-2xl cursor-pointer"
              >
                {firstLetter}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-gray-200 text-black rounded-box w-32 p-2 shadow"
              >
                <li>
                  <Link
                    href={user?.role === "user" ? "/profile" : "/lender"}
                    className="text-center hover:bg-red-950 hover:text-white"
                  >
                    {user?.role === "user" ? "Profile" : "Dashboard"}
                  </Link>
                </li>
                {user?.role === "user" && (
                  <li>
                    <Link
                      href="/account"
                      className="text-center hover:bg-red-950 hover:text-white"
                    >
                      Account
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <Link href="/signup">
              <button className="bg-red-900 rounded-sm px-3 py-1 text-white text-sm">
                Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <RiMenu2Line size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-3 px-6 text-black">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={handleMenuClick}
                className={pathname === link.href ? "font-bold text-black" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {isLoggedIn ? (
            <>
              <li className="text-black">
                <Link
                  href={user?.role === "user" ? "/profile" : "/lender"}
                  onClick={handleMenuClick}
                >
                  {user?.role === "user" ? "Profile" : "Dashboard"}
                </Link>
              </li>
              {user?.role === "user" && (
                <li className="text-black">
                  <Link href="/account" onClick={handleMenuClick}>
                    Account
                  </Link>
                </li>
              )}
            </>
          ) : (
            <li>
              <Link href="/signup" onClick={handleMenuClick}>
                <button className="bg-red-900 rounded-sm px-3 py-1 text-white text-sm w-full">
                  Sign Up
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
