import React from "react";
import Navbar from "../navbar/navbar";
import PrimarySidebar from "./PrimarySidebar";

const PrimaryLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* <div className="pt-20 min-h-[65vh]">{children}</div> */}

      <PrimarySidebar>{children}</PrimarySidebar>
    </>
  );
};

export default PrimaryLayout;
