import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { HiCursorClick } from "react-icons/hi";

export const Navbar = () => {
  const router = useRouter();

  return (
    <div
      className="fixed w-full top-0  bg-trasparent z-40 "
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <div className=" grid grid-cols-3 gap-x-8 py-3 px-14 ">
        <div className="flex">
          <HiCursorClick color="white" />
          <h1 className="font-black">urls.co</h1>
        </div>

        <div className="flex justify-center items-center gap-x-4  ">
          <p
            className="text-gray-500 hover:text-white cursor-pointer"
            onClick={() => {
              router.push("tasks/NewTask");
            }}
          >
            Create
          </p>
          <p
            className="text-gray-500 hover:text-white cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            Dashboard
          </p>
          <p className="text-gray-500 hover:text-white cursor-pointer">
            <a href="https://github.com/DaivyMorales">GitHub</a>
          </p>
        </div>
        <div className="flex justify-center items-center gap-x-2   ">
          <div className="input-search">
            <AiOutlineSearch size={19} color="#525252" />
            <input
              type="text"
              className="navInput bg-black   text-white font-gray-300 pr-1  placeholder:text-gray-500 font-medium text-sm"
              placeholder="Search..."
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%",
              }}
            >
              Search
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
