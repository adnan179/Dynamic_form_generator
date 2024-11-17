"use client";
import Link from "next/link";
import React from "react";
import { Switch } from "@headlessui/react";
import { useTheme } from "./context/ThemeContext";


const Navbar: React.FC = () => {
  const {isDarkMode, toggleTheme} = useTheme();

  return (
    <div className="w-full items-center justify-center fixed z-50 top-0 px-4">
      <nav
        className="flex flex-row gap-4 justify-center items-center w-fit mx-auto py-3 px-6 sm:py-5 sm:px-10 rounded-[36px] bg-[#EC5990] text-white sm:text-lg text-[12px]
          drop-shadow-lg mt-2"
      >
        <Link href="/" className="font-medium hover:scale-110 transition duration-200 ease-in-out">Home</Link>
        <Link href="/examples" className="font-medium hover:scale-110 transition duration-200 ease-in-out">Examples</Link>
        <Link target="_blank" rel="noopener noreferrer"
          href="https://adnan-portfolio-v2.vercel.app/"
          className="font-medium hover:scale-110 transition duration-200 ease-in-out"
        >
          My Portfolio
        </Link>
        <div className="flex items-center gap-2">
        <span className="text-sm">
            {isDarkMode ? 
            ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>) 
            : 
            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            )}
          </span>
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            className={`bg-gray-300 relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
         

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
