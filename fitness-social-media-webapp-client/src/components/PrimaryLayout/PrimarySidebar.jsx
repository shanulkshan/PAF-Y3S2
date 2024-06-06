import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import Footer from "../footer/Footer";

const PrimarySidebar = ({ children }) => {
  const menus = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Posts",
      link: "posts",
    },
    {
      name: "Workout status",
      link: "MyStatus",
    },
    {
      name: "Add Workout status",
      link: "CreateStatus",
    },
    {
      name: "Fitness",
      link: "fitness",
    },
    {
      name: "Admin Panel",
      link: "admin",
    },
  ];

  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col w-64">
          <div className="flex items-center px-4 pt-28">
            <div className="mr-5">
              <div className="inline-block relative shrink-0 cursor-pointer bg-red-200 rounded-[.95rem]">
                <img
                  className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                  src="/images/tom-clancy-ghost-recon.jpeg"
                  alt="avatar image"
                />
              </div>
            </div>
            <div className="mr-2 ">
              <div
                className="text-primary text-[1.075rem] font-medium cursor-pointer"
              >
                Shan Jathurshan
              </div>
              <span className="text-secondary-dark font-medium block text-[12px]">
                abc@gmail.com
              </span>
            </div>
          </div>

          <div className="hidden lg:block dark:border-neutral-700/70 border-neutral-200"></div>

          <div className="flex flex-col flex-grow p-4 overflow-auto home-menu">
            {menus.map((menu, index) => (
              <NavLink
                key={index}
                className="flex items-center flex-shrink-0 h-10 px-2 pl-3 my-1 text-sm font-medium transition-all rounded-xl hover:bg-gray-300 hover:text-black"
                to={menu.link}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                <span className="leading-none">{menu.name}</span>
              </NavLink>
            ))}

            <Link
              className="flex items-center flex-shrink-0 h-10 px-3 mt-auto text-sm font-medium text-white bg-gray-800 rounded-xl hover:bg-gray-600"
              to="#"
              style={{
                background: "linear-gradient(105deg, #6b7280 0%, hsl(0deg 0% 24.85%) 100%) 0% 0% no-repeat padding-box padding-box transparent",
            }}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="ml-2 leading-none" >Logout</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex-grow p-6 pl-24 overflow-auto bg-gray-100">
            {children}

          </div>
            {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default PrimarySidebar;
