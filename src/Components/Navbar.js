import { StateContext } from "Context/StateContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiCursorClick } from "react-icons/hi";

export const Navbar = () => {
  const { push, replace, asPath } = useRouter();

  return (
    <div
      className="fixed w-full top-0  bg-trasparent z-40 "
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <div className=" grid grid-cols-2 gap-x-8 py-3 px-12  ">
        <div className="flex">
          <HiCursorClick color="black" />
          <h1 className="font-black">urls.co</h1>
        </div>

        <div className="flex justify-end items-center gap-x-4  ">
          <p
            className="text-gray-500 hover:text-white cursor-pointer"
            onClick={() => {
              push("tasks/NewTask");
              // replace(asPath);
            }}
          >
            Create
          </p>
          <p
            className="text-gray-500 hover:text-white cursor-pointer"
            onClick={() => {
              push("/");
              replace(asPath);
            }}
          >
            Dashboard
          </p>
          <p className="text-gray-500 hover:text-white cursor-pointer">
            <a href="https://github.com/DaivyMorales">GitHub</a>
          </p>
        </div>
      </div>
    </div>
  );
};
