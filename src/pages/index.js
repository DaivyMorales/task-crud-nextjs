import { StateContext } from "Context/StateContext";
import { useContext, useEffect, useState } from "react";
import CardTask from "./tasks/CardTask";
import { AiOutlineSearch } from "react-icons/ai";
import NewTask from "./tasks/NewTask";

export default function index({ tasks }) {
  const { myState, setMyState, searchTerm, setSearchTerm } =
    useContext(StateContext);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setMyState(tasks);
  }, []);

  const handleNavbar = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex justify-center items-center gap-y-2 flex-col container  mx-auto">
      <div className="flex justify-center items-center gap-x-2 px-10 ">
        <h1 className="font-bold">Your urls</h1>
        <div className="input-search">
          <AiOutlineSearch size={19} color="#525252" />
          <input
            type="text"
            className="navInput bg-white text-black font-gray-300 pr-1  placeholder:text-gray-500 font-medium text-sm"
            placeholder="Search..."
            onChange={handleNavbar}
          />
        </div>
        <button >Ver</button>
      </div>
      <div>
        <div
          style={showForm ? { gridColumn: "span 2 / span 2" } : null}
          className="grid grid-cols-1 gap-6 w-full px-10 lg:grid-cols-3 sm:grid-cols-2 "
        >
          {tasks
            .filter((task) => {
              if (searchTerm == "") {
                return task;
              } else if (
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return task;
              }
            })
            .map((task) => (
              <CardTask task={task} key={task._id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  return {
    props: {
      tasks,
    },
  };
};
