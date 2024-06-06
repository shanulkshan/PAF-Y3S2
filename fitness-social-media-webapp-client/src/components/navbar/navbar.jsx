import React, { useEffect, useState } from "react";
import CompanyLogo from "../CompanyLogo/CompanyLogo";
import Menu from "./Menu";
import Button from "../Button/Button";
import NavbarData from "../../data/NavbarData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const offset = window.scrollY;
  //     if (offset > 20) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };
  //   handleScroll();
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative z-40 animate-fade">
      <nav
        className={`z-40 w-full fixed ${ !isMenuOpen === true ? "" : "bg-white" } bg-white py-4 transition-all duration-700 ease-in-out`}
      >

      {/* Menu for Large screen */}
        <div className="fl-container flex flex-row items-center justify-between px-4 xl:px-0">
          <div className="inline-flex items-center">
            <CompanyLogo
              imageClassName="w-auto"
              className="mr-8"
              size={NavbarData.logo.size}
              image={{
                url: NavbarData.logo.image.url,
                alt: NavbarData.logo.image.alt,
              }}
              link={NavbarData.logo.link}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex max-w-lg">
            {/* <Menu className="hidden md:flex" links={NavbarData?.menuItems} /> */}


          <form className="max-w-md  mx-auto w-[350px]">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 0" 
                  placeholder="Search..." required />
                  <button type="submit" 
                  style={{
                    background: "var(--primary-gradient)",
                  }}
                  className="text-white absolute end-2.5 bottom-2.5  hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
              </div>
          </form>

          </div>
          <div className="hidden items-center gap-2 md:flex">
            {/* <a href={"/employer"} className=" flex gap-2">
              <Button
                bgColor="transparent linear-gradient(105deg, #e9ad0d 0%, #e15603 100%) 0% 0% no-repeat padding-box"
                hoverColor="transparent linear-gradient(105deg, #e15603 0%, #e9ad0d 100%) 0% 0% no-repeat padding-box"
              >
                Register
              </Button>
            </a> */}
            <a href={"/login"} className=" flex gap-2">
              <Button>Login</Button>
            </a>
          </div>

          <div className="flex md:hidden">
            <button onClick={handleMenuOpen}>
              {!isMenuOpen === true ? (
                <img
                  src="/icons/menu.svg"
                  width={40}
                  height={40}
                  alt="hamburger-icon"
                  className=""
                />
              ) : (
                <img
                  src="/icons/close.svg"
                  width={40}
                  height={40}
                  alt="close-icon"
                />
              )}
            </button>
          </div>
        </div>

        {/* Menu for mobile devices / small screens */}
        {isMenuOpen && (
          <>
            <div className="bg-white absolute block w-full shadow-lg md:hidden">
              <Menu
                className="flex flex-col gap-y-0 pt-6 animate-fade"
                linkClassNames="hover:bg-blue-600 py-4 px-6 hover:text-white"
                links={NavbarData?.menuItems}
                onLinkClick={() => setIsMenuOpen(false)}
              />
              <div className="flex gap-2 pb-10 pl-6 pr-6 pt-4 *:w-full animate-fade">
                <a
                  onClick={handleMenuOpen}
                  href={"/employer"}
                  className="*:w-full"
                >
                  <Button>Reach out to us</Button>
                </a>
              </div>
            </div>
          </>
        )}
      </nav>
      {isMenuOpen && (
        <div
          onClick={handleMenuOpen}
          className="fixed top-20 -z-10 h-screen w-screen bg-black opacity-60 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
