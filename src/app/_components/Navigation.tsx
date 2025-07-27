"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/cabins", label: "Cabins" },
    { href: "/about", label: "About" },
    { href: "/account", label: "Guest area" },
  ];

  return (
    <nav className="z-20 text-xl">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-16 items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="hover:text-accent-400 transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          type="button"
          className="flex justify-center items-center w-9 h-9 text-sm font-semibold rounded-lg border border-primary-900 text-primary-100 hover:bg-primary-800 focus:outline-none focus:bg-primary-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-[50vh] bg-primary-900/90 z-50 flex flex-col backdrop-blur-sm">
          <div className="p-4 border-b border-primary-100">
            <Logo onClick={() => setIsOpen(false)} />

            <button
              type="button"
              className="absolute z-40 top-4 right-4 flex justify-center items-center w-9 h-9 text-sm font-semibold rounded-lg border border-primary-900 text-primary-100 hover:bg-primary-800 focus:outline-none focus:bg-primary-800"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-start gap-6 p-4 pt-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-primary-100 hover:text-accent-400 transition-colors text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
