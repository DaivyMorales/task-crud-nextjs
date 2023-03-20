import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import NewTask from "../NewTask";
import { HiLink } from "react-icons/hi";

export default function TaskDetail({ task }) {
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  return (
    <div className=" flex justify-center items-center flex-col">
      <div
        className="grid grid-cols-1"
        // style={
        //   showForm
        //     ? { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }
        //     : { gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }
        // }
      >
        <div className="flex justify-center items-center flex-col">
          <div className="p-2 rounded-full bg-gradient-to-r from-indigo-300 to-purple-400">
            <HiLink size={28} />
          </div>
          <h2 className=" font-bold">Link</h2>
          <h1>{task.title}</h1>
          <h3>{task.description}</h3>
          <div
            style={task.category.color}
            className=" text-gray-200 rounded-full font-bold text-xs flex justify-center py-1 px-5"
          >
            {task.category}
          </div>
          <div>
            <button
              onClick={() => {
                deleteTask(task._id);
                router.push("/");
              }}
            >
              Eliminar
            </button>

            <button
              onClick={() => {
                // router.push(`/tasks/${task._id}/edit`);
                setShowForm(!showForm);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div>{showForm ? <NewTask /> : null}</div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const result = await axios.get(
    `https://task-crud-nextjs-f13i7k2w0-daivymorales-s-team.vercel.app/api/tasks/${id}`
  );

  if (result.status === 200) {
    return {
      props: {
        task: result.data,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
