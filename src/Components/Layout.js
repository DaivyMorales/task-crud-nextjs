// Layout.js
import { motion } from 'framer-motion';
import React from "react";
import { Navbar } from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="  ">
      <Navbar />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Layout;
